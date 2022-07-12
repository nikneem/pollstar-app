import { IPollsListItemDto, ISessionDetailsDto } from './session-models';

export interface ISessionState {
  activeSession?: ISessionDetailsDto;
  sessionPolls?: Array<IPollsListItemDto>;
  isRefreshing: boolean;
}

export const INITIAL_SESSION_STATE: ISessionState = {
  isRefreshing: false,
};
