import * as UserActionsCreator from "./user";
import * as PostActionsCreator from "./post";
import * as ConversationActionsCreator from "./conversation";
import * as MessageActionsCreator from "./message";
export default {
  ...UserActionsCreator,
  ...PostActionsCreator,
  ...ConversationActionsCreator,
  ...MessageActionsCreator,
};
