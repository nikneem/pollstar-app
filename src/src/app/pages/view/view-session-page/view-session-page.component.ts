import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { IPollDto } from 'src/app/state/polls/polls-models';
import { sessionGet } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-view-session-page',
  templateUrl: './view-session-page.component.html',
  styleUrls: ['./view-session-page.component.scss'],
})
export class ViewSessionPageComponent implements OnInit, OnDestroy {
  private sessionIdSubsciption?: Subscription;
  private userIdSubscription?: Subscription;
  private sessionSubscription?: Subscription;
  private selectedPollSubscription?: Subscription;

  private userId?: string;
  public sessionId?: string;
  public activeSession?: ISessionDetailsDto;
  public activePoll?: IPollDto;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  private loadSessionDetails() {
    if (this.userId && this.sessionId) {
      this.store.dispatch(
        sessionGet({ sessionId: this.sessionId, userId: this.userId })
      );
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
      .subscribe((ps) => (this.activePoll = ps.activePoll));
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