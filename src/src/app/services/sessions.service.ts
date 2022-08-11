import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IPollsListItemDto,
  ISessionCreateDto,
  ISessionDetailsDto,
} from '../state/session/session-models';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(private http: HttpClient) {}

  public post(dto: ISessionCreateDto): Observable<ISessionDetailsDto> {
    const url = `${environment.backendUrl}/api/sessions`;
    return this.http.post<ISessionDetailsDto>(url, dto);
  }
  public join(
    code: string,
    userId: string
  ): Observable<ISessionDetailsDto> {
    const url = `${environment.backendUrl}/api/sessions/${code}/details?userId=${userId}`;
    return this.http.get<ISessionDetailsDto>(url);
  }
  public get(
    sessionId: string,
    userId: string
  ): Observable<ISessionDetailsDto> {
    const url = `${environment.backendUrl}/api/sessions/${sessionId}?userId=${userId}`;
    return this.http.get<ISessionDetailsDto>(url);
  }
  public getPolls(sessionId: string): Observable<Array<IPollsListItemDto>> {
    const url = `${environment.backendUrl}/api/sessions/${sessionId}/polls`;
    return this.http.get<Array<IPollsListItemDto>>(url);
  }
}
