import { Dispatch } from "redux";
import axios from "axios";
import { IUser, userAction, UserActionTypes } from "../../types/user";
export const userRegister = (newUserInfo: IUser) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_REGISTER });
      await axios.post(
        "http://localhost:5000/api/user/registration",
        newUserInfo
      );
      setTimeout(() => {
        dispatch({
          type: UserActionTypes.USER_REGISTER_SUCCESS,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_REGISTER_ERROR,
        payload: error,
      });
    }
  };
};

export const userAuth = (userInfo: { email: string; password: string }) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_AUTH });
      const response = await axios.post(
        "http://localhost:5000/api/user/auth",
        userInfo
      );
      setTimeout(() => {
        dispatch({
          type: UserActionTypes.USER_AUTH_SUCCESS,
          payload: response.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const isUserAuth = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.IS_AUTH });
      const response = await axios.get(
        "http://localhost:5000/api/user/getUser",
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: UserActionTypes.IS_AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.IS_AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const getAllUsers = (id: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USERS });
      const response = await axios.get(
        "http://localhost:5000/api/user/getUsers",
        {
          params: {
            id,
          },
        }
      );

      dispatch({
        type: UserActionTypes.FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.FETCH_USERS_ERROR,
        payload: error,
      });
    }
  };
};

export const updateProfile = (
  data: { fullName?: string; avatar?: string },
  id: string
) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.UPDATE_USER });
      const response = await axios.put(
        `http://localhost:5000/api/user/profile/${id}`,
        {
          data,
        }
      );

      dispatch({
        type: UserActionTypes.UPDATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.UPDATE_USER_ERROR,
        payload: error,
      });
    }
  };
};

export const addFriend = (profileId: string, userId: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.ADD_FRIEND });
      const response = await axios.put(
        `http://localhost:5000/api/user/follow/${profileId}`,
        {
          userId,
        }
      );
      dispatch({
        type: UserActionTypes.ADD_FRIEND_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.ADD_FRIEND_ERROR,
        payload: error,
      });
    }
  };
};

export const removeFriend = (profileId: string, userId: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.REMOVE_FRIEND });
      const response = await axios.put(
        `http://localhost:5000/api/user/unfollow/${profileId}`,
        {
          userId,
        }
      );

      dispatch({
        type: UserActionTypes.REMOVE_FRIEND_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.REMOVE_FRIEND_ERROR,
        payload: error,
      });
    }
  };
};

export const getFriends = (id: string) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_FRIENDS });
      const response = await axios.get(
        `http://localhost:5000/api/user/friends/${id}`
      );

      dispatch({
        type: UserActionTypes.FETCH_FRIENDS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.FETCH_FRIENDS_ERROR,
        payload: error,
      });
    }
  };
};