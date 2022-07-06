import { Action, createReducer, on } from '@ngrx/store';
import {
  userIdentify,
  userIdentifyFailed,
  userIdentifySuccess,
} from './user-actions';
import { INITIAL_USER_STATE, IUserState } from './user-state';

const _usersReducer = createReducer(
  INITIAL_USER_STATE,
  on(userIdentify, (state, { userId }) => ({
    ...state,
    isRefreshing: true,
    userId: undefined,
  })),
  on(userIdentifySuccess, (state, { userId }) => ({
    ...state,
    isRefreshing: false,
    userId: userId,
  })),
  on(userIdentifyFailed, (state) => ({
    ...state,
    isRefreshing: false,
  }))
);

export function usersReducer(state: IUserState | undefined, action: Action) {
  return _usersReducer(state, action);
}
