import { IPollDto } from './polls-models';

export interface IPollsState {
    activePoll?: IPollDto;
    selectedPoll?: IPollDto;
    isRefreshing: boolean;
}

export const INITIAL_POLLS_STATE: IPollsState = {
  isRefreshing: false,
};
