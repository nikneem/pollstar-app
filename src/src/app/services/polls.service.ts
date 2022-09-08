import { HttpClient, HttpResponse } from '@angular/common/http';
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
  private backendUrl: string;
  constructor(private http: HttpClient) {
    this.backendUrl = environment.backendUrl;
  }

  public list(id: string): Observable<Array<IPollsListItemDto>> {
    const url = `${this.backendUrl}/polls?session=${id}`;
    return this.http.get<Array<IPollsListItemDto>>(url);
  }
  public get(id: string): Observable<IPollDto> {
    const url = `${this.backendUrl}/polls/${id}`;
    return this.http.get<IPollDto>(url);
  }
  public post(poll: ICreatePollDto): Observable<IPollDto> {
    const url = `${this.backendUrl}/polls`;
    return this.http.post<IPollDto>(url, poll);
  }
  public put(id: string, poll: IPollDto): Observable<IPollDto> {
    const url = `${this.backendUrl}/polls/${id}`;
    return this.http.put<IPollDto>(url, poll);
  }
  public delete(id: string): Observable<HttpResponse<any>> {
    const url = `${this.backendUrl}/polls/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
  public activate(id: string): Observable<IPollDto> {
    const url = `${this.backendUrl}/polls/${id}/activate`;
    return this.http.get<IPollDto>(url);
  }
}
