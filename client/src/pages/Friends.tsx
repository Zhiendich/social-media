import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectConversations } from "../store/selectors/conversationSelectors";
import { selectUser } from "../store/selectors/userSelectors";

const Friends = () => {
  const navigate = useNavigate();
  const user = useTypedSelector(selectUser);
  const conversations = useTypedSelector(selectConversations);
  const { getConversations } = useActions();
  React.useEffect(() => {
    if (conversations.length === 0 && user?._id) {
      getConversations(user._id);
    }
    navigate("users");
  }, []);

  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl">
      <div className=" mb-6">
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "text-[20px] font-bold underline"
              : "text-[20px] font-semibold"
          }
          to={"users"}
        >
          Все пользователи
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "text-[20px] font-bold underline ml-3 border-l-[2px] border-[black] pl-3"
              : "text-[20px] font-semibold ml-3 border-l-[2px] border-[black] pl-3"
          }
          to={"myfriends"}
        >
          Мои друзья
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Friends;
