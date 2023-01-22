import { React } from "react";
import { Disclosure } from "@headlessui/react";
import SearchBar from "./SearchBar";
import navBarLogo from "./nav-bar-icon.png";

export default function Navbar({
  search,
  setSearch,
  handleSearchSubmit,
  setShowLogin,
  adminSignIn,
  setAdminSignIn,
}) {
  const handleSignIn = () => {
    setShowLogin(true);
  };

  const handleLogOut = () => {
    window.location.reload();
    setAdminSignIn(false);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="sm:flex-1 ml-3 sm:ml-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    <img
                      className="hidden lg:block h-10 w-auto"
                      src={navBarLogo}
                      alt="Sharing"
                    />
                  </a>
                </div>
              </div>
              <SearchBar
                search={search}
                setSearch={setSearch}
                handleSearchSubmit={handleSearchSubmit}
              />
              {!adminSignIn && (
                <div className="flex-shrink-0 flex items-center">
                  <button
                    className="btn btn-primary px-4 py-2 text-sm text-white w-full text-left"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
              )}
              {adminSignIn && (
                <div className="flex-shrink-0 flex items-center">
                  <button
                    className="btn btn-primary px-4 py-2 text-sm text-white w-full text-left"
                    onClick={handleLogOut}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
