import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  sessionCreate,
  sessionCreateFailed,
  sessionDetailsChanged,
  sessionGet,
  sessionGetPollsList,
  sessionJoin,
  sessionJoinFailed,
  sessionPollsListChanged,
} from './session-actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private sessionsService: SessionsService
  ) {}

  sessionCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionCreate),
      mergeMap((act) =>
        this.sessionsService.post(act.dto).pipe(
          map((dto) => sessionDetailsChanged({ dto: dto })),
          catchError(() => {
            return of(sessionCreateFailed());
          })
        )
      )
    )
  );

  sessionJoinEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(sessionJoin),
    mergeMap((act) =>
      this.sessionsService.join(act.dto.code, act.dto.userId).pipe(
        map((dto) => sessionDetailsChanged({ dto: dto })),
        catchError(() => {
          return of(sessionJoinFailed());
        })
      )
    )
  )
);

  sessionGetEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionGet),
      mergeMap((act) =>
        this.sessionsService.get(act.sessionId, act.userId).pipe(
          map((dto) => sessionDetailsChanged({ dto: dto })),
          catchError(() => {
            return of(sessionCreateFailed());
          })
        )
      )
    )
  );

  sessionGetPollsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionGetPollsList),
      mergeMap((act) =>
        this.sessionsService.getPolls(act.sessionId).pipe(
          map((dto) => sessionPollsListChanged({ polls: dto })),
          catchError(() => {
            return of(sessionCreateFailed());
          })
        )
      )
    )
  );
}
