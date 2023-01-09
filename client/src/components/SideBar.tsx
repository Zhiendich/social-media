import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";

const SideBar = () => {
  const user = useTypedSelector(selectUser);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl w-[200px] h-[250px] flex flex-col justify-between  ml-5 text-center">
      <Link className=" text-[20px] font-semibold" to={`profile/${user?._id}`}>
        Профиль
      </Link>
      <Link className=" text-[20px] font-semibold" to={"friends/"}>
        Друзья
      </Link>
      <Link className=" text-[20px] font-semibold" to={"chats/"}>
        Чат
      </Link>
      <Link className=" text-[20px] font-semibold" to={"news"}>
        Новости
      </Link>
    </div>
  );
};

export default SideBar;
