import { createAction, props } from '@ngrx/store';

export const userIdentify = createAction(
  '[User] Identify',
  props<{ userId?: string }>()
);
export const userIdentifySuccess = createAction(
  '[User] Identify Success',
  props<{ userId: string }>()
);
export const userIdentifyFailed = createAction('[User] Identify Failed');
