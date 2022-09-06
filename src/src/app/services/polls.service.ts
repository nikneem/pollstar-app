import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ICreatePollDto,
  IPollDto,
  IPollsListItemDto,
} from '../state/polls/polls-models';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpClient) {}

  public post(poll: ICreatePollDto): Observable<IPollDto> {
    const url = `${environment.backendUrl}/polls`;
    return this.http.post<IPollDto>(url, poll);
  }

  public list(id: string): Observable<Array<IPollsListItemDto>> {
    const url = `${environment.backendUrl}/polls?sessionId=${id}`;
    return this.http.get<Array<IPollsListItemDto>>(url);
  }
  public get(id: string): Observable<IPollDto> {
    const url = `${environment.backendUrl}/polls/${id}`;
    return this.http.get<IPollDto>(url);
  }
  public activate(id: string): Observable<IPollDto> {
    const url = `${environment.backendUrl}/polls/${id}/activate`;
    return this.http.get<IPollDto>(url);
  }
}
