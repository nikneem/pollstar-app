import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { PollsService } from 'src/app/services/polls.service';
import {
  pollActivate,
  pollActivated,
  pollCreate,
  pollCreated,
  pollFailure,
  pollList,
  pollListItemAdded,
  pollListOk,
  pollSelect,
  pollSelected,
  pollUpdate,
  pollUpdated,
} from './polls-actions';

@Injectable()
export class PollsEffects {
  constructor(private actions$: Actions, private pollsService: PollsService) {}

  pollListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollList),
      mergeMap((act) =>
        this.pollsService.list(act.id).pipe(
          map((dto) => pollListOk({ polls: dto })),
          catchError(() => {
            return of(pollFailure());
          })
        )
      )
    )
  );

  pollCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollCreate),
      mergeMap((act) =>
        this.pollsService.post(act.dto).pipe(
          switchMap((dto) => {
            return of(
              pollCreated({ dto: dto }),
              pollListItemAdded({
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

  pollUpdateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pollUpdate),
      mergeMap((act) =>
        this.pollsService.put(act.id, act.dto).pipe(
          map((dto) => pollUpdated({ dto: dto })),
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
