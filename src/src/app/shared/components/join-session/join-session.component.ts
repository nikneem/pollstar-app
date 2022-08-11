import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { userIdentify } from 'src/app/state/user/user-actions';
import {
  sessionDetailsChanged, sessionJoin,
} from 'src/app/state/session/session-actions';
import { ISessionJoinDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {
  joinSessionForm: FormGroup;
  private sessionDetailsChangedSubscription?: Subscription;
  private userIdSubscription?: Subscription;
  private hasFetchedUserId: boolean = false;
  private userFromLocalStorage?: string;

  constructor(    public dialogRef: MatDialogRef<JoinSessionComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions,
    private router: Router) { 
      this.joinSessionForm = new FormGroup({
        userId: new FormControl('', [Validators.required]),
        code: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7),
        ])
      });
      const userFromLocalStorage = localStorage.getItem('pollstar-user-id');
      if (userFromLocalStorage) {
        this.userFromLocalStorage = userFromLocalStorage;
      }
    }

    private updateUserId(userId?: string) {
      if (userId) {
        this.joinSessionForm.patchValue({ userId: userId });
      } else if (!this.hasFetchedUserId) {
        this.hasFetchedUserId = true;
        this.store.dispatch(userIdentify({ userId: this.userFromLocalStorage }));
      }
    }

    public joinSession() {
      if (this.joinSessionForm.valid) {
        const payload = this.joinSessionForm.value as ISessionJoinDto;
        this.store.dispatch(sessionJoin({ dto: payload }));
      }
    }

    ngOnInit(): void {
      this.userIdSubscription = this.store
        .select((x) => x.userState)
        .subscribe((val) => {
          this.updateUserId(val.userId);
        });
      this.sessionDetailsChangedSubscription = this._actions$.pipe(ofType(sessionDetailsChanged)).subscribe((session) => {
        this.router.navigate([`/view/${session.dto.code}`]);
        this.dialogRef.close();
      });
    }
    ngOnDestroy(): void {
      if (this.userIdSubscription) {
        this.userIdSubscription.unsubscribe();
      }
      if (this.sessionDetailsChangedSubscription) {
        this.sessionDetailsChangedSubscription.unsubscribe();
      }
    }
}
