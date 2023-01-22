import "./App.css";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts, getPostsBySearch } from "./actions/posts";
import { getReports } from "./actions/reports";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [adminSignIn, setAdminSignIn] = useState(false);

  const dispatch = useDispatch();

  // as soon as currentId is updated (submit/clear form), the app is going to dispatch getPosts action
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
    } else {
      window.location.reload();
    }
    setSearch("");
  };

  return (
    <div className="bg-light-mode dark:bg-dark-mode min-h-screen">
      <Navbar
        search={search}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
        setShowLogin={setShowLogin}
        adminSignIn={adminSignIn}
        setAdminSignIn={setAdminSignIn}
      />

      {showLogin && (
        <SignIn
          setShowLogin={setShowLogin}
          setAdminSignIn={setAdminSignIn}
        ></SignIn>
      )}
      <div className="container mx-auto pt-8">
        <div className="flex justify-center">
          <Form adminSignIn={adminSignIn} />
        </div>
        <div className="mx-auto px-2 sm:px-5">
          <Posts adminSignIn={adminSignIn} />
        </div>
      </div>
    </div>
  );
}

export default App;
