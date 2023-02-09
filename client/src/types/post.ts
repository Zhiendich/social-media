import { IUser } from "./user";

export interface IPost {
  _id?: string;
  user?: IUser;
  userId?: string;
  desc: string;
  img?: string;
  createdAt: string;
  updatedAt?: string;
  likes: string[];
}

export interface IPostState {
  posts: IPost[];
  postId?: string | null;
  isPostLoading?: boolean;
  isPostError?: null | string;
  isPostCreating?: boolean;
  isPostUpdating?: boolean;
  isPostDeleting?: boolean;
}

export enum PostActionTypes {
  FETCH_POST = "FETCH_POST",
  FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS",
  FETCH_POST_ERROR = "FETCH_POST_ERROR",
  POST_ADD = "POST_ADD",
  POST_ADD_SUCCESS = "POST_ADD_SUCCESS",
  POST_ADD_ERROR = "POST_ADD_ERROR",
  POST_DELETE = "POST_DELETE",
  POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS",
  POST_DELETE_ERROR = "POST_DELETE_ERROR",
  POST_UPDATE = "POST_UPDATE",
  POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS",
  POST_UPDATE_ERROR = "POST_UPDATE_ERROR",
  POST_LIKE = "POST_LIKE",
  POST_LIKE_SUCCESS = "POST_LIKE_SUCCESS",
  POST_LIKE_ERROR = "POST_LIKE_ERROR",
}

interface PostAddAction {
  type: PostActionTypes.POST_ADD;
  payload?: string;
}

interface PostAddSuccessAction {
  type: PostActionTypes.POST_ADD_SUCCESS;
  payload: IPost;
}

interface PostAddErrorAction {
  type: PostActionTypes.POST_ADD_ERROR;
  payload: string;
}
interface PostDeleteAction {
  type: PostActionTypes.POST_DELETE;
  payload?: string;
}

interface PostDeleteSuccessAction {
  type: PostActionTypes.POST_DELETE_SUCCESS;
  payload: string;
}

interface PostDeleteErrorAction {
  type: PostActionTypes.POST_DELETE_ERROR;
  payload: string;
}

interface PostUpdateAction {
  type: PostActionTypes.POST_UPDATE;
  payload?: string;
}

interface PostUpdateSuccessAction {
  type: PostActionTypes.POST_UPDATE_SUCCESS;
  payload: IPost;
}

interface PostUpdateErrorAction {
  type: PostActionTypes.POST_UPDATE_ERROR;
  payload: string;
}

interface PostLikeAction {
  type: PostActionTypes.POST_LIKE;
}

interface PostLikeSuccessAction {
  type: PostActionTypes.POST_LIKE_SUCCESS;
  payload: IPost;
}

interface PostLikeErrorAction {
  type: PostActionTypes.POST_LIKE_ERROR;
  payload: string;
}

interface FetchPostAction {
  type: PostActionTypes.FETCH_POST;
}

interface FetchPostSuccessAction {
  type: PostActionTypes.FETCH_POST_SUCCESS;
  payload: IPost[];
}

interface FetchPostErrorAction {
  type: PostActionTypes.FETCH_POST_ERROR;
  payload: string;
}

export type postAction =
  | PostAddAction
  | PostAddSuccessAction
  | PostAddErrorAction
  | FetchPostAction
  | FetchPostSuccessAction
  | FetchPostErrorAction
  | PostDeleteAction
  | PostDeleteSuccessAction
  | PostDeleteErrorAction
  | PostUpdateAction
  | PostUpdateSuccessAction
  | PostUpdateErrorAction
  | PostLikeAction
  | PostLikeSuccessAction
  | PostLikeErrorAction;
