import ChatUserInfo from "../components/ChatUserInfo";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  selectConversationLoading,
  selectConversations,
} from "../store/selectors/conversationSelectors";
import { Outlet } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

const Conversations = () => {
  const conversations = useTypedSelector(selectConversations);
  const isLoading = useTypedSelector(selectConversationLoading);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl flex">
      <div className="basis-1/5 bg-white border-[2px] border-[black] rounded-2xl px-4 flex flex-col  py-8">
        {isLoading ? (
          <Loader />
        ) : (
          conversations.map((c) => (
            <ChatUserInfo chatId={c._id} members={c.members} key={c._id} />
          ))
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Conversations;
