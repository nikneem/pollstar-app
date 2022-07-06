import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import {
  userIdentify,
  userIdentifyFailed,
  userIdentifySuccess,
} from './user-actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  tableGetActiveRoundEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userIdentify),
      mergeMap((act) =>
        this.usersService.identify(act.userId).pipe(
          map((dto) => userIdentifySuccess({ userId: dto.userId })),
          tap((state) => {
            localStorage.setItem('pollstar-user-id', state.userId);
          }),
          catchError(() => {
            return of(userIdentifyFailed());
          })
        )
      )
    )
  );
}
