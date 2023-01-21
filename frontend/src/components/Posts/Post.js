import React from "react";
import { RiThumbUpFill, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions/posts";
import moment from "moment";

const Post = ({ post, adminSignIn }) => {
  const dispatch = useDispatch();

  return (
    <div className="card w-full glass">
      {post.selectedFile ? (
        <figure>
          <img src={post.selectedFile} alt={post._id} />
        </figure>
      ) : (
        <></>
      )}
      <div className="card-body p-2 sm:p-3">
        <p className="text-lg lg:text-xl card-title text-gray-700 dark:text-gray-100">
          {post.title}
        </p>
        <div className="flex flex-row justify-between text-sm lg:text-base text-gray-500 font-medium dark:text-gray-400">
          <div>{post.name}</div>
          <div>{moment(post.createdAt).fromNow()}</div>
        </div>
        <p className="text-gray-700 dark:text-gray-100 hidden md:block text-sm lg:text-base">
          {post.message}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <div className="card-actions justify-end">
            {post.tags.map((tag) => (
              <div key={tag} className="badge badge-outline text-xs lg:text-sm">
                {tag}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className="card-actions flex flex-row justify-between mt-2">
          {!adminSignIn ? (
            <div className="">
              <button
                className="btn btn-primary no-animation px-2 md:px-3"
                onClick={() => dispatch(likePost(post._id))}
              >
                <RiThumbUpFill className="text-base md:text-lg" />
                &nbsp;&nbsp;
                <div className="text-sm md:text-base">{post.likes}</div>
              </button>
            </div>
          ) : (
            <></>
          )}

          {adminSignIn ? (
            <div>
              <button
                className="btn btn-error px-2 sm:px-3 no-animation"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <RiDeleteBin6Line className="text-base md:text-lg" />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
