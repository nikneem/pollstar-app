import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  tap,
  mergeMap,
  catchError,
  switchMap,
  debounceTime,
} from 'rxjs/operators';
import { VotesService } from 'src/app/services/votes.service';
import {
  voteCast,
  voteGetList,
  votesError,
  votesListUpdated,
} from './votes-actions';

@Injectable()
export class VotesEffects {
  constructor(private actions$: Actions, private votesService: VotesService) {}

  voteGetListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voteGetList),
      mergeMap((act) =>
        this.votesService.get(act.pollId).pipe(
          map((dto) => votesListUpdated({ dto: dto })),
          catchError((err) => {
            return of(votesError(err.message));
          })
        )
      )
    )
  );
  voteCastEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voteCast),
      debounceTime(500),
      mergeMap((act) =>
        this.votesService.post(act.dto).pipe(
          map((dto) => votesListUpdated({ dto: dto })),
          catchError((err) => {
            return of(votesError(err.message));
          })
        )
      )
    )
  );
}
