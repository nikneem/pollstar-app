import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { pollList } from 'src/app/state/polls/polls-actions';
import { IPollsListItemDto } from 'src/app/state/polls/polls-models';
import { PollsDetailsDialogComponent } from '../polls-details-dialog/polls-details-dialog.component';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss'],
})
export class PollsListComponent implements OnInit, OnDestroy {
  private sessionId?: string;
  private sessionIdSubscription?: Subscription;
  private sessionPollsSubscription?: Subscription;

  public sessionPolls?: Array<IPollsListItemDto>;

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}
  addPoll() {
    this.dialog.open(PollsDetailsDialogComponent, {
      width: '80%',
      data: {
        sessionId: this.sessionId,
      },
    });
  }
  private refreshPollsList() {
    if (this.sessionId) {
      this.store.dispatch(pollList({ id: this.sessionId }));
    }
  }

  ngOnInit(): void {
    this.sessionIdSubscription = this.store
      .select((str) => str.sessionState.activeSession)
      .subscribe((act) => {
        if (act) {
          this.sessionId = act.id;
          this.refreshPollsList();
        }
      });
    this.sessionPollsSubscription = this.store
      .select((str) => str.pollsState.sessionPolls)
      .subscribe((act) => {
        this.sessionPolls = act;
      });
  }
  ngOnDestroy(): void {
    if (this.sessionIdSubscription) {
      this.sessionIdSubscription.unsubscribe();
    }
    if (this.sessionPollsSubscription) {
      this.sessionPollsSubscription.unsubscribe();
    }
  }
}
