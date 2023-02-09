import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { uploadImage } from "../services/upload";
import { selectUser } from "../store/selectors/userSelectors";
import { IPost } from "../types/post";

interface IAddPostForm {
  fileLabel: string;
}

const AddPost = ({ fileLabel }: IAddPostForm) => {
  const [input, setInput] = React.useState("");
  const file = React.useRef<File | null>(null);
  const user = useTypedSelector(selectUser);
  const { createPost } = useActions();
  const createPostHandler = () => {
    if (user?._id) {
      const newPost: IPost = {
        desc: input,
        userId: user?._id,
        createdAt: String(Date.now()),
        likes: [],
      };
      if (file.current) {
        newPost.img = file.current.name;
        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("name", file.current.name);
        uploadImage(formData);
      }
      if (input || file.current) {
        createPost(newPost);
        setInput("");
        file.current = null;
      }
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
    <div className="w-full flex justify-center flex-col shadow p-3 bg-[white] rounded-2xl max-w-[600px]  ">
      <input
        className="p-2  outline-none  w-full border-b-[2px] h-[80px]"
        type="text"
        placeholder="Что у вас сегодня нового?"
        value={input}
        onChange={inputHandler}
      />
      <label htmlFor={fileLabel}>
        <img
          className="w-[20px] h-[20px] cursor-pointer ml-2  mt-2"
          src="https://www.svgrepo.com/show/12604/paper-clip.svg"
          alt=""
        />
        <input
          className="hidden"
          type="file"
          id={fileLabel}
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
  );
};

export default AddPost;
