import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { IAppState } from 'src/app/state/app-state';
import { IPollDto } from 'src/app/state/polls/polls-models';
import { sessionGet, sessionJoin } from 'src/app/state/session/session-actions';
import { ISessionDetailsDto } from 'src/app/state/session/session-models';
import { ApexLegend, ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { PubsubService } from 'src/app/services/pubsub.service';
import * as _ from 'lodash';
import { voteCast, voteGetList } from 'src/app/state/votes/votes-actions';
import { IPollVoteDto } from 'src/app/state/votes/votes-models';
import { debounceTime } from 'rxjs/operators';
import { pollGetActive } from 'src/app/state/polls/polls-actions';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-view-session-page',
  templateUrl: './view-session-page.component.html',
  styleUrls: ['./view-session-page.component.scss'],
})
export class ViewSessionPageComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: ChartOptions;

  private sessionIdSubsciption?: Subscription;
  private userIdSubscription?: Subscription;
  private sessionSubscription?: Subscription;
  private selectedPollSubscription?: Subscription;
  private graphSeriesSubscription?: Subscription;
  private connectionCheckSubscription?: Subscription;

  private userId?: string;
  public sessionCode?: string;
  public activeSession?: ISessionDetailsDto;
  public activePoll?: IPollDto;
  public isConnected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private realtimeService: PubsubService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 640,
        type: 'pie',
        foreColor: '#fff',
      },
      labels: [],
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 480,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  changeSeries(series: Array<IPollVoteDto>) {
    const chartSeries = new Array<number>();
    if (this.activePoll && this.activePoll.options) {
      this.activePoll.options.forEach((val) => {
        const itemIndex = _.findIndex(series, function (s) {
          return s.optionId == val.id;
        });
        if (itemIndex >= 0) {
          chartSeries.push(series[itemIndex].votes);
        } else {
          chartSeries.push(0);
        }
      });
    }

    if (this.chart) {
      this.chart.updateSeries(chartSeries);
    }
  }
  connectRealTimeService() {
    if (this.realtimeService.pubsubClient) {
      this.isConnected =
        this.realtimeService.pubsubClient.readyState ===
        this.realtimeService.pubsubClient.OPEN;
    }
    if (!this.isConnected && this.userId && this.activeSession) {
      this.realtimeService.connect(this.activeSession.id, this.userId);
    }
  }
  castVote(optionId: string) {
    if (this.userId && this.activePoll && this.activeSession) {
      const model = {
        userId: this.userId,
        sessionId: this.activeSession.id,
        pollId: this.activePoll.id,
        optionId: optionId,
      };
      this.store.dispatch(voteCast({ dto: model }));
    }
  }
  private setupChart() {
    if (this.activePoll && this.chart) {
      const names = _(this.activePoll.options).map('name').value();
      this.chartOptions.labels = names;
      this.chart?.updateOptions(this.chartOptions);
    }
  }
  private loadSessionDetails() {
    if (
      this.userId &&
      this.sessionCode &&
      (this.activeSession === undefined ||
        this.activeSession.code !== this.sessionCode)
    ) {
      this.store.dispatch(
        sessionJoin({ dto: { code: this.sessionCode, userId: this.userId } })
      );
    }
  }

  ngOnInit(): void {
    this.sessionIdSubsciption = this.route.params.subscribe((params) => {
      this.sessionCode = params['id'];
      this.loadSessionDetails();
    });
    this.sessionSubscription = this.store
      .select((x) => x.sessionState)
      .subscribe((val) => {
        this.activeSession = val.activeSession;
        if (this.activeSession) {
          this.connectRealTimeService();
          this.store.dispatch(
            pollGetActive({ sessionId: this.activeSession.id })
          );
        }
      });

    this.selectedPollSubscription = this.store
      .select((str) => str.pollsState)
      .subscribe((ps) => {
        this.activePoll = ps.activePoll;
        if (this.activePoll) {
          this.setupChart();
          this.store.dispatch(voteGetList({ pollId: this.activePoll.id }));
        }
      });

    this.userIdSubscription = this.store
      .select((x) => x.userState)
      .subscribe((val) => {
        this.userId = val.userId;
        this.loadSessionDetails();
      });
    this.graphSeriesSubscription = this.store
      .select((str) => str.votesState.graphSeries)
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        const x = val;
        if (val) {
          this.changeSeries(val);
        }
      });
    this.connectionCheckSubscription = interval(2500).subscribe(() => {
      this.connectRealTimeService();
    });
  }
  ngOnDestroy(): void {
    if (this.connectionCheckSubscription) {
      this.connectionCheckSubscription.unsubscribe();
    }
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
    if (this.graphSeriesSubscription) {
      this.graphSeriesSubscription.unsubscribe();
    }
  }
}
