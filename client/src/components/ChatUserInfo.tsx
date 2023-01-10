import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import { getUser } from "../services/user";
import { IUser } from "../types/user";

interface ChatUserInfoProps {
  members: string[];
  chatId: string;
}

const ChatUserInfo = ({ chatId, members }: ChatUserInfoProps) => {
  const user = useTypedSelector(selectUser);
  const [userInfo, setUserInfo] = React.useState<IUser | undefined>();
  React.useEffect(() => {
    const find = members.find((m) => m !== user?._id);
    if (find) {
      const data = getUser(find);
      data.then((info) => setUserInfo(info));
    }
  }, [user?._id, members]);
  return (
    <Link to={chatId} className="flex items-center py-2  my-2 ">
      <img
        className="w-[35px] h-[35px] rounded-full border-[black] border-[1.5px]"
        src={`http://localhost:5000/images/${userInfo?.avatar}`}
        alt=""
      />
      <span className="ml-2 text-[18px]">{userInfo?.fullName}</span>
    </Link>
  );
};

export default ChatUserInfo;
