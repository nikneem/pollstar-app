import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { IAppState } from 'src/app/state/app-state';
import {
  pollCreate,
  pollCreated,
  pollUpdate,
  pollUpdated,
} from 'src/app/state/polls/polls-actions';
import { ICreatePollDto, IPollDto } from 'src/app/state/polls/polls-models';
import { Subscription } from 'rxjs';

export interface ISessionData {
  sessionId: string;
  poll: IPollDto;
}

@Component({
  selector: 'app-polls-details-dialog',
  templateUrl: './polls-details-dialog.component.html',
  styleUrls: ['./polls-details-dialog.component.scss'],
})
export class PollsDetailsDialogComponent implements OnInit, OnDestroy {
  public pollDetailsForm: FormGroup;
  public options: FormArray;
  private pollCreateActionsSubscription?: Subscription;
  private pollUpdateActionsSubscription?: Subscription;
  private poll: IPollDto;

  constructor(
    private store: Store<IAppState>,
    private _actions$: Actions,
    public dialogRef: MatDialogRef<PollsDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISessionData
  ) {
    const sessionId = data.sessionId;
    this.poll = data.poll;
    if (this.poll) {
      this.pollDetailsForm = new FormGroup({
        id: new FormControl(this.poll.id),
        sessionId: new FormControl(sessionId),
        name: new FormControl(this.poll.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        description: new FormControl(this.poll.description, [
          Validators.minLength(3),
        ]),
        options: new FormArray([]),
      });
      this.options = this.pollDetailsForm.get('options') as FormArray;
      this.poll.options?.forEach((v, i) => {
        const newOption = new FormGroup({
          id: new FormControl(v.id),
          name: new FormControl(v.name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
          description: new FormControl(v.description, [
            Validators.minLength(3),
          ]),
        });
        this.addSpecificOption(newOption);
      });
    } else {
      this.pollDetailsForm = new FormGroup({
        id: new FormControl(''),
        sessionId: new FormControl(sessionId),
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        description: new FormControl('', [Validators.minLength(3)]),
        options: new FormArray([]),
      });
      this.options = this.pollDetailsForm.get('options') as FormArray;
      this.addOption();
    }
  }

  addOption() {
    const newOption = new FormGroup({
      id: new FormControl('00000000-0000-0000-0000-000000000000'),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      description: new FormControl('', [Validators.minLength(3)]),
    });
    this.addSpecificOption(newOption);
  }
  addSpecificOption(newOption: FormGroup) {
    this.options.push(newOption);
  }
  removeSkill(index: number) {
    this.options.removeAt(index);
  }

  save() {
    if (this.poll) {
      this.poll = this.pollDetailsForm.value as IPollDto;
      this.store.dispatch(pollUpdate({ id: this.poll.id, dto: this.poll }));
    } else {
      const poll = this.pollDetailsForm.value as ICreatePollDto;
      this.store.dispatch(pollCreate({ dto: poll }));
    }
  }

  ngOnInit(): void {
    this.pollCreateActionsSubscription = this._actions$
      .pipe(ofType(pollCreated))
      .subscribe((poll) => {
        this.dialogRef.close();
      });
    this.pollUpdateActionsSubscription = this._actions$
      .pipe(ofType(pollUpdated))
      .subscribe((poll) => {
        this.dialogRef.close({ poll: this.poll });
      });
  }
  ngOnDestroy(): void {
    if (this.pollCreateActionsSubscription) {
      this.pollCreateActionsSubscription.unsubscribe();
    }
    if (this.pollUpdateActionsSubscription) {
      this.pollUpdateActionsSubscription.unsubscribe();
    }
  }
}
