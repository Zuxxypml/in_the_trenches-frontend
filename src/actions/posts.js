import * as api from "../api/api";
import { postActionType } from "../constants/postActionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: postActionType.FETCH_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: postActionType.CREATE_NEW_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: postActionType.UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: postActionType.DELETE_POST, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: postActionType.LIKE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
