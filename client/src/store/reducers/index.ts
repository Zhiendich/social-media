import { combineReducers } from "redux";
import { IConversationState } from "../../types/conversation";
import { IMessageState } from "../../types/message";
import { IPostState } from "../../types/post";
import { IUserState } from "../../types/user";
import { conversationReducer } from "./conversationReducer";
import { messageReducer } from "./messageReducer";
import { postReducer } from "./postReducer";
import { userReducer } from "./userReducer";
export interface GlobalAppState {
  user: IUserState;
  post: IPostState;
  conversation: IConversationState;
  message: IMessageState;
}
export const rootReducer = combineReducers<GlobalAppState>({
  user: userReducer,
  post: postReducer,
  conversation: conversationReducer,
  message: messageReducer,
});
