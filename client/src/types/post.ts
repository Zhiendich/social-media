import { IUser } from "./user";

export interface IPost {
  _id?: string;
  user?: IUser;
  userId?: string;
  desc: string;
  img?: string;
  createdAt: string;
}

export interface IPostState {
  posts: IPost[];
  isPostLoading: boolean;
  isPostError: null | string;
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
}

interface PostAddAction {
  type: PostActionTypes.POST_ADD;
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
}

interface PostUpdateSuccessAction {
  type: PostActionTypes.POST_UPDATE_SUCCESS;
  payload: IPost;
}

interface PostUpdateErrorAction {
  type: PostActionTypes.POST_UPDATE_ERROR;
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
  | PostUpdateErrorAction;
