import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GithubConnect from "../components/GithubConnect";
import SetUserInfoStep from "../components/SetUserInfoStep";
import logo from "../logo.svg";
import { refreshUser } from "../utils/auth";

const GET_USER_POLL = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      username
      email
      newUser
      showAvatar
      themeCode
      socialLinks
      tagline
      profiles {
        id
      }
      stackOverflow {
        id
      }
    }
  }
`;

const SetupUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentStep, setCurrentStep] = useState("");
  const { loading, data, startPolling, stopPolling } = useQuery(GET_USER_POLL);

  useEffect(() => {
    if (user.profiles.length === 0) {
      setCurrentStep("connections");
    } else if (user.socialLinks === "{}") {
      setCurrentStep("information");
    }
    startPolling(1000);
    if (!loading && data.thisUser !== user) {
      refreshUser(data.thisUser);
    }
    return () => {
      stopPolling();
    };
  }, [setCurrentStep, user, startPolling, stopPolling]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex">
          <img src={logo} className="w-16 h-16 m-auto" alt="Logo" />
        </div>
        <div className="mt-10">
          <nav>
            <ul className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
              <li className="relative md:flex-1 md:flex">
                <button href="#" className="group flex items-center w-full">
                  <div className="px-6 py-4 flex items-center text-sm leading-5 font-medium space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800 transition ease-in-out duration-150">
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm leading-5 font-medium text-gray-900">
                      User Registration
                    </p>
                  </div>
                </button>

                <div className="hidden md:block absolute top-0 right-0 h-full w-5">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </li>

              <li className="relative md:flex-1 md:flex">
                <button href="#" className="group flex items-center">
                  <div className="px-6 py-4 flex items-center text-sm leading-5 font-medium space-x-4">
                    <div
                      className={
                        currentStep === "connections"
                          ? "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full"
                          : "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800 transition ease-in-out duration-150"
                      }
                    >
                      {currentStep === "information" ? (
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <p className="text-teal-600">02</p>
                      )}
                    </div>
                    <p
                      className={
                        currentStep === "connections"
                          ? "text-sm leading-5 font-medium text-teal-600"
                          : "text-sm leading-5 font-medium text-gray-900"
                      }
                    >
                      Connections
                    </p>
                  </div>

                  <div className="hidden md:block absolute top-0 right-0 h-full w-5">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </li>

              <li className="relative md:flex-1 md:flex">
                <button href="#" className="group flex items-center">
                  <div className="px-6 py-4 flex items-center text-sm leading-5 font-medium space-x-4">
                    <div
                      className={
                        currentStep === "information"
                          ? "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full"
                          : "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400 transition ease-in-out duration-150"
                      }
                    >
                      <p
                        className={
                          currentStep === "information"
                            ? "text-teal-600"
                            : "text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                        }
                      >
                        03
                      </p>
                    </div>
                    <p
                      className={
                        currentStep === "information"
                          ? "text-sm leading-5 font-medium text-teal-600"
                          : "text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                      }
                    >
                      Your Information
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
          <div className="mt-5">
            {currentStep === "connections" && <GithubConnect />}
            {currentStep === "information" && <SetUserInfoStep />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupUser;
