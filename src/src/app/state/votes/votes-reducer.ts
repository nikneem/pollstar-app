import { Action, createReducer, on } from '@ngrx/store';
import {
  voteGetList,
  voteSeriesUpdate,
  votesListUpdated,
} from './votes-actions';
import { INITIAL_VOTES_STATE, IVotesState } from './votes-state';
import * as _ from 'lodash';

const _votesReducer = createReducer(
  INITIAL_VOTES_STATE,
  on(voteGetList, (state, { pollId }) => ({
    ...state,
    isRefreshing: true,
    latestReceivedVotes: undefined,
  })),
  on(votesListUpdated, (state, { dto }) => ({
    ...state,
    isRefreshing: false,
    latestReceivedVotes: dto,
    graphSeries: dto.votes,
  })),
  on(voteSeriesUpdate, (state, { dto }) => ({
    ...state,
    graphSeries: dto,
  }))
);

export function votesReducer(state: IVotesState | undefined, action: Action) {
  return _votesReducer(state, action);
}
