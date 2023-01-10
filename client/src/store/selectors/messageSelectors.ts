import { GlobalAppState } from "../reducers";

export const selectMessages = (state: GlobalAppState) => state.message.messages;
export const selectMessageLoading = (state: GlobalAppState) =>
  state.message.isMessageLoading;
