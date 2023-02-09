import React from "react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  selectIsPostCreating,
  selectPostLoading,
} from "../store/selectors/postSelectors";
import { selectPosts } from "../store/selectors/postSelectors";
import Loader from "../UI/Loader/Loader";

const News = () => {
  const posts = useTypedSelector(selectPosts);
  const isLoading = useTypedSelector(selectPostLoading);
  const isAdding = useTypedSelector(selectIsPostCreating);
  const { getAllPosts } = useActions();
  React.useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl ">
      <div className="mx-auto max-w-[600px] ">
        <AddPost fileLabel="1" />
      </div>
      <div className="flex flex-col items-center mt-3">
        {isAdding && (
          <div className="shadow p-3 bg-[white] rounded-2xl w-full max-w-[600px] my-2 min-h-[400px] flex items-center justify-center ">
            <Loader />
          </div>
        )}
        {isLoading ? (
          <div className="mt-10">
            <Loader />
          </div>
        ) : posts && posts.length > 0 ? (
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
                updatedAt={post.updatedAt}
                likes={post.likes}
              />
            ))
        ) : (
          <h1 className="text-[25px]  text-center font-bold min-h-[50vh] mt-20">
            Новостей пока нет, создайте новые
          </h1>
        )}
      </div>
    </div>
  );
};

export default News;
