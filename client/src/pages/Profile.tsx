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
import AddPost from "../components/AddPost";
import {
  selectIsPostCreating,
  selectPosts,
} from "../store/selectors/postSelectors";
import WarningForm from "../components/WarningForm";

const Profile = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<IPost[]>();
  const [userProfile, setUserProfile] = useState<IUser>();
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { makeConversations, updateProfile } = useActions();
  const navigate = useNavigate();
  const file = React.useRef<File | null>(null);
  const user = useTypedSelector(selectUser);
  const allPosts = useTypedSelector(selectPosts);
  const conversations = useTypedSelector(selectConversations);
  const isAdding = useTypedSelector(selectIsPostCreating);

  React.useEffect(() => {
    if (id) {
      getUsersPosts(id).then((data) => setPosts(data));
      getUser(id).then((data) => setUserProfile(data));
    }
  }, [id, user, allPosts]);
  const makeDialog = async () => {
    if (user?._id && id && conversations.length > 0) {
      const check = [user._id, id];
      const find = conversations.find(
        (c) => JSON.stringify(c.members) === JSON.stringify(check)
      );
      if (!find) {
        const conversationId = await makeConversations(user._id, id);
        navigate(`../../chats/${conversationId}`);
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
  const showFormHandler = () => {
    setShowForm(true);
  };
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl">
      {userProfile && posts ? (
        <div className="flex justify-center items-start">
          <div className="mr-14 flex flex-col   items-center bg-white p-4 rounded-2xl max-w-[350px] w-full max-h-[550px] border-[1px] border-[black]">
            <img
              className="w-[150px] h-[150px] rounded-full"
              src={
                userProfile.avatar
                  ? `${process.env.REACT_APP_API_URL_IMG}/${userProfile?.avatar}`
                  : ""
              }
              alt=""
            />
            <h1 className="text-[25px] font-bold break-all text-center">
              {userProfile?.fullName}
            </h1>
            {userProfile?.phone}
            {user?._id !== userProfile?._id ? (
              <Button
                className="black-button mt-4 h-[50px]"
                text="Написать сообщение"
                onClick={makeDialog}
              />
            ) : (
              <div className="mt-3">
                <div className="flex flex-col">
                  <div className="h-[1px] bg-black my-2 "></div>
                  <h1 className="text-center font-bold text-[22px] mb-3">
                    Изменить данные :
                  </h1>
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
                    className="border-[2px] border-black mb-3"
                    value={input}
                    setValue={setInput}
                    placeholder="Введине новое имя"
                  />
                  <Button
                    className="black-button w-[100px] ml-auto"
                    text="Изменить"
                    onClick={updateProfileHandler}
                  />
                  <div className="h-[1px] bg-black my-5 "></div>
                  <Button
                    onClick={showFormHandler}
                    text="Удалить аккаунт"
                    className="red-button"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-[60%]">
            {user?._id === userProfile?._id ? <AddPost fileLabel="2" /> : null}
            {isAdding && (
              <div className="shadow p-3 bg-[white] rounded-2xl w-full max-w-[600px] my-2 min-h-[400px] flex items-center justify-center ">
                <Loader />
              </div>
            )}
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
      {showForm && <WarningForm setFlag={setShowForm} />}
    </div>
  );
};

export default Profile;
