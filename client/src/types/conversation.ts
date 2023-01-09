export interface IConversation {
  _id: string;
  members: string[];
}

export interface IConversationState {
  conversation: IConversation[];
  isConversationLoading: boolean;
  isConversationError: null | string;
}

export enum ConversationActionTypes {
  FETCH_CONVERSATION = "FETCH_CONVERSATION",
  FETCH_CONVERSATION_SUCCESS = "FETCH_CONVERSATION_SUCCESS",
  FETCH_CONVERSATION_ERROR = "FETCH_CONVERSATION_ERROR",
  MAKE_CONVERSATION = "MAKE_CONVERSATION",
  MAKE_CONVERSATION_SUCCESS = "MAKE_CONVERSATION_SUCCESS",
  MAKE_CONVERSATION_ERROR = "MAKE_CONVERSATION_ERROR",
}

interface ConversationFetchAction {
  type: ConversationActionTypes.FETCH_CONVERSATION;
}

interface ConversationFetchSuccessAction {
  type: ConversationActionTypes.FETCH_CONVERSATION_SUCCESS;
  payload: IConversation[];
}

interface ConversationFetchErrorAction {
  type: ConversationActionTypes.FETCH_CONVERSATION_ERROR;
  payload: string;
}

interface MakeConversationFetchAction {
  type: ConversationActionTypes.MAKE_CONVERSATION;
}

interface MakeConversationFetchSuccessAction {
  type: ConversationActionTypes.MAKE_CONVERSATION_SUCCESS;
  payload: IConversation;
}

interface MakeConversationFetchErrorAction {
  type: ConversationActionTypes.MAKE_CONVERSATION_ERROR;
  payload: string;
}

export type conversationAction =
  | ConversationFetchAction
  | ConversationFetchSuccessAction
  | ConversationFetchErrorAction
  | MakeConversationFetchAction
  | MakeConversationFetchSuccessAction
  | MakeConversationFetchErrorAction;
