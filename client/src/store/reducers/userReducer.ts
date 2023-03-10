import { IUserState, userAction, UserActionTypes } from "../../types/user";

const initialState: IUserState = {
  data: null,
  users: null,
};

export const userReducer = (
  state = initialState,
  action: userAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return {
        isUsersLoading: true,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        isUsersLoading: false,
        data: state.data,
        users: action.payload,
      };
    case UserActionTypes.FETCH_USERS_ERROR:
      return {
        isUsersLoading: false,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_AUTH:
      return {
        isAuthLoading: true,
        isAuthError: null,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_AUTH_SUCCESS:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: action.payload,
        users: state.users,
      };
    case UserActionTypes.USER_AUTH_ERROR:
      return {
        isAuthLoading: false,
        isAuthError: action.payload,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_REGISTER:
      return {
        isRegisterLoading: true,
        isRegisterError: null,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        isRegisterLoading: false,
        isRegisterError: null,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_REGISTER_ERROR:
      return {
        isRegisterLoading: false,
        isRegisterError: action.payload,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.IS_AUTH:
      return {
        isAuthLoading: true,
        isAuthError: null,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.IS_AUTH_SUCCESS:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: { token: null, user: action.payload },
        users: state.users,
      };
    case UserActionTypes.IS_AUTH_ERROR:
      return {
        isAuthLoading: false,
        isAuthError: action.payload,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.UPDATE_USER:
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        data: { ...state.data, user: action.payload },
        users: state.users?.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case UserActionTypes.UPDATE_USER_ERROR:
      console.log(action.type, action.payload);
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.DELETE_USER:
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.DELETE_USER_SUCCESS:
      return {
        data: null,
        users: state.users,
      };
    case UserActionTypes.DELETE_USER_ERROR:
      console.log(action.type, action.payload);
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.ADD_FRIEND:
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.ADD_FRIEND_SUCCESS:
      return {
        data: { ...state.data, user: action.payload },
        users: state.users,
      };
    case UserActionTypes.ADD_FRIEND_ERROR:
      console.log(action.type, action.payload);
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.REMOVE_FRIEND:
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.REMOVE_FRIEND_SUCCESS:
      return {
        data: { ...state.data, user: action.payload },
        users: state.users,
      };
    case UserActionTypes.REMOVE_FRIEND_ERROR:
      console.log(action.type, action.payload);
      return {
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.FETCH_FRIENDS:
      return {
        isFriendLoading: true,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.FETCH_FRIENDS_SUCCESS:
      return {
        isFriendLoading: false,
        data: state.data,
        users: action.payload,
      };
    case UserActionTypes.FETCH_FRIENDS_ERROR:
      console.log(action.type, action.payload);
      return {
        isFriendLoading: false,
        data: state.data,
        users: state.users,
      };
    case UserActionTypes.USER_LOG_OUT:
      return {
        data: null,
        users: null,
      };
    default:
      return state;
  }
};
