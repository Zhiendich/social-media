import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Friends = () => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  React.useEffect(() => {
    navigate("users");
  }, []);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl">
      {/* <input
        value={search}
        type="text"
        onChange={searchHandler}
        className={"p-2 rounded-2xl outline-none text-[black]"}
      /> */}
      <div className=" mb-6">
        <Link className="text-[20px] font-bold " to={"users"}>
          Все пользователи
        </Link>
        <Link
          className="text-[20px] font-bold ml-3 border-l-[2px] border-[black] pl-3"
          to={"myfriends"}>
          Мои друзья
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Friends;
