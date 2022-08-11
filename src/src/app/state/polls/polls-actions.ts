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

export const pollSelect = createAction(
  '[Polls] Select',
  props<{ id: string }>()
);
export const pollSelected = createAction(
  '[Polls] Selected',
  props<{ poll: IPollDto }>()
);
export const pollActivate = createAction(
  '[Polls] Activate',
  props<{ id: string }>()
);
export const pollActivated = createAction(
  '[Polls] Activated',
  props<{ poll: IPollDto }>()
);
export const pollFailure = createAction('[Polls] Failure');
