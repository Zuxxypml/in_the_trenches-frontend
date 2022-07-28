import * as api from "../api/api";
import { authActionType } from "../constants/authActionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // logs in user
    const { data } = await api.signin(formData);
    console.log(data);

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signs user up
    const { data } = await api.signup(formData);
    console.log(data);
    const { token, user } = data;
    const { displayName, email, _id, password } = user;
    dispatch({
      type: authActionType.AUTH,
      data: { displayName, token, email, _id, password },
    });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
