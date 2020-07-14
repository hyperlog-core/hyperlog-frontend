import React from "react";
import github from "../github-logo.svg";
import exclamation from "../exclamation.svg";

const connect_github = () => {
  window.open(
    `https://gateway.hyperlog.io/connect_github?token=${localStorage.getItem(
      "token"
    )}`
  );
};

const GithubConnect = () => {
  return (
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
              your profile. We ask permission for reading all your repositories,
              private and public, and reading the organizations you are part of.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={connect_github}
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
  );
};

export default GithubConnect;
