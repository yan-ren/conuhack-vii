import {
  FETCH_ALL_POSTS,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

const posts = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return action.payload;
    case FETCH_BY_SEARCH:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    // put both reducer together, then they'll do the same thing
    case UPDATE:
      // if the post is changed/liked, return the newer version, o/w return the original post
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      // return all posts except for the one is deleted
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

export default posts;
