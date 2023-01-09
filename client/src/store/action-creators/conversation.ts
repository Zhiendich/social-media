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
        `http://localhost:5000/api/conversation/${id}`
      );
      setTimeout(() => {
        dispatch({
          type: ConversationActionTypes.FETCH_CONVERSATION_SUCCESS,
          payload: response.data,
        });
      }, 1000);
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
        `http://localhost:5000/api/conversation/`,
        {
          senderId,
          recieverId,
        }
      );
      console.log(response.data);
      setTimeout(() => {
        dispatch({
          type: ConversationActionTypes.MAKE_CONVERSATION_SUCCESS,
          payload: response.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: ConversationActionTypes.MAKE_CONVERSATION_ERROR,
        payload: error,
      });
    }
  };
};
