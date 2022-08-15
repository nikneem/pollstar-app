import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

  private userId?: string;
  public sessionCode?: string;
  public activeSession?: ISessionDetailsDto;
  public activePoll?: IPollDto;

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
  changeSeries() {
    if (this.chart) {
      this.chart.updateSeries([2, 4, 8, 16, 32]);
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
        if (this.activeSession && this.userId) {
          this.realtimeService.connect(this.activeSession.id, this.userId);
        }
      });

    this.selectedPollSubscription = this.store
      .select((str) => str.pollsState)
      .subscribe((ps) => {
        this.activePoll = ps.activePoll;
        this.setupChart();
      });

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
