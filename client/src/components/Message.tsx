import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getUser } from "../services/user";
import { selectUser } from "../store/selectors/userSelectors";
import { IUser } from "../types/user";

interface IMessage {
  id: string;
  sender: string;
  text: string;
  createdAt: string;
}
const Message = ({ text, sender, id, createdAt }: IMessage) => {
  const user = useTypedSelector(selectUser);
  const [currentUser, setCurrentUser] = React.useState<IUser | undefined>();
  const time = new Date(createdAt).toLocaleTimeString().slice(0, -2);
  React.useEffect(() => {
    getUser(sender).then((info) => setCurrentUser(info));
  }, [sender]);
  return (
    <div>
      {sender === user?._id ? (
        <div className="justify-end flex items-start  my-4">
          <span className="bg-[#C6F5D2]  font-bold rounded-xl  p-2 text-[14px] mr-2 max-w-[300px]">
            {text}
          </span>
          <div className="flex flex-col items-center">
            <img
              className="w-[35px] h-[35px] rounded-full border-[1.5px] border-[black]"
              src={`${process.env.REACT_APP_API_URL_IMG}/${currentUser?.avatar}`}
              alt=""
            />
            <span className="text-[gray] text-[13px] ">{time}</span>
          </div>
        </div>
      ) : (
        <div>
          <div className=" flex items-start  my-4">
            <div className="flex flex-col items-center">
              <img
                className="w-[35px] h-[35px] rounded-full border-[1.5px] border-[black]"
                src={`${process.env.REACT_APP_API_URL_IMG}/${currentUser?.avatar}`}
                alt=""
              />
              <span className="text-[gray] text-[13px] ">{time}</span>
            </div>
            <span className="bg-[#BEE2F7]  font-bold rounded-xl  p-2 text-[14px] ml-2 max-w-[300px]">
              {text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
