import { Action, createReducer, on } from '@ngrx/store';
import {
  sessionCreate,
  sessionDetailsChanged,
  sessionJoin,
  sessionPollAdded,
  sessionPollsListChanged,
} from './session-actions';
import { IPollsListItemDto } from './session-models';
import { INITIAL_SESSION_STATE, ISessionState } from './session-state';

const _sessionsReducer = createReducer(
  INITIAL_SESSION_STATE,
  on(sessionCreate, (state, { dto }) => ({
    ...state,
    isRefreshing: true,
    activeSession: undefined,
  })),
  on(sessionJoin, (state, { dto }) => ({
    ...state,
    isRefreshing: true,
    activeSession: undefined,
  })),
  on(sessionDetailsChanged, (state, { dto }) => ({
    ...state,
    isRefreshing: false,
    activeSession: dto,
    sessionPolls: undefined,
  })),
  on(sessionPollsListChanged, (state, { polls }) => ({
    ...state,
    sessionPolls: polls,
  })),
  on(sessionPollAdded, (state, { poll }) =>
    sessionPollAddedHandler(state, poll)
  )
);

function sessionPollAddedHandler(
  state: ISessionState,
  payload: IPollsListItemDto
): ISessionState {
  const copyState: ISessionState = Object.assign({}, state);

  let pollsList = copyState.sessionPolls
    ? new Array<IPollsListItemDto>(...copyState.sessionPolls)
    : new Array<IPollsListItemDto>();

  pollsList.push(payload);
  copyState.sessionPolls = pollsList;

  return copyState;
}

export function sessionsReducer(
  state: ISessionState | undefined,
  action: Action
) {
  return _sessionsReducer(state, action);
}
