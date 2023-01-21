// eslint-disable-next-line no-unused-vars
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // not sure data will always be there so use '?.'
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // console.log(action?.data);
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
