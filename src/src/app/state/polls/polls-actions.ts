import { createAction, props } from '@ngrx/store';
import { ICreatePollDto, IPollDto, IPollsListItemDto } from './polls-models';

export const pollCreate = createAction(
  '[Polls] Create',
  props<{ dto: ICreatePollDto }>()
);
export const pollCreated = createAction(
  '[Polls] Created',
  props<{ dto: IPollDto }>()
);
export const pollList = createAction('[Polls] List', props<{ id: string }>());
export const pollListOk = createAction(
  '[Polls] List OK',
  props<{ polls: Array<IPollsListItemDto> }>()
);
export const pollListItemAdded = createAction(
  '[Polls] List OK',
  props<{ poll: IPollDto }>()
);
export const pollUpdate = createAction(
  '[Polls] Update',
  props<{ id: string; dto: IPollDto }>()
);
export const pollUpdated = createAction(
  '[Polls] Updated',
  props<{ dto: IPollDto }>()
);
export const pollGetActive = createAction(
  '[Polls] Get active',
  props<{ sessionId: string }>()
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
