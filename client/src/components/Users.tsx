import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectAllUsers, selectUser } from "../store/selectors/userSelectors";
import User from "./User";

const Users = () => {
  const user = useTypedSelector(selectUser);
  const { getAllUsers } = useActions();
  const users = useTypedSelector(selectAllUsers);
  React.useEffect(() => {
    if (user?._id) {
      getAllUsers(user._id);
    }
  }, []);
  return (
    <div>
      {users?.map((user) => (
        <User
          key={user._id}
          fullName={user.fullName}
          _id={user._id}
          avatar={`http://localhost:5000/images/${user.avatar}`}
        />
      ))}
    </div>
  );
};

export default Users;
