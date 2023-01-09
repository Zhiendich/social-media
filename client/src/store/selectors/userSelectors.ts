import { GlobalAppState } from "../reducers";

export const selectUser = (state: GlobalAppState) => state.user.data?.user;
export const selectAllUsers = (state: GlobalAppState) => state.user.users;
export const selectIsAuthLoading = (state: GlobalAppState) =>
  state.user.isAuthLoading;
export const selectIsAuthError = (state: GlobalAppState) =>
  state.user.isAuthError;
export const selectIsRegister = (state: GlobalAppState) =>
  state.user.isRegisterLoading;
export const selectToken = (state: GlobalAppState) => state.user.data?.token;
