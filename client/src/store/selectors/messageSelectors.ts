import { GlobalAppState } from "../reducers";

export const selectMessages = (state: GlobalAppState) => state.message.messages;
