import {
  IPost,
  IPostState,
  postAction,
  PostActionTypes,
} from "../../types/post";

const initialState: IPostState = {
  posts: [] as IPost[],
  isPostError: null,
  isPostLoading: false,
};

export const postReducer = (
  state = initialState,
  action: postAction
): IPostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POST:
      return {
        posts: state.posts,
        isPostError: null,
        isPostLoading: true,
      };
    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        posts: action.payload,
        isPostError: null,
        isPostLoading: false,
      };
    case PostActionTypes.FETCH_POST_ERROR:
      return {
        posts: state.posts,
        isPostError: action.payload,
        isPostLoading: false,
      };
    case PostActionTypes.POST_ADD:
      return {
        postId: action.payload,
        isPostCreating: true,
        posts: state.posts,
      };
    case PostActionTypes.POST_ADD_SUCCESS:
      return {
        isPostCreating: false,
        postId: null,
        posts: [action.payload, ...state.posts],
      };
    case PostActionTypes.POST_ADD_ERROR:
      console.log(action.type, action.payload);
      return {
        isPostCreating: false,
        posts: state.posts,
        postId: null,
      };
    case PostActionTypes.POST_DELETE:
      return {
        postId: action.payload,
        isPostDeleting: true,
        posts: state.posts,
      };
    case PostActionTypes.POST_DELETE_SUCCESS:
      return {
        isPostDeleting: false,
        postId: null,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case PostActionTypes.POST_DELETE_ERROR:
      console.log(action.type, action.payload);
      return {
        postId: null,
        isPostDeleting: false,
        posts: state.posts,
      };
    case PostActionTypes.POST_UPDATE:
      return {
        postId: action.payload,
        isPostUpdating: true,
        posts: state.posts,
      };
    case PostActionTypes.POST_UPDATE_SUCCESS:
      return {
        isPostUpdating: false,
        postId: null,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case PostActionTypes.POST_UPDATE_ERROR:
      console.log(action.type, action.payload);
      return {
        postId: null,
        isPostUpdating: false,
        posts: state.posts,
      };
    case PostActionTypes.POST_LIKE:
      return {
        posts: state.posts,
      };
    case PostActionTypes.POST_LIKE_SUCCESS:
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case PostActionTypes.POST_LIKE_ERROR:
      console.log(action.type, action.payload);
      return {
        posts: state.posts,
      };
    default:
      return state;
  }
};
