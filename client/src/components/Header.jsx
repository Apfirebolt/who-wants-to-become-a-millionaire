import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom"; // Add router link
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      {open && (
        <div className="lg:hidden">
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <div className="mt-2">
                {user ? (
                  <div className="flex flex-col">
                    <button
                      onClick={logoutHandler}
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      Sign Out
                    </button>
                    <Link
                      to="/quiz"
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Quiz
                    </Link>
                    <Link
                      to="/my-results"
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Results
                    </Link>
                    <Link
                      to="/"
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Home
                    </Link>
                    {user.is_admin && (
                      <Link
                        to="/admin"
                        className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 bg-neutral-100 px-2 py-3 text-center cursor-pointer hover:bg-gray-400 transition-colors duration-200 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              <div className="ml-auto flex items-center">
                {user ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <button
                      onClick={logoutHandler}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign Out
                    </button>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/quiz"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Quiz
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/my-results"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Results
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link
                        to="/"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Home
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>

                    {user.is_admin ? (
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link
                          to="/admin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Admin
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
