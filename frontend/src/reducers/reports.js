import { FETCH_ALL_REPORTS } from "../constants/actionTypes";

const reports = (reports = [], action) => {
  switch (action.type) {
    case FETCH_ALL_REPORTS:
      return action.payload;
    default:
      return reports;
  }
};

export default reports;
