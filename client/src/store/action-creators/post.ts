import { Dispatch } from "redux";
import axios from "axios";
import { IPost, postAction, PostActionTypes } from "../../types/post";

export const getAllPosts = () => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.FETCH_POST });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_POST}/posts`
      );
      dispatch({
        type: PostActionTypes.FETCH_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.FETCH_POST_ERROR,
        payload: error,
      });
    }
  };
};

export const createPost = (newPost: IPost) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.POST_ADD });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_POST}`,
        newPost
      );
      setTimeout(() => {
        dispatch({
          type: PostActionTypes.POST_ADD_SUCCESS,
          payload: response.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.POST_ADD_ERROR,
        payload: error,
      });
    }
  };
};

export const deletePost = (userId: string, id: string) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.POST_DELETE });
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_POST}/${id}`,
        {
          data: {
            userId,
          },
        }
      );
      setTimeout(() => {
        dispatch({
          type: PostActionTypes.POST_DELETE_SUCCESS,
          payload: response.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.POST_DELETE_ERROR,
        payload: error,
      });
    }
  };
};

export const updatePost = (desc: string, id: string, userId: string) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.POST_UPDATE });
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_POST}/${id}`,
        {
          desc,
          userId,
        }
      );
      setTimeout(() => {
        dispatch({
          type: PostActionTypes.POST_UPDATE_SUCCESS,
          payload: response.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.POST_UPDATE_ERROR,
        payload: error,
      });
    }
  };
};
