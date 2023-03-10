import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  selectAllUsers,
  selectIsUsersLoading,
  selectUser,
} from "../store/selectors/userSelectors";
import Loader from "../UI/Loader/Loader";
import User from "./User";

const Users = () => {
  const user = useTypedSelector(selectUser);
  const { getAllUsers } = useActions();
  const users = useTypedSelector(selectAllUsers);
  const isLoading = useTypedSelector(selectIsUsersLoading);
  React.useEffect(() => {
    if (user?._id) {
      getAllUsers(user._id);
    }
  }, [user?._id]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : users && users.length > 0 ? (
        users?.map((user) => (
          <User
            key={user._id}
            fullName={user.fullName}
            _id={user._id}
            avatar={
              user.avatar
                ? `${process.env.REACT_APP_API_URL_IMG}/${user.avatar}`
                : ""
            }
          />
        ))
      ) : (
        <h1 className="text-[25px] text-center font-bold ">
          Пользователей пока что нет
        </h1>
      )}
    </div>
  );
};

export default Users;
