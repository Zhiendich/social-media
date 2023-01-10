import { GlobalAppState } from "../reducers";

export const selectConversations = (state: GlobalAppState) =>
  state.conversation.conversation;
export const selectConversationLoading = (state: GlobalAppState) =>
  state.conversation.isConversationLoading;
