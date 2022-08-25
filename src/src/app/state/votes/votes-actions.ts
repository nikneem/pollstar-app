import { createAction, props } from '@ngrx/store';
import { ICastVoteDto, IPollVoteDto, IVotesDto } from './votes-models';

export const voteGetList = createAction(
  '[Votes] List',
  props<{ pollId: string }>()
);
export const votesListUpdated = createAction(
  '[Votes] List Updated',
  props<{ dto: IVotesDto }>()
);
export const voteSeriesUpdate = createAction(
  '[Votes] Series Update',
  props<{ dto: Array<IPollVoteDto> }>()
);
export const voteCast = createAction(
  '[Votes] Cast',
  props<{ dto: ICastVoteDto }>()
);
export const votesError = createAction(
  '[Votes] Error',
  props<{ error: string }>()
);
