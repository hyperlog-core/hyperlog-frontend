import React, { useState } from "react";
import logo from "../logo-white.svg";
import Transition from "../helpers/Transition";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import md5 from "md5";

const NavBar = () => {
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
      }
    }
  `;

  const { loading, data } = useQuery(GET_CURRENT_USER_QUERY, {
    onError: (_err) => history.push("/error"),
  });

  let [isMobileMenuOpen, toggleMobileMenu] = useState(false);
  let [isProfileDropdownOpen, toggleProfileDropdown] = useState(false);

  if (loading) {
    return <></>;
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
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
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
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
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img
                className="block lg:hidden h-8 w-auto"
                src={logo}
                alt="Hyperlog logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src={logo}
                alt="Hyperlog logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium leading-5 ${
                    dashboardMatch
                      ? `text-white bg-gray-900`
                      : `text-gray-300 hover:text-white hover:bg-gray-700`
                  } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 ${
                    projectsMatch
                      ? `text-white bg-gray-900`
                      : `text-gray-300 hover:text-white hover:bg-gray-700`
                  } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
                >
                  Projects
                </Link>
                <Link
                  to="/domains"
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 ${
                    domainsMatch
                      ? `text-white bg-gray-900`
                      : `text-gray-300 hover:text-white hover:bg-gray-700`
                  } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
                >
                  Domains
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
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
                  onClick={() => toggleProfileDropdown(!isProfileDropdownOpen)}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
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
                  <div
                    className="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              dashboardMatch
                ? `text-white bg-gray-900`
                : `text-gray-300 hover:text-white hover:bg-gray-700`
            } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
          >
            Dashboard
          </Link>
          <Link
            to="/projects"
            className={`mt-1 block px-3 py-2 rounded-md text-base font-medium ${
              projectsMatch
                ? `text-white bg-gray-900`
                : `text-gray-300 hover:text-white hover:bg-gray-700`
            } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
          >
            Projects
          </Link>
          <Link
            to="/domains"
            className={`mt-1 block px-3 py-2 rounded-md text-base font-medium ${
              domainsMatch
                ? `text-white bg-gray-900`
                : `text-gray-300 hover:text-white hover:bg-gray-700`
            } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
          >
            Domains
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
