export interface IMessage {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
}

export interface IMessageState {
  messages: IMessage[];
  isMessageLoading?: boolean;
  isMessageError?: null | string;
}

export enum MessageActionTypes {
  FETCH_MESSAGE = "FETCH_MESSAGE",
  FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS",
  FETCH_MESSAGE_ERROR = "FETCH_MESSAGE_ERROR",
  SEND_MESSAGE = "SEND_MESSAGE",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_ERROR = "SEND_MESSAGE_ERROR",
}

interface MessageFetchAction {
  type: MessageActionTypes.FETCH_MESSAGE;
}

interface MessageFetchSuccessAction {
  type: MessageActionTypes.FETCH_MESSAGE_SUCCESS;
  payload: IMessage[];
}

interface MessageFetchErrorAction {
  type: MessageActionTypes.FETCH_MESSAGE_ERROR;
  payload: string;
}

interface SendMessageAction {
  type: MessageActionTypes.SEND_MESSAGE;
}

interface SendMessageSuccessAction {
  type: MessageActionTypes.SEND_MESSAGE_SUCCESS;
  payload: IMessage;
}

interface SendMessageErrorAction {
  type: MessageActionTypes.SEND_MESSAGE_ERROR;
  payload: string;
}

export type messageAction =
  | MessageFetchAction
  | MessageFetchSuccessAction
  | MessageFetchErrorAction
  | SendMessageAction
  | SendMessageSuccessAction
  | SendMessageErrorAction;
