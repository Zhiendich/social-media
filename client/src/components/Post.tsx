import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";
import { IUser } from "../types/user";

interface IPost {
  _id?: string;
  desc?: string;
  img?: string;
  createdAt: string;
  user?: IUser;
  updatedAt: string | undefined;
  likes: string[];
}
const Post = ({ _id, user, desc, img, createdAt, updatedAt, likes }: IPost) => {
  const time = new Date(createdAt).toLocaleString();
  const [changeText, setChangeText] = React.useState(desc);
  const [flag, setFlag] = React.useState(false);
  const { deletePost, updatePost, likePost } = useActions();
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
      updatePost(changeText!, _id, currentUser._id);
      setFlag(false);
    }
  };
  const likePostHandler = () => {
    if (_id && currentUser?._id) {
      likePost(_id, currentUser._id);
    }
  };
  return (
    <div className="shadow p-3 bg-[white] rounded-2xl w-full max-w-[600px] my-2 min-h-[400px] ] ">
      <div className="flex  items-center mb-4">
        <img
          className="w-[40px] h-[40px] rounded-full border-[1.5px] border-[black]"
          src={
            user?.avatar
              ? `${process.env.REACT_APP_API_URL_IMG}/${user?.avatar}`
              : ""
          }
          alt=""
        />
        <div className="flex flex-col ml-1">
          <span className=" text-[17px]">{user?.fullName}</span>
          <span className=" text-[14px] text-[gray]">{time}</span>
        </div>
        {user?._id === currentUser?._id ? (
          <div className=" ml-auto flex items-center">
            <div className="flex items-center ">
              <span className="text-[17px] font-bold">{likes.length}</span>
              <img
                className="w-[20px] h-[20px] cursor-pointer ml-1"
                src={`${process.env.REACT_APP_API_URL_IMG}/like.png`}
                alt=""
                onClick={likePostHandler}
              />
            </div>

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
        ) : (
          <div className="ml-auto flex items-center">
            <span className="text-[17px] font-bold">{likes.length}</span>
            <img
              className="w-[20px] h-[20px] cursor-pointer ml-1"
              src={`${process.env.REACT_APP_API_URL_IMG}/like.png`}
              alt=""
              onClick={likePostHandler}
            />
          </div>
        )}
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
        <div className="">
          <h1 className="break-all">{desc}</h1>
        </div>
      )}
      <img
        className="w-full max-h-[300px] mt-4"
        src={img ? `${process.env.REACT_APP_API_URL_IMG}/${img}` : ""}
        alt=""
      />
    </div>
  );
};

export default Post;
