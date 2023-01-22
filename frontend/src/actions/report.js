import * as api from "../api";
import {
  UPDATE
} from "../constants/actionTypes";


export const trackerPython = () => async (dispatch) => {
  try {
    console.log('go to method');
    const { data } = await api.trackerPython();
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
