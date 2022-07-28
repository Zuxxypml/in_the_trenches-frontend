import { authActionType } from "../constants/authActionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case authActionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      const { data } = action?.data;
      console.log(data);
      return { ...state, authData: action?.data };
    case authActionType.LOGOUT:
      localStorage.setItem("profile", JSON.stringify(null));
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
