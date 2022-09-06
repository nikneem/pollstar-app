import { IPollDto, IPollsListItemDto } from './polls-models';

export interface IPollsState {
  sessionPolls?: Array<IPollsListItemDto>;
  activePoll?: IPollDto;
  selectedPoll?: IPollDto;
  isRefreshing: boolean;
}

export const INITIAL_POLLS_STATE: IPollsState = {
  isRefreshing: false,
};
