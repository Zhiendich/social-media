import axios from "axios";
import { Dispatch } from "react";
import {
  conversationAction,
  ConversationActionTypes,
} from "../../types/conversation";

export const getConversations = (id: string) => {
  return async (dispatch: Dispatch<conversationAction>) => {
    try {
      dispatch({ type: ConversationActionTypes.FETCH_CONVERSATION });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_CONVERSATION}/${id}`
      );

      dispatch({
        type: ConversationActionTypes.FETCH_CONVERSATION_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: ConversationActionTypes.FETCH_CONVERSATION_ERROR,
        payload: error,
      });
    }
  };
};

export const makeConversations = (senderId: string, recieverId: string) => {
  return async (dispatch: Dispatch<conversationAction>) => {
    try {
      dispatch({ type: ConversationActionTypes.MAKE_CONVERSATION });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_CONVERSATION}/`,
        {
          senderId,
          recieverId,
        }
      );

      dispatch({
        type: ConversationActionTypes.MAKE_CONVERSATION_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: ConversationActionTypes.MAKE_CONVERSATION_ERROR,
        payload: error,
      });
    }
  };
};
