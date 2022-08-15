import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IAppState } from '../state/app-state';
import { pollActivated } from '../state/polls/polls-actions';
import { IPollDto } from '../state/polls/polls-models';
import { ISessionDetailsDto } from '../state/session/session-models';

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
  private pubsubClient?: WebSocket;
  private sessionId?: string;

  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  public connect(sessionId: string, userId: string) {
    this.sessionId = sessionId;
    var url = `${environment.backendUrl}/api/sessions/${sessionId}/realtime?userId=${userId}`;
    this.http.get<IPubSubConnectionInformation>(url).subscribe((val) => {
      this.connectSocket(val.pubsubClientUrl);
    });
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
      if (event.eventName === 'poll-activated') {
        const activatedPoll = event.payload as IPollDto;
        this.store.dispatch(pollActivated({ poll: activatedPoll }));
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
