import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import {
  sessionCreate,
  sessionCreateSuccess,
} from 'src/app/state/session/session-actions';
import { ISessionCreateDto } from 'src/app/state/session/session-models';
import { userIdentify } from 'src/app/state/user/user-actions';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit, OnDestroy {
  createSessionForm: FormGroup;
  private userIdSubscription?: Subscription;
  private hasFetchedUserId: boolean = false;
  private userFromLocalStorage?: string;

  constructor(
    public dialogRef: MatDialogRef<CreateSessionComponent>,
    private store: Store<IAppState>,
    private _actions$: Actions,
    private router: Router
  ) {
    this.createSessionForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [Validators.maxLength(30)]),
    });
    const userFromLocalStorage = localStorage.getItem('pollstar-user-id');
    if (userFromLocalStorage) {
      this.userFromLocalStorage = userFromLocalStorage;
    }
  }

  public createSession() {
    if (this.createSessionForm.valid) {
      const payload = this.createSessionForm.value as ISessionCreateDto;
      this.store.dispatch(sessionCreate({ dto: payload }));
    }
  }

  private updateUserId(userId?: string) {
    if (userId) {
      this.createSessionForm.patchValue({ userId: userId });
    } else if (!this.hasFetchedUserId) {
      this.hasFetchedUserId = true;
      this.store.dispatch(userIdentify({ userId: this.userFromLocalStorage }));
    }
  }

  ngOnInit(): void {
    this.userIdSubscription = this.store
      .select((x) => x.userState)
      .subscribe((val) => {
        this.updateUserId(val.userId);
      });
    this._actions$.pipe(ofType(sessionCreateSuccess)).subscribe((session) => {
      this.router.navigate([`/sessions/manage/${session.dto.id}`]);
      this.dialogRef.close();
    });
  }
  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
