import { GlobalAppState } from "../reducers";

export const selectPosts = (state: GlobalAppState) => state.post.posts;
export const selectPostId = (state: GlobalAppState) => state.post.postId;

export const selectPostLoading = (state: GlobalAppState) =>
  state.post.isPostLoading;
export const selectIsPostCreating = (state: GlobalAppState) =>
  state.post.isPostCreating;
export const selectIsPostUpdating = (state: GlobalAppState) =>
  state.post.isPostUpdating;
export const selectIsPostDeleting = (state: GlobalAppState) =>
  state.post.isPostDeleting;
