import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { PollsService } from 'src/app/services/polls.service';
import { sessionPollAdded } from '../session/session-actions';
import {
  pollActivate,
  pollActivated,
  pollCreate,
  pollCreated,
  pollFailure,
  pollSelect,
  pollSelected,
} from './polls-actions';

@Injectable()
export class PollsEffects {
  constructor(private actions$: Actions, private pollsService: PollsService) {}

  pollCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollCreate),
      mergeMap((act) =>
        this.pollsService.post(act.dto).pipe(
          switchMap((dto) => {
            debugger;
            return of(
              pollCreated({ dto: dto }),
              sessionPollAdded({
                poll: {
                  id: dto.id,
                  name: dto.name,
                  description: dto.description,
                  displayOrder: dto.displayOrder,
                },
              })
            );
          }),
          catchError(() => {
            return of(pollFailure());
          })
        )
      )
    )
  );
  pollSelectEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollSelect),
      mergeMap((act) =>
        this.pollsService.get(act.id).pipe(
          map((dto) => pollSelected({ poll: dto })),
          catchError(() => {
            return of(pollFailure());
          })
        )
      )
    )
  );
  pollActivateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollActivate),
      mergeMap((act) =>
        this.pollsService.activate(act.id).pipe(
          map((dto) => pollActivated({ poll: dto })),
          catchError(() => {
            return of(pollFailure());
          })
        )
      )
    )
  );
}
