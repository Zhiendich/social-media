import axios from "axios";
import { Dispatch } from "react";
import { messageAction, MessageActionTypes } from "../../types/message";

export const getMessages = (conversationId: string) => {
  return async (dispatch: Dispatch<messageAction>) => {
    try {
      dispatch({ type: MessageActionTypes.FETCH_MESSAGE });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_MESSAGE}/${conversationId}`
      );
      dispatch({
        type: MessageActionTypes.FETCH_MESSAGE_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: MessageActionTypes.FETCH_MESSAGE_ERROR,
        payload: error,
      });
    }
  };
};

export const sendMessages = (
  conversationId: string,
  sender: string,
  text: string
) => {
  return async (dispatch: Dispatch<messageAction>) => {
    try {
      dispatch({ type: MessageActionTypes.SEND_MESSAGE });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_MESSAGE}/`,
        {
          conversationId,
          sender,
          text,
        }
      );
      dispatch({
        type: MessageActionTypes.SEND_MESSAGE_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: MessageActionTypes.SEND_MESSAGE_ERROR,
        payload: error,
      });
    }
  };
};
