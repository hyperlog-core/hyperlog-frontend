import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserLayout from "../layout/UserLayout";
import { refreshUser } from "../utils/auth";
import { BeatLoader } from "react-spinners";

const GET_USER_POLL = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      username
      email
      newUser
      underConstruction
      profiles {
        id
      }
      stackOverflow {
        id
        reputation
      }
    }
  }
`;

const MUTATION_MAKE_PUBLIC = gql`
  mutation {
    markPortfolioAsConstructed {
      success
    }
  }
`;

const SELECTED_MENU_ITEM =
  "group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150";

const NORMAL_MENU_ITEM =
  "mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, data, startPolling, stopPolling } = useQuery(GET_USER_POLL);

  const [portfolioConstructed, setPortfolioConstructed] = useState(
    !user.underConstruction
  );

  const [showPublicAvailability, setShowPublicAvailability] = useState(
    user.underConstruction
  );

  const [markAsConstructed, { loading: constructionLoading }] = useMutation(
    MUTATION_MAKE_PUBLIC,
    {
      onCompleted: (data) => {
        if (data.markPortfolioAsConstructed.success) {
          setPortfolioConstructed(true);
        }
      },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (!loading && JSON.parse(localStorage.getItem("user")) !== data.thisUser) {
    refreshUser(data.thisUser);
  }

  return (
    <>
      <UserLayout
        header={user.profiles.length === 0 ? `One more step...` : "Dashboard"}
      >
        {showPublicAvailability ? (
          <div
            className={`bg-gradient-to-br ${
              portfolioConstructed && !constructionLoading
                ? "to-teal-300 from-green-500"
                : "to-orange-300 from-yellow-300"
            } overflow-hidden shadow-lg sm:rounded-lg mb-8 transition-all ease-in-out duration-700`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-10 gap-1">
                <span className="text-white col-span-9">
                  {portfolioConstructed ? (
                    <>
                      This portfolio is now publicly available. Head over to{" "}
                      <a href={`https://${user.username}.hyperlog.dev`}>
                        {user.username}.hyperlog.dev
                      </a>{" "}
                      to view it now.
                    </>
                  ) : constructionLoading ? (
                    <BeatLoader color="#ffffff" size="10px" />
                  ) : (
                    "Make your website public to the world now! Just toggle this switch"
                  )}
                </span>
                <span
                  role="checkbox"
                  tabindex="0"
                  aria-checked="false"
                  onClick={() => {
                    if (!portfolioConstructed) {
                      setPortfolioConstructed(true);
                      markAsConstructed();
                      setTimeout(() => {
                        setShowPublicAvailability(false);
                      }, 5000);
                    }
                  }}
                  class="col-span-1 group relative inline-flex items-center justify-center flex-shrink-0 h-5 w-10 cursor-pointer focus:outline-none"
                >
                  {/* <!-- On: "bg-indigo-600", Off: "bg-gray-200" --> */}
                  <span
                    aria-hidden="true"
                    class={`${
                      portfolioConstructed ? "bg-green-100" : "bg-cool-gray-100"
                    } absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200`}
                  ></span>
                  {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
                  <span
                    aria-hidden="true"
                    class={`${
                      portfolioConstructed ? "translate-x-5" : "translate-x-0"
                    } absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform group-focus:shadow-outline-gray group-focus:border-green-300 transition-transform ease-in-out duration-200`}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="md:grid md:grid-cols-4 md:gap-6">
          <div className="md:col-span-1">
            <nav>
              <a
                href="#"
                className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                aria-current="page"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="truncate">Dashboard</span>
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="truncate">Team</span>
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="truncate">Projects</span>
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="truncate">Calendar</span>
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <span className="truncate">Documents</span>
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
              >
                <svg
                  className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="truncate">Reports</span>
              </a>
            </nav>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="bg-gradient-to-br from-white to-cool-gray-100 overflow-hidden shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">Div</div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default DashboardPage;
