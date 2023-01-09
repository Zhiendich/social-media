import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getUserConversation } from "../services/conversation";
import { getUser } from "../services/user";
import { selectMessages } from "../store/selectors/messageSelectors";
import { selectUser } from "../store/selectors/userSelectors";
import { IConversation } from "../types/conversation";
import { IUser } from "../types/user";
import Message from "./Message";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useTypedSelector(selectUser);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>();
  const { getMessages, sendMessages } = useActions();
  const [conversation, setConversation] = useState<IConversation | undefined>();
  const messages = useTypedSelector(selectMessages);
  const messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const sendMessageHandler = () => {
    if (user?._id && id) {
      sendMessages(id, user?._id, message);
      setMessage("");
    }
  };
  React.useEffect(() => {
    if (id) {
      getMessages(id);
      getUserConversation(id).then((info) => setConversation(info));
    }
  }, [id]);
  React.useEffect(() => {
    const find = conversation?.members.find((m) => m !== user?._id);
    if (find) {
      getUser(find).then((info) => setCurrentUser(info));
    }
  }, [conversation]);
  return (
    <div className="basis-3/4  bg-white border-[2px] border-[black] rounded-2xl ml-8 max-h-[85vh] ">
      <p className="text-[20px] text-center  border-[black] rounded-2xl border-[2px] mt-[-2px] py-1 mx-[-2px] font-bold">
        {currentUser?.fullName}
      </p>
      <div className="h-[68vh] overflow-y-auto px-3 py-2">
        {messages.map((m) => (
          <Message
            id={m._id}
            sender={m.sender}
            text={m.text}
            key={m._id}
            createdAt={m.createdAt}
          />
        ))}
      </div>
      <div className="p-5 border-t-[2px] border-[black] flex  items-center ">
        <input
          className="p-3 rounded-2xl outline-none border-[2px] border-[black] flex-[90%] mr-2"
          type="text"
          placeholder="Начните писать сообщение..."
          value={message}
          onChange={messageHandler}
        />
        <div
          onClick={sendMessageHandler}
          className="w-[45px] h-[45px] rounded-full bg-black relative cursor-pointer"
        >
          <img
            className="w-[20px] h-[20px] absolute top-[12px] left-[15px]"
            src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/344/ffffff/external-send-user-interface-kmg-design-glyph-kmg-design.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
