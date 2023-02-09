import { useEffect } from "react";
import ChatUserInfo from "../components/ChatUserInfo";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import {
  selectConversationLoading,
  selectConversations,
} from "../store/selectors/conversationSelectors";
import { useActions } from "../hooks/useActions";
import { Outlet } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

const Conversations = () => {
  const user = useTypedSelector(selectUser);
  const conversations = useTypedSelector(selectConversations);
  const isLoading = useTypedSelector(selectConversationLoading);
  const { getConversations } = useActions();
  useEffect(() => {
    if (user?._id) {
      getConversations(user._id);
    }
  }, [user?._id]);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl flex items-start">
      <div className="basis-1/5 bg-white border-[2px] border-[black] rounded-2xl px-4 flex flex-col   py-8">
        {isLoading ? (
          <Loader />
        ) : conversations && conversations.length > 0 ? (
          conversations.map((c) => (
            <ChatUserInfo chatId={c._id} members={c.members} key={c._id} />
          ))
        ) : (
          <h1 className="text-[22px]  font-bold text-center">
            У вас пока нет диалогов
          </h1>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Conversations;
