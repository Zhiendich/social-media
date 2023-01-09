import { useEffect } from "react";
import ChatUserInfo from "../components/ChatUserInfo";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import { selectConversations } from "../store/selectors/conversationSelectors";
import { useActions } from "../hooks/useActions";
import { Outlet } from "react-router-dom";

const Conversations = () => {
  const user = useTypedSelector(selectUser);
  const conversations = useTypedSelector(selectConversations);
  const { getConversations, getMessages } = useActions();
  useEffect(() => {
    if (user?._id) {
      getConversations(user._id);
    }
  }, []);
  useEffect(() => {
    if (conversations.length) {
      getMessages(conversations[0]._id);
    }
  }, []);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl flex">
      <div className="basis-1/5 bg-white border-[2px] border-[black] rounded-2xl px-4 flex flex-col  py-8">
        {conversations.map((c) => (
          <ChatUserInfo chatId={c._id} members={c.members} key={c._id} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Conversations;
