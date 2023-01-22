import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
// eslint-disable-next-line no-unused-vars
import { Masonry, Masonro } from "./Masonry/Mansonry";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea, Bar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Loading = () => (
  <div>
    <svg
      role="status"
      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>
);

// Set the current id
const Posts = ({ setCurrentId, adminSignIn }) => {
  // const [chartData, setChartData] = useState({});
  const posts = useSelector((state) => state.posts);
  const reports = useSelector((state) => state.reports);

  //
  const chartData = {
    labels: ["bad", "first", "great", "in-person", "role-playing", "welcome"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 4, 1, 11, 2, 8],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Onboarding Rating Summary",
      },
    },
  };

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Rating",
        data: [1, 6, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const { width } = useWindowDimensions();
  let nc = width >= 1024 ? 3 : 2;

  const masonryOptions = useMemo(
    () => ({
      columns: nc,
      margin: 4,
    }),
    [nc]
  );

  const PostsGrid = () => (
    <div className="mb-4 sm:mb-0 gap-3">
      <Masonry options={masonryOptions}>
        {posts.map((post) => (
          <div key={post._id}>
            <Post
              post={post}
              setCurrentId={setCurrentId}
              adminSignIn={adminSignIn}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );

  return (
    <div>
 {/* {adminSignIn ? (
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
          )} */}


      {adminSignIn && <PolarArea data={chartData} />}
      {adminSignIn && <Bar options={options} data={data} />}
      <div className="text-2xl font-bold mb-4">Posts</div>
      {!posts.length ? <Loading /> : <PostsGrid />}
    </div>
  );
};

export default Posts;
