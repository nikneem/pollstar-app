import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { pollActivate } from 'src/app/state/polls/polls-actions';
import { IPollDto } from 'src/app/state/polls/polls-models';
import { sessionGet } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-session-manage',
  templateUrl: './session-manage.component.html',
  styleUrls: ['./session-manage.component.scss'],
})
export class SessionManageComponent implements OnInit, OnDestroy {
  private sessionIdSubsciption?: Subscription;
  private userIdSubscription?: Subscription;
  private sessionSubscription?: Subscription;
  private selectedPollSubscription?: Subscription;

  private userId?: string;
  public sessionId?: string;
  public activeSession?: ISessionDetailsDto;
  public selectedPoll?: IPollDto;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  private loadSessionDetails() {
    if (this.userId && this.sessionId) {
      this.store.dispatch(
        sessionGet({ sessionId: this.sessionId, userId: this.userId })
      );
    }
  }

  public activateSelected() {
    if (this.selectedPoll) {
      this.store.dispatch(pollActivate({ id: this.selectedPoll?.id }));
    }
  }

  ngOnInit(): void {
    this.sessionSubscription = this.store
      .select((x) => x.sessionState)
      .subscribe((val) => {
        this.activeSession = val.activeSession;
      });
    this.sessionIdSubsciption = this.route.params.subscribe((params) => {
      this.sessionId = params['id'];
      this.loadSessionDetails();
    });
    this.selectedPollSubscription = this.store
      .select((str) => str.pollsState)
      .subscribe((ps) => (this.selectedPoll = ps.selectedPoll));
    this.userIdSubscription = this.store
      .select((x) => x.userState)
      .subscribe((val) => {
        this.userId = val.userId;
        this.loadSessionDetails();
      });
  }
  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.sessionIdSubsciption) {
      this.sessionIdSubsciption.unsubscribe();
    }
    if (this.selectedPollSubscription) {
      this.selectedPollSubscription.unsubscribe();
    }
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
