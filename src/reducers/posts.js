import { postActionType } from "../constants/postActionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case postActionType.UPDATE_POST:
    case postActionType.LIKE_POST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case postActionType.FETCH_ALL_POSTS:
      return action.payload;
    case postActionType.CREATE_NEW_POST:
      return [...posts, action.payload];
    case postActionType.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
