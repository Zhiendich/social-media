import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectConversations } from "../store/selectors/conversationSelectors";
import { selectUser } from "../store/selectors/userSelectors";
import Button from "../UI/Button/Button";

interface IUser {
  _id?: string;
  fullName: string;
  avatar?: string;
}

const User = ({ fullName, _id, avatar }: IUser) => {
  const user = useTypedSelector(selectUser);
  const navigate = useNavigate();
  const conversations = useTypedSelector(selectConversations);
  const { addFriend, removeFriend, makeConversations } = useActions();
  const addFriendHandler = () => {
    if (user?._id && _id) {
      addFriend(user?._id, _id);
    }
  };
  const removeFriendHandler = () => {
    if (user?._id && _id) {
      removeFriend(user?._id, _id);
    }
  };

  const makeDialog = async () => {
    if (user?._id && _id && conversations.length > 0) {
      const check = [user._id, _id];
      const find = conversations.find(
        (c) => JSON.stringify(c.members) === JSON.stringify(check)
      );
      if (!find) {
        const conversationId = await makeConversations(user._id, _id);
        navigate(`../../chats/${conversationId}`);
        return;
      } else {
        navigate(`../../chats/${find._id}`);
        return;
      }
    }
  };
  return (
    <div className="user-hover p-4 bg-[white] rounded-2xl my-4 flex  justify-between h-[90px] items-center">
      <Link
        className="flex items-center mb-2"
        to={`../../profile/${_id}` || ""}
      >
        <img
          className="rounded-full w-[40px] h-[40px] border-[black] border-[1.5px]"
          src={avatar}
          alt=""
        />
        <h1 className="ml-2 text-[19px]">{fullName}</h1>
      </Link>
      <div className="flex">
        {user?.followings?.includes(_id!) ? (
          <div className="w-[180px]">
            <Button
              className="black-button h-[50px]"
              text="Удалить друга"
              onClick={removeFriendHandler}
            />
          </div>
        ) : (
          <div className="w-[180px]">
            <Button
              className="black-button h-[50px]"
              text="Добавить в друзья"
              onClick={addFriendHandler}
            />
          </div>
        )}
        <div className="w-[180px] ml-2">
          <Button
            className="black-button h-[50px]"
            text="Написать сообщение"
            onClick={makeDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
