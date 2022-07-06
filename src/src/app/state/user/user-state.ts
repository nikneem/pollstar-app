export interface IUserState {
  userId?: string;
  isRefreshing: boolean;
}

export const INITIAL_USER_STATE: IUserState = {
  isRefreshing: false,
};
