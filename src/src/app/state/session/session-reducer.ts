import { Action, createReducer, on } from '@ngrx/store';
import { sessionCreate, sessionCreateSuccess } from './session-actions';
import { INITIAL_SESSION_STATE, ISessionState } from './session-state';

const _sessionsReducer = createReducer(
  INITIAL_SESSION_STATE,
  on(sessionCreate, (state, { dto }) => ({
    ...state,
    isRefreshing: true,
    activeSession: undefined,
  })),
  on(sessionCreateSuccess, (state, { dto }) => ({
    ...state,
    isRefreshing: false,
    activeSession: dto,
  }))
);

export function sessionsReducer(
  state: ISessionState | undefined,
  action: Action
) {
  return _sessionsReducer(state, action);
}
