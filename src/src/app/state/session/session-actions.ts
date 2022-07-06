import { createAction, props } from '@ngrx/store';
import { ISessionCreateDto, ISessionDetailsDto } from './session-models';

export const sessionCreate = createAction(
  '[Session] Create',
  props<{ dto: ISessionCreateDto }>()
);
export const sessionCreateSuccess = createAction(
  '[Session] Create Success',
  props<{ dto: ISessionDetailsDto }>()
);
export const sessionCreateFailed = createAction('[Session] Create Failed');

export const sessionGet = createAction(
  '[Session] Get',
  props<{ sessionId: string; userId: string }>()
);
