import { Action, createReducer, on } from '@ngrx/store';
import {
  pollActivated,
  pollCreate,
  pollCreated,
  pollListItemAdded,
  pollListOk,
  pollSelected,
} from './polls-actions';
import { IPollDto, IPollsListItemDto } from './polls-models';
import { INITIAL_POLLS_STATE, IPollsState } from './polls-state';

const _pollsReducer = createReducer(
  INITIAL_POLLS_STATE,
  on(pollCreate, (state, { dto }) => ({
    ...state,
    isRefreshing: true,
  })),
  on(pollCreated, (state, { dto }) => ({
    ...state,
    isRefreshing: false,
    selectedPoll: dto,
  })),
  on(pollSelected, (state, { poll }) => ({
    ...state,
    isRefreshing: false,
    selectedPoll: poll,
  })),
  on(pollActivated, (state, { poll }) => ({
    ...state,
    isRefreshing: false,
    activePoll: poll,
  })),
  on(pollListOk, (state, { polls }) => ({
    ...state,
    sessionPolls: polls,
  })),
  on(pollListItemAdded, (state, { poll }) =>
    sessionPollAddedHandler(state, poll)
  )
);

function sessionPollAddedHandler(
  state: IPollsState,
  payload: IPollsListItemDto
): IPollsState {
  const copyState: IPollsState = Object.assign({}, state);

  let pollsList = copyState.sessionPolls
    ? new Array<IPollsListItemDto>(...copyState.sessionPolls)
    : new Array<IPollsListItemDto>();

  pollsList.push(payload);
  copyState.sessionPolls = pollsList;

  return copyState;
}

export function pollsReducer(state: IPollsState | undefined, action: Action) {
  return _pollsReducer(state, action);
}
