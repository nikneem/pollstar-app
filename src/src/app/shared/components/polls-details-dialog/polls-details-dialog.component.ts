import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { IAppState } from 'src/app/state/app-state';
import { pollCreate, pollCreated } from 'src/app/state/polls/polls-actions';
import { ICreatePollDto } from 'src/app/state/polls/polls-models';
import { Subscription } from 'rxjs';

export interface ISessionData {
  sessionId: string;
}

@Component({
  selector: 'app-polls-details-dialog',
  templateUrl: './polls-details-dialog.component.html',
  styleUrls: ['./polls-details-dialog.component.scss'],
})
export class PollsDetailsDialogComponent implements OnInit {
  public pollDetailsForm: FormGroup;
  public options: FormArray;
  private actionsSubscription?: Subscription;

  constructor(
    private store: Store<IAppState>,
    private _actions$: Actions,
    public dialogRef: MatDialogRef<PollsDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISessionData
  ) {
    const sessionId = data.sessionId;
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

    this.options.push(newOption);
  }
  removeSkill(index: number) {
    this.options.removeAt(index);
  }

  save() {
    const poll = this.pollDetailsForm.value as ICreatePollDto;
    this.store.dispatch(pollCreate({ dto: poll }));
  }

  ngOnInit(): void {
    this.actionsSubscription = this._actions$
      .pipe(ofType(pollCreated))
      .subscribe((poll) => {
        this.dialogRef.close();
      });
  }
}
