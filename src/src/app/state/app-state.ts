import { sessionsReducer } from './session/session-reducer';
import { INITIAL_SESSION_STATE, ISessionState } from './session/session-state';
import { usersReducer } from './user/user-reducer';
import { INITIAL_USER_STATE, IUserState } from './user/user-state';

export interface IAppState {
  userState: IUserState;
  sessionState: ISessionState;
}
export const INITIAL_APP_STATE: IAppState = {
  userState: INITIAL_USER_STATE,
  sessionState: INITIAL_SESSION_STATE,
};

export const reducers = {
  userState: usersReducer,
  sessionState: sessionsReducer,
};
