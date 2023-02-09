import React from "react";
import { NavLink } from "react-router-dom";
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
  const [userInfo, setUserInfo] = React.useState<IUser>();
  React.useEffect(() => {
    const find = members.find((m) => m !== user?._id);
    if (find) {
      const data = getUser(find);
      data.then((info) => setUserInfo(info));
    }
  }, [user?._id, members]);
  return (
    <NavLink
      to={chatId}
      className={(navData) =>
        navData.isActive
          ? "flex items-center py-2  my-2  justify-center text-[white] rounded-2xl bg-[#1267A8]"
          : "flex items-center py-2  my-2  justify-center   rounded-2xl bg-[#E5E5E5]"
      }
    >
      <img
        className="w-[35px] h-[35px] rounded-full border-[black] border-[1px]"
        src={
          userInfo?.avatar
            ? `${process.env.REACT_APP_API_URL_IMG}/${userInfo?.avatar}`
            : ""
        }
        alt=""
      />
      <span className="ml-2 text-[18px] max-w-[135px] break-all text-center">
        {userInfo?.fullName}
      </span>
    </NavLink>
  );
};

export default ChatUserInfo;
