export interface IUser {
  _id?: string;
  email: string;
  phone: string;
  fullName: string;
  password: string;
  avatar?: string;
  followers?: string[];
  followings?: string[];
}
export interface IUserState {
  data: {
    token?: string | null;
    user: IUser;
  } | null;
  users?: IUser[] | null;
  isRegisterLoading?: boolean;
  isRegisterError?: null | string;
  isAuthLoading?: boolean;
  isAuthError?: null | string;
}

export enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
  USER_AUTH = "USER_AUTH",
  USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS",
  USER_AUTH_ERROR = "USER_AUTH_ERROR",
  USER_REGISTER = "USER_REGISTER",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_ERROR = "USER_REGISTER_ERROR",
  IS_AUTH = "IS_AUTH",
  IS_AUTH_SUCCESS = "IS_AUTH_SUCCESS",
  IS_AUTH_ERROR = "IS_AUTH_ERROR",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
  ADD_FRIEND = "ADD_FRIEND",
  ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS",
  ADD_FRIEND_ERROR = "ADD_FRIEND_ERROR",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  REMOVE_FRIEND_SUCCESS = "REMOVE_FRIEND_SUCCESS",
  REMOVE_FRIEND_ERROR = "REMOVE_FRIEND_ERROR",
  FETCH_FRIENDS = "FETCH_FRIENDS",
  FETCH_FRIENDS_SUCCESS = "FETCH_FRIENDS_SUCCESS",
  FETCH_FRIENDS_ERROR = "FETCH_FRIENDS_ERROR",
  USER_LOG_OUT = " USER_LOG_OUT",
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USERS;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

interface UserAuthAction {
  type: UserActionTypes.USER_AUTH;
}

interface UserAuthSuccessAction {
  type: UserActionTypes.USER_AUTH_SUCCESS;
  payload: {
    token: string;
    user: IUser;
  };
}

interface UserAuthErrorAction {
  type: UserActionTypes.USER_AUTH_ERROR;
  payload: string;
}
interface UserRegisterAction {
  type: UserActionTypes.USER_REGISTER;
}

interface UserRegisterSuccessAction {
  type: UserActionTypes.USER_REGISTER_SUCCESS;
}

interface UserRegisterErrorAction {
  type: UserActionTypes.USER_REGISTER_ERROR;
  payload: string;
}

interface IsAuthAction {
  type: UserActionTypes.IS_AUTH;
}

interface IsAuthSuccessAction {
  type: UserActionTypes.IS_AUTH_SUCCESS;
  payload: IUser;
}

interface IsAuthErrorAction {
  type: UserActionTypes.IS_AUTH_ERROR;
  payload: string;
}

interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER;
}

interface UpdateUserSuccessAction {
  type: UserActionTypes.UPDATE_USER_SUCCESS;
  payload: IUser;
}

interface UpdateUserErrorAction {
  type: UserActionTypes.UPDATE_USER_ERROR;
  payload: string;
}

interface AddFriendAction {
  type: UserActionTypes.ADD_FRIEND;
}

interface AddFriendSuccessAction {
  type: UserActionTypes.ADD_FRIEND_SUCCESS;
}

interface AddFriendErrorAction {
  type: UserActionTypes.ADD_FRIEND_ERROR;
  payload: string;
}

interface RemoveFriendAction {
  type: UserActionTypes.REMOVE_FRIEND;
}

interface RemoveFriendSuccessAction {
  type: UserActionTypes.REMOVE_FRIEND_SUCCESS;
}

interface RemoveFriendErrorAction {
  type: UserActionTypes.REMOVE_FRIEND_ERROR;
  payload: string;
}

interface FetchFriendsAction {
  type: UserActionTypes.FETCH_FRIENDS;
}

interface FetchFriendsSuccessAction {
  type: UserActionTypes.FETCH_FRIENDS_SUCCESS;
  payload: IUser[];
}

interface FetchFriendsErrorAction {
  type: UserActionTypes.FETCH_FRIENDS_ERROR;
  payload: string;
}

interface UserLogOutAction {
  type: UserActionTypes.USER_LOG_OUT;
}

export type userAction =
  | FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | UserAuthAction
  | UserAuthSuccessAction
  | UserAuthErrorAction
  | UserRegisterAction
  | UserRegisterSuccessAction
  | UserRegisterErrorAction
  | IsAuthAction
  | IsAuthSuccessAction
  | IsAuthErrorAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserErrorAction
  | AddFriendAction
  | AddFriendSuccessAction
  | AddFriendErrorAction
  | RemoveFriendAction
  | RemoveFriendSuccessAction
  | RemoveFriendErrorAction
  | FetchFriendsAction
  | FetchFriendsErrorAction
  | FetchFriendsSuccessAction
  | UserLogOutAction;
