import React from "react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectPostLoading } from "../store/selectors/postSelectors";
import { selectPosts } from "../store/selectors/postSelectors";
import Loader from "../UI/Loader/Loader";

const News = () => {
  const posts = useTypedSelector(selectPosts);
  const isLoading = useTypedSelector(selectPostLoading);
  const { getAllPosts } = useActions();
  React.useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl ">
      <div className="mx-auto max-w-[600px] ">
        <AddPost />
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
                updatedAt={post.updatedAt}
                likes={post.likes}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default News;
