import React from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import { UserActionTypes } from "../types/user";
import Button from "../UI/Button/Button";
import TextField from "../UI/TextField/TextField";

const Header = () => {
  const user = useTypedSelector(selectUser);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch({ type: UserActionTypes.USER_LOG_OUT });
    window.localStorage.removeItem("token");
  };

  return (
    <header className="bg-[#1267A8] flex justify-between w-full p-4  items-center text-[white] ">
      <h1 className="text-[22px] font-bold">Social Media</h1>

      <div className="flex items-center">
        <span className="text-[18px] mr-2">{user?.fullName}</span>
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={`http://localhost:5000/images/${user?.avatar}`}
          alt=""
        />
        <Button onClick={logout} text={"Выйти"} />
      </div>
    </header>
  );
};

export default Header;
