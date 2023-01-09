import { GlobalAppState } from "../reducers";

export const selectConversations = (state: GlobalAppState) =>
  state.conversation.conversation;
