import * as api from "../api";
import { FETCH_ALL_REPORTS } from "../constants/actionTypes";

export const getReports = () => async (dispatch) => {
  try {
    const { data } = await api.fetchReports();
    // payload is where we store all our posts
    // thunk allows us to specify additional arrow function
    dispatch({ type: FETCH_ALL_REPORTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
