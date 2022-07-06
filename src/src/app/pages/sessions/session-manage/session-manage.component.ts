import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { sessionGet } from 'src/app/state/session/session-actions';

@Component({
  selector: 'app-session-manage',
  templateUrl: './session-manage.component.html',
  styleUrls: ['./session-manage.component.scss'],
})
export class SessionManageComponent implements OnInit, OnDestroy {
  private sessionIdSubsciption?: Subscription;
  private userIdSubscription?: Subscription;

  private userId?: string;
  private sessionId?: string;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {}

  private loadSessionDetails() {
    if (this.userId && this.sessionId) {
      this.store.dispatch(
        sessionGet({ sessionId: this.sessionId, userId: this.userId })
      );
    }
  }

  ngOnInit(): void {
    this.sessionIdSubsciption = this.route.params.subscribe((params) => {
      debugger;
      this.sessionId = params['id'];
      this.loadSessionDetails();
    });
    this.userIdSubscription = this.store
      .select((x) => x.userState)
      .subscribe((val) => {
        this.userId = val.userId;
        this.loadSessionDetails();
      });
  }
  ngOnDestroy(): void {
    if (this.sessionIdSubsciption) {
      this.sessionIdSubsciption.unsubscribe();
    }
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
