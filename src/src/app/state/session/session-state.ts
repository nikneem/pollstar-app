import { ISessionDetailsDto } from './session-models';

export interface ISessionState {
  activeSession?: ISessionDetailsDto;
  isRefreshing: boolean;
}

export const INITIAL_SESSION_STATE: ISessionState = {
  isRefreshing: false,
};
