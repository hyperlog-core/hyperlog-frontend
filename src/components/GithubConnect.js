import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Portal from "../Portal";
import github from "../github-logo.svg";
import exclamation from "../exclamation.svg";
import Transition from "../helpers/Transition";
import { refreshUser } from "../utils/auth";

const connect_github = (scope) => {
  window.open(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/connect_github?token=${localStorage.getItem(
      "token"
    )}&repos_scope=${scope}`
  );
};

const GET_USER_POLL = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      email
      profiles {
        id
      }
    }
  }
`;

const ScopeSelection = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={
        isOpen
          ? "fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
          : ""
      }
    >
      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </Transition>
      <Transition
        show={isOpen}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Repo access level
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">
                  Due to GitHub's API limitations, we ask for both read and
                  write access to the repositories, but{" "}
                  <b>we never use the write access without explicit consent</b>{" "}
                  from you. So what level of access do you want us to have to
                  your repositories?
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
            <span className="flex w-full rounded-md shadow-sm sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={() => {
                  connect_github("full");
                  setIsOpen(false);
                }}
              >
                Private + Public Repos
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={() => {
                  connect_github("public");
                  setIsOpen(false);
                }}
              >
                Only Public Repos
              </button>
            </span>
          </div>
        </div>
      </Transition>
    </div>
  );
};

const GithubConnect = () => {
  const { loading, data } = useQuery(GET_USER_POLL, {
    pollInterval: 1000,
  });

  if (
    !loading &&
    JSON.parse(localStorage.getItem("user")).profiles.length !==
      data.thisUser.profiles.length
  ) {
    refreshUser(data.thisUser);
  }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="inline-flex text-lg leading-6 font-medium text-gray-900">
            <img src={exclamation} alt="Warning" />
            &nbsp;Connect with GitHub
          </h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm leading-5 text-gray-500">
              <p>
                It is crucial to connect your GitHub account in order to compile
                your profile. We ask permission for reading all your
                repositories, private and public, and reading the organizations
                you are part of.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  <img src={github} alt="GitHub logo" />
                  &nbsp;Connect with GitHub
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Portal>
        <ScopeSelection isOpen={isOpen} setIsOpen={setIsOpen} />
      </Portal>
    </>
  );
};

export default GithubConnect;
