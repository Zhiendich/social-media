import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import { IUser } from "../types/user";

interface IPost {
  _id?: string;
  desc: string;
  img?: string;
  createdAt: string;
  user?: IUser;
}
const Post = ({ _id, user, desc, img, createdAt }: IPost) => {
  const time = new Date(createdAt).toLocaleString();
  const [changeText, setChangeText] = React.useState(desc);
  const [flag, setFlag] = React.useState(false);
  const { deletePost, updatePost } = useActions();
  const currentUser = useTypedSelector(selectUser);
  const changeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeText(e.target.value);
  };
  const deletePostHandler = () => {
    if (_id && currentUser?._id) {
      deletePost(currentUser._id, _id);
    }
  };
  const showChangeFormHadler = () => {
    setFlag(true);
  };
  const updatePostHandler = () => {
    if (_id && currentUser?._id) {
      updatePost(changeText, _id, currentUser._id);
      setFlag(false);
    }
  };
  return (
    <div className="shadow p-3 bg-[white] rounded-2xl w-full max-w-[600px] my-2 min-h-[400px] ] ">
      <div className="flex  items-center mb-4">
        <img
          className="w-[40px] h-[40px] rounded-full border-[1.5px] border-[black]"
          src={`http://localhost:5000/images/${user?.avatar}`}
          alt=""
        />
        <div className="flex flex-col ml-1">
          <span className=" text-[17px]">{user?.fullName}</span>
          <span className=" text-[14px] text-[gray]">{time}</span>
        </div>
        {user?._id === currentUser?._id ? (
          <div className="ml-auto flex">
            <img
              onClick={showChangeFormHadler}
              className="w-[20px] h-[20px] cursor-pointer "
              src="https://img.icons8.com/sf-black-filled/512/edit.png"
              alt=""
            />
            <img
              onClick={deletePostHandler}
              className="w-[20px] h-[20px] cursor-pointer"
              src="https://img.icons8.com/material-outlined/512/delete-sign.png"
              alt=""
            />
          </div>
        ) : null}
      </div>
      {flag ? (
        <div className="flex">
          <input
            value={changeText}
            onChange={changeTextHandler}
            className="p-2 rounded-2xl outline-none border-black border-[2px] mr-3 w-full"
            type="text"
          />
          <button
            onClick={updatePostHandler}
            className="p-2 rounded-2xl outline-none text-[white] bg-black"
          >
            Изменить
          </button>
        </div>
      ) : (
        <h1 className="break-all">{desc}</h1>
      )}
      <img
        className="w-full max-h-[300px] mt-4"
        src={`http://localhost:5000/images/${img}`}
        alt=""
      />
    </div>
  );
};

export default Post;