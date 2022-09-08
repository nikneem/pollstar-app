import { Action, createReducer, on } from '@ngrx/store';
import {
  pollActivated,
  pollCreate,
  pollCreated,
  pollListItemAdded,
  pollListOk,
  pollSelected,
  pollUpdated,
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
  ),
  on(pollUpdated, (state, { dto }) => sessionPollUpdatedHandler(state, dto))
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

function sessionPollUpdatedHandler(
  state: IPollsState,
  payload: IPollDto
): IPollsState {
  const copyState: IPollsState = Object.assign({}, state);
  let pollsList = copyState.sessionPolls
    ? new Array<IPollsListItemDto>(...copyState.sessionPolls)
    : new Array<IPollsListItemDto>();

  const newListItem = {
    id: payload.id,
    name: payload.name,
    description: payload.description,
    displayOrder: payload.displayOrder,
  };
  const pollIndex = pollsList.findIndex((p) => p.id == payload.id);
  if (pollIndex >= 0) {
    pollsList.splice(pollIndex, 1, newListItem);
  } else {
    pollsList.push(newListItem);
  }
  copyState.sessionPolls = pollsList;

  return copyState;
}

export function pollsReducer(state: IPollsState | undefined, action: Action) {
  return _pollsReducer(state, action);
}
