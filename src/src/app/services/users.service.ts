import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserDetailsDto } from '../state/user/user-models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public identify(userId?: string): Observable<IUserDetailsDto> {
    const userIdAddon = userId ? `/${userId}` : '';
    const url = `${environment.backendUrl}/api/users${userIdAddon}`;
    return this.http.get<IUserDetailsDto>(url);
  }
}
