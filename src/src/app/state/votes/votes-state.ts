import { IPollVoteDto, IVotesDto } from './votes-models';

export interface IVotesState {
  latestReceivedVotes?: IVotesDto;
  graphSeries?: Array<IPollVoteDto>;
  isRefreshing: boolean;
}

export const INITIAL_VOTES_STATE: IVotesState = {
  isRefreshing: false,
};
