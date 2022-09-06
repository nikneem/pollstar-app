import { createAction, props } from '@ngrx/store';
import {
  ISessionCreateDto,
  ISessionDetailsDto,
  ISessionJoinDto,
} from './session-models';

export const sessionCreate = createAction(
  '[Session] Create',
  props<{ dto: ISessionCreateDto }>()
);
export const sessionCreateFailed = createAction('[Session] Create Failed');

export const sessionJoin = createAction(
  '[Session] Join',
  props<{ dto: ISessionJoinDto }>()
);
export const sessionJoinFailed = createAction('[Session] Create Failed');

export const sessionGet = createAction(
  '[Session] Get',
  props<{ sessionId: string; userId: string }>()
);

export const sessionDetailsChanged = createAction(
  '[Session] Details changed',
  props<{ dto: ISessionDetailsDto }>()
);
