import { Action, createReducer, on } from '@ngrx/store';
import { pollCreate, pollCreated } from './polls-actions';
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
  }))
);

export function pollsReducer(state: IPollsState | undefined, action: Action) {
  return _pollsReducer(state, action);
}
