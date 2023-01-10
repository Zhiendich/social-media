import React from "react";
import Post from "../components/Post";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { uploadImage } from "../services/upload";
import { selectPostLoading } from "../store/selectors/postSelectors";
import { selectPosts } from "../store/selectors/postSelectors";
import { selectUser } from "../store/selectors/userSelectors";
import { IPost } from "../types/post";
import Loader from "../UI/Loader/Loader";

const News = () => {
  const [input, setInput] = React.useState("");
  const file = React.useRef<File | null>(null);
  const user = useTypedSelector(selectUser);
  const posts = useTypedSelector(selectPosts);
  const isLoading = useTypedSelector(selectPostLoading);
  const { createPost, getAllPosts } = useActions();
  React.useEffect(() => {
    getAllPosts();
  }, []);
  const createPostHandler = () => {
    if (user?._id) {
      const newPost: IPost = {
        desc: input,
        userId: user?._id,
        createdAt: String(Date.now()),
      };
      if (file.current) {
        newPost.img = file.current.name;
        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("name", file.current.name);
        uploadImage(formData);
      }
      createPost(newPost);
      setInput("");
    } else {
      alert("Ошибка");
    }
  };
  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      file.current = e.target.files[0];
    }
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl ">
      <div className="w-full flex justify-center flex-col shadow p-3 bg-[white] rounded-2xl max-w-[600px] mx-auto">
        <input
          className="p-2  outline-none  w-full border-b-[2px] h-[80px]"
          type="text"
          placeholder="Что у вас сегодня нового?"
          value={input}
          onChange={inputHandler}
        />
        <label htmlFor="file">
          <img
            className="w-[20px] h-[20px] cursor-pointer ml-2  mt-2"
            src="https://www.svgrepo.com/show/12604/paper-clip.svg"
            alt=""
          />
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={uploadFileHandler}
          />
        </label>
        <button
          className="p-2 text-[white] bg-black rounded-2xl mt-3"
          onClick={createPostHandler}
        >
          Создать
        </button>
      </div>
      <div className="flex flex-col items-center mt-3">
        {isLoading ? (
          <div className="mt-10">
            <Loader />
          </div>
        ) : (
          posts
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post) => (
              <Post
                desc={post.desc}
                createdAt={post.createdAt}
                user={post.user}
                _id={post._id}
                img={post.img}
                key={post._id}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default News;
