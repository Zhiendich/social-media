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
  updatedAt: string | undefined;
}
const Post = ({ _id, user, desc, img, createdAt, updatedAt }: IPost) => {
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
          src={`${process.env.REACT_APP_API_URL_IMG}/${user?.avatar}`}
          alt=""
        />
        <div className="flex flex-col ml-1">
          <span className=" text-[17px]">{user?.fullName}</span>
          <span className=" text-[14px] text-[gray]">{time}</span>
        </div>
        {user?._id === currentUser?._id ? (
          <div className=" ml-auto flex">
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
        <div className="">
          <h1 className="break-all">{desc}</h1>
          {createdAt !== updatedAt ? (
            <span className="text-right block">(Отредактирован)</span>
          ) : null}
        </div>
      )}
      <img
        className="w-full max-h-[300px] mt-4"
        src={`${process.env.REACT_APP_API_URL_IMG}/${img}`}
        alt=""
      />
      <img
        // src="data:image/png;base64,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"
        alt=""
      />
    </div>
  );
};

export default Post;
