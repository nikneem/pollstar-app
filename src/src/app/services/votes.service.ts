import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreatePollDto } from '../state/polls/polls-models';
import { ICastVoteDto, IVotesDto } from '../state/votes/votes-models';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  constructor(private http: HttpClient) {}

  public get(pollId: string): Observable<IVotesDto> {
    const url = `${environment.backendUrl}/api/votes/${pollId}`;
    return this.http.get<IVotesDto>(url);
  }
  public post(vote: ICastVoteDto): Observable<IVotesDto> {
    const url = `${environment.backendUrl}/api/votes`;
    return this.http.post<IVotesDto>(url, vote);
  }
}
