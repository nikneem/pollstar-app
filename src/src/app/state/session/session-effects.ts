import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  sessionCreate,
  sessionCreateFailed,
  sessionCreateSuccess,
} from './session-actions';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private sessionsService: SessionsService
  ) {}

  tableGetActiveRoundEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sessionCreate),
      mergeMap((act) =>
        this.sessionsService.post(act.dto).pipe(
          map((dto) => sessionCreateSuccess({ dto: dto })),
          tap((v) => {console.log(v)}),
          catchError(() => {
            return of(sessionCreateFailed());
          })
        )
      )
    )
  );
}
