import React, { useState } from "react";
import logo from "../logo-white.svg";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Transition from "../helpers/Transition";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import MoonLoader from "react-spinners/MoonLoader";
import md5 from "md5";

const UserLayout = (props) => {
  const history = useHistory();
  const dashboardMatch = useRouteMatch({
    path: "/dashboard",
    exact: true,
  });

  const projectsMatch = useRouteMatch({
    path: "/projects",
    exact: true,
  });

  const domainsMatch = useRouteMatch({
    path: "/domains",
    exact: true,
  });

  const GET_CURRENT_USER_QUERY = gql`
    query {
      thisUser {
        email
        firstName
        lastName
      }
    }
  `;

  const { loading, data } = useQuery(GET_CURRENT_USER_QUERY, {
    onError: (_err) => history.push("/error"),
  });

  let [isMobileMenuOpen, toggleMobileMenu] = useState(false);
  let [isProfileDropdownOpen, toggleProfileDropdown] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <MoonLoader size="60" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-800 pb-32">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10" src={logo} alt="Hyperlog logo" />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline">
                      <Link
                        to="/dashboard"
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          dashboardMatch
                            ? `text-white bg-gray-900`
                            : `text-gray-300 hover:text-white hover:bg-gray-700`
                        } focus:outline-none focus:text-white focus:bg-gray-700`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/projects"
                        className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                          projectsMatch
                            ? `text-white bg-gray-900`
                            : `text-gray-300 hover:text-white hover:bg-gray-700`
                        } focus:outline-none focus:text-white focus:bg-gray-700`}
                      >
                        Projects
                      </Link>
                      <Link
                        to="/domains"
                        className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                          domainsMatch
                            ? `text-white bg-gray-900`
                            : `text-gray-300 hover:text-white hover:bg-gray-700`
                        } focus:outline-none focus:text-white focus:bg-gray-700`}
                      >
                        Domains
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                      aria-label="Notifications"
                    >
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>

                    <div className="ml-3 relative">
                      <div>
                        <button
                          onClick={() =>
                            toggleProfileDropdown(!isProfileDropdownOpen)
                          }
                          className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                          id="user-menu"
                          aria-label="User menu"
                          aria-haspopup="true"
                        >
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`https://www.gravatar.com/avatar/${md5(
                              data.thisUser.email
                            )}?s=256&d=identicon`}
                            alt=""
                          />
                        </button>
                      </div>
                      <Transition
                        show={isProfileDropdownOpen}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                          <div className="py-1 rounded-md bg-white shadow-xs">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Your Profile
                            </Link>
                            <Link
                              to="/settings"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Settings
                            </Link>
                            <Link
                              to="/logout"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign out
                            </Link>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                  >
                    <svg
                      className="block h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <svg
                      className="hidden h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? `block` : `hidden`
            } border-b border-gray-700 md:hidden`}
          >
            <div className="px-2 py-3 sm:px-3">
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Projects
              </Link>
              <Link
                to="/domains"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Domains
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://www.gravatar.com/avatar/${md5(
                      data.thisUser.email
                    )}?s=256&d=identicon`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{`${data.thisUser.firstName} ${data.thisUser.lastName}`}</div>
                  <div className="mt-1 text-sm font-medium leading-none text-gray-400">{`${data.thisUser.email}`}</div>
                </div>
              </div>
              <div
                className="mt-3 px-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl leading-9 font-bold text-white">
              {props.header}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
