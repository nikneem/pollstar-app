import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreatePollDto, IPollDto } from '../state/polls/polls-models';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  constructor(private http: HttpClient) {}

  public post(poll: ICreatePollDto): Observable<IPollDto> {
    const url = `${environment.backendUrl}/api/polls`;
    return this.http.post<IPollDto>(url, poll);
  }

  public get(id: string): Observable<IPollDto> {
    const url = `${environment.backendUrl}/api/polls/${id}`;
    return this.http.get<IPollDto>(url);
  }
}
