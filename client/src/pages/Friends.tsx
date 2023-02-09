import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
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
