import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import Button from "../UI/Button/Button";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getUsersPosts } from "../services/post";
import { getUser } from "../services/user";
import { selectUser } from "../store/selectors/userSelectors";
import { IPost } from "../types/post";
import { IUser } from "../types/user";
import { useActions } from "../hooks/useActions";
import { selectConversations } from "../store/selectors/conversationSelectors";
import TextField from "../UI/TextField/TextField";
import { uploadImage } from "../services/upload";
import Loader from "../UI/Loader/Loader";

const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<IPost[]>();
  const [userProfile, setUserProfile] = useState<IUser>();
  const [input, setInput] = useState("");
  const { makeConversations, updateProfile, deleteProfile } = useActions();
  const navigate = useNavigate();
  const file = React.useRef<File | null>(null);
  const user = useTypedSelector(selectUser);
  const conversations = useTypedSelector(selectConversations);

  React.useEffect(() => {
    if (id) {
      getUsersPosts(id).then((data) => setPosts(data));
      getUser(id).then((data) => setUserProfile(data));
    }
  }, [id, user]);
  const makeDialog = () => {
    if (user?._id && id) {
      const check = [user._id, id];
      const find = conversations.find(
        (c) => JSON.stringify(c.members) === JSON.stringify(check)
      );
      if (!find) {
        makeConversations(user._id, id);
        navigate(`../../chats/`);
        return;
      } else {
        navigate(`../../chats/${find._id}`);
        return;
      }
    }
  };
  const uploadImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      file.current = e.target.files[0];
    }
  };
  const updateProfileHandler = () => {
    const newData: { fullName?: string; avatar?: string } = {};
    if (input) {
      newData.fullName = input;
    }
    if (file.current) {
      newData.avatar = file.current.name;
      const formData = new FormData();
      formData.append("file", file.current);
      formData.append("name", file.current.name);
      uploadImage(formData);
    }
    if (newData && id) {
      updateProfile(newData, id);
    }
  };
  const deleteUser = () => {
    if (id) {
      deleteProfile(id);
    }
  };
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl">
      {userProfile && posts ? (
        <div className="flex justify-center">
          <div className="mr-14 flex flex-col items-center">
            <img
              className="w-[150px] h-[150px] rounded-full"
              src={
                userProfile.avatar
                  ? `${process.env.REACT_APP_API_URL_IMG}/${userProfile?.avatar}`
                  : ""
              }
              alt=""
            />
            <h1 className="text-[25px] font-bold">{userProfile?.fullName}</h1>
            {userProfile?.phone}
            {user?._id !== userProfile?._id ? (
              <Button
                style={{ width: "100%", marginTop: "15px" }}
                text="Написать сообщение"
                onClick={makeDialog}
              />
            ) : (
              <div className="mt-3">
                <div className="flex flex-col">
                  <label htmlFor="file">
                    <div className="bg-[black] text-[white] p-2 cursor-pointer mb-3 text-center rounded-2xl">
                      Поменять аватар
                    </div>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={uploadImgHandler}
                    />
                  </label>
                  <TextField
                    fieldType="text"
                    value={input}
                    setValue={setInput}
                    placeholder="Введине новое имя"
                  />
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      marginTop: "15px",
                      width: "90px",
                      marginLeft: "auto",
                    }}
                    text="Изменить"
                    onClick={updateProfileHandler}
                  />
                  <div className="h-[1px] bg-black mt-6 "></div>
                  <Button
                    onClick={deleteUser}
                    text="Удалить аккаунт"
                    style={{
                      backgroundColor: "red",
                      marginTop: "15px",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-[70%]">
            {posts?.map((post) => (
              <Post
                createdAt={post.createdAt}
                user={post.user}
                desc={post.desc}
                key={post._id}
                _id={post._id}
                img={post.img}
                updatedAt={post.updatedAt}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="my-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Profile;
