import {
  conversationAction,
  ConversationActionTypes,
  IConversationState,
} from "../../types/conversation";

const initialState: IConversationState = {
  conversation: [],
  isConversationError: null,
  isConversationLoading: false,
};

export const conversationReducer = (
  state = initialState,
  action: conversationAction
): IConversationState => {
  switch (action.type) {
    case ConversationActionTypes.FETCH_CONVERSATION:
      return {
        conversation: state.conversation,
        isConversationError: null,
        isConversationLoading: true,
      };
    case ConversationActionTypes.FETCH_CONVERSATION_SUCCESS:
      return {
        conversation: action.payload,
        isConversationError: null,
        isConversationLoading: false,
      };
    case ConversationActionTypes.FETCH_CONVERSATION_ERROR:
      return {
        conversation: state.conversation,
        isConversationError: action.payload,
        isConversationLoading: false,
      };
    case ConversationActionTypes.MAKE_CONVERSATION:
      return {
        conversation: state.conversation,
        isConversationError: null,
        isConversationLoading: true,
      };
    case ConversationActionTypes.MAKE_CONVERSATION_SUCCESS:
      return {
        conversation: [action.payload, ...state.conversation],
        isConversationError: null,
        isConversationLoading: false,
      };
    case ConversationActionTypes.MAKE_CONVERSATION_ERROR:
      return {
        conversation: state.conversation,
        isConversationError: action.payload,
        isConversationLoading: false,
      };
    default:
      return state;
  }
};
