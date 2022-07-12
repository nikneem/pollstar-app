import { createAction, props } from '@ngrx/store';
import { ICreatePollDto, IPollDto } from './polls-models';

export const pollCreate = createAction(
  '[Polls] Create',
  props<{ dto: ICreatePollDto }>()
);
export const pollCreated = createAction(
  '[Polls] Created',
  props<{ dto: IPollDto }>()
);
export const pollFailure = createAction('[Polls] Failure');
