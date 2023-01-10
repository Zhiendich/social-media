import { GlobalAppState } from "../reducers";

export const selectPosts = (state: GlobalAppState) => state.post.posts;
export const selectPostLoading = (state: GlobalAppState) =>
  state.post.isPostLoading;
