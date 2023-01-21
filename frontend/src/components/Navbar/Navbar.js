import { Disclosure } from "@headlessui/react";
import SearchBar from "./SearchBar";

export default function Navbar({ search, setSearch, handleSearchSubmit }) {

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="sm:flex-1 ml-3 sm:ml-0 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    {" "}
                    <img
                      className="block lg:hidden h-10 w-auto"
                      src=""
                      alt="TeamShare"
                    />
                  </a>
                  <a href="/">
                    <img
                      className="hidden lg:block h-10 w-auto"
                      src=""
                      alt="TeamShare"
                    />
                  </a>
                </div>
              </div>
              <SearchBar
                  search={search}
                  setSearch={setSearch}
                  handleSearchSubmit={handleSearchSubmit}
                />
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
