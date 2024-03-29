import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IAppState } from '../state/app-state';
import { pollActivated } from '../state/polls/polls-actions';
import { IPollDto } from '../state/polls/polls-models';
import { ISessionDetailsDto } from '../state/session/session-models';
import { voteSeriesUpdate } from '../state/votes/votes-actions';
import { IPollVoteDto } from '../state/votes/votes-models';

export interface IPubSubConnectionInformation {
  pubsubClientUrl: string;
}
export interface IRealtimeEvent<TPayload> {
  eventName: string;
  payload: TPayload;
}

@Injectable({
  providedIn: 'root',
})
export class PubsubService {
  public pubsubClient?: WebSocket;
  private sessionId?: string;

  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  public connect(sessionId: string, userId: string) {
    if (
      this.pubsubClient &&
      this.pubsubClient.readyState === this.pubsubClient.OPEN
    ) {
      console.log('connection already open, doing nothing');
    } else {
      this.sessionId = sessionId;
      var url = `${environment.backendUrl}/sessions/${sessionId}/realtime?userId=${userId}`;
      this.http.get<IPubSubConnectionInformation>(url).subscribe((val) => {
        this.connectSocket(val.pubsubClientUrl);
      });
    }
  }

  private connectSocket(url: string) {
    const self = this;
    if (this.sessionId) {
      this.pubsubClient = new WebSocket(url, 'json.webpubsub.azure.v1');
      this.pubsubClient.onopen = (evt) => {
        console.log(`Realtime connected to session ${self.sessionId}`);
        this.pubsubClient?.send(
          JSON.stringify({
            type: 'joinGroup',
            group: self.sessionId,
            ackId: 1,
          })
        );
      };

      this.pubsubClient.onmessage = (msg) => {
        self.handleRealtimeMessage(msg.data);
      };
    }
  }
  private handleRealtimeMessage(message: any) {
    var eventMessage = JSON.parse(message);
    if (eventMessage.type === 'message') {
      var event = eventMessage.data as IRealtimeEvent<any>;
      console.log(event);
      if (event.eventName === 'poll-activated') {
        const activatedPoll = event.payload as IPollDto;
        this.store.dispatch(pollActivated({ poll: activatedPoll }));
      }
      if (event.eventName === 'poll-votes') {
        const incomingVotes = event.payload as Array<IPollVoteDto>;
        this.store.dispatch(voteSeriesUpdate({ dto: incomingVotes }));
      }
    }
  }

  isPollDto(object: any): object is IPollDto {
    return 'id' in object;
  }
  isSessionDetailsDto(object: any): object is ISessionDetailsDto {
    return 'id' in object;
  }
}
