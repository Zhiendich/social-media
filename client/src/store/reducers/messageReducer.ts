import {
  IMessageState,
  messageAction,
  MessageActionTypes,
} from "../../types/message";

const initialState: IMessageState = {
  messages: [],
  isMessageLoading: false,
  isMessageError: null,
};

export const messageReducer = (
  state = initialState,
  action: messageAction
): IMessageState => {
  switch (action.type) {
    case MessageActionTypes.FETCH_MESSAGE:
      return {
        messages: state.messages,
        isMessageLoading: true,
        isMessageError: null,
      };
    case MessageActionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        messages: action.payload,
        isMessageLoading: false,
        isMessageError: null,
      };
    case MessageActionTypes.FETCH_MESSAGE_ERROR:
      return {
        messages: state.messages,
        isMessageLoading: false,
        isMessageError: action.payload,
      };
    case MessageActionTypes.SEND_MESSAGE:
      return {
        messages: state.messages,
        isMessageLoading: true,
        isMessageError: null,
      };
    case MessageActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        messages: [...state.messages, action.payload],
        isMessageLoading: false,
        isMessageError: null,
      };
    case MessageActionTypes.SEND_MESSAGE_ERROR:
      return {
        messages: state.messages,
        isMessageLoading: false,
        isMessageError: action.payload,
      };
    default:
      return state;
  }
};
