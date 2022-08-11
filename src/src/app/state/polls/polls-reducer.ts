import { Action, createReducer, on } from '@ngrx/store';
import {
  pollActivated,
  pollCreate,
  pollCreated,
  pollSelected,
} from './polls-actions';
import { IPollDto } from './polls-models';
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
  }))
);

export function pollsReducer(state: IPollsState | undefined, action: Action) {
  return _pollsReducer(state, action);
}
