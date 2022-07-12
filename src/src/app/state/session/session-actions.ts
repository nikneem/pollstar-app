import { createAction, props } from '@ngrx/store';
import {
  IPollsListItemDto,
  ISessionCreateDto,
  ISessionDetailsDto,
} from './session-models';

export const sessionCreate = createAction(
  '[Session] Create',
  props<{ dto: ISessionCreateDto }>()
);
export const sessionCreateFailed = createAction('[Session] Create Failed');

export const sessionGet = createAction(
  '[Session] Get',
  props<{ sessionId: string; userId: string }>()
);

export const sessionDetailsChanged = createAction(
  '[Session] Details changed',
  props<{ dto: ISessionDetailsDto }>()
);

export const sessionGetPollsList = createAction(
  '[Session] Get Polls List',
  props<{ sessionId: string }>()
);
export const sessionPollsListChanged = createAction(
  '[Session] Session polls list changed',
  props<{ polls: Array<IPollsListItemDto> }>()
);
export const sessionPollAdded = createAction(
  '[Session] SessionPollAdded',
  props<{ poll: IPollsListItemDto }>()
);
