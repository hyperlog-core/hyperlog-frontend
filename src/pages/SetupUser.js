import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import NextStepButton from "../components/Buttons/NextStepButton";
import PreviousStepButton from "../components/Buttons/PreviousStepButton";
import GithubConnect from "../components/GithubConnect";
import ProfileInfo from "../components/ProfileInfo";
import SetUserInfoStep from "../components/SetUserInfoStep";
import SetUsernameModal from "../components/SetUsernameModal";
import logo from "../logo.svg";
import Portal from "../Portal";
import { refreshUser } from "../utils/auth";
import github from "../github-logo.svg";
import stackoverflow from "../stackoverflow.svg";
import StackoverflowConnect from "../components/StackoverflowConnect";
import { useHistory } from "react-router-dom";

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
      setupStep
      socialLinks
      underConstruction
      tagline
      profiles {
        id
        accessToken
      }
      stackOverflow {
        id
      }
    }
  }
`;

const SetupUser = () => {
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [currentStep, setCurrentStep] = useState(user.setupStep);
  const { loading, data, startPolling, stopPolling } = useQuery(GET_USER_POLL);

  useEffect(() => {
    startPolling(1000);
    if (!loading && data.thisUser !== user) {
      refreshUser(data.thisUser);
      setUser(data.thisUser);
    }
    return () => {
      stopPolling();
    };
  }, [user, startPolling, stopPolling, data, loading, setUser]);

  if (currentStep === 0) {
    history.push("/home");
  }

  return (
    <div className="animated-bg-setup p-4 bg-scroll min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex">
            <img src={logo} className="w-16 h-16 m-auto" alt="Logo" />
          </div>
          <div className="mt-10">
            <nav>
              <ul className="border border-gray-300 bg-white rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
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
                          currentStep === 1
                            ? "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full"
                            : "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800 transition ease-in-out duration-150"
                        }
                      >
                        {currentStep > 1 ? (
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
                          currentStep === 1
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
                          currentStep === 2
                            ? "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full"
                            : currentStep > 2
                            ? "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-teal-600 rounded-full group-hover:bg-teal-800 transition ease-in-out duration-150"
                            : "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400 transition ease-in-out duration-150"
                        }
                      >
                        {currentStep > 2 ? (
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
                          <p
                            className={
                              currentStep === 2
                                ? "text-teal-600"
                                : "text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                            }
                          >
                            03
                          </p>
                        )}
                      </div>
                      <p
                        className={
                          currentStep === 2
                            ? "text-sm leading-5 font-medium text-teal-600"
                            : currentStep > 2
                            ? "text-sm leading-5 font-medium text-gray-900"
                            : "text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                        }
                      >
                        Your Information
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
                          currentStep === 3
                            ? "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-teal-600 rounded-full"
                            : "flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400 transition ease-in-out duration-150"
                        }
                      >
                        {currentStep > 3 ? (
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
                          <p
                            className={
                              currentStep === 3
                                ? "text-teal-600"
                                : "text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                            }
                          >
                            04
                          </p>
                        )}
                      </div>
                      <p
                        className={
                          currentStep === 3
                            ? "text-sm leading-5 font-medium text-teal-600"
                            : "text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-900 transition ease-in-out duration-150"
                        }
                      >
                        Project Showcase
                      </p>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="mt-5">
              {currentStep === 1 && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    {user.profiles.length === 0 ? (
                      <GithubConnect />
                    ) : (
                      <div className="bg-white shadow sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                          <h3 className="inline-flex text-lg leading-6 font-medium text-gray-900">
                            <img
                              src={github}
                              alt="GitHub logo"
                              className="h-6 mr-3"
                            />
                            &nbsp;GitHub connected successfully!
                          </h3>
                        </div>
                      </div>
                    )}
                    {user.stackOverflow ? (
                      <div className="bg-white shadow sm:rounded-lg mt-5">
                        <div className="p-4 sm:p-6">
                          <h3 className="inline-flex text-lg leading-6 font-medium text-gray-900">
                            <img
                              src={stackoverflow}
                              alt="GitHub logo"
                              className="h-6 mr-3"
                            />
                            &nbsp;StackOverflow connected successfully!
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <StackoverflowConnect
                        clientId={process.env.REACT_APP_STACKOVERFLOW_CLIENT_ID}
                        redirectUri={
                          process.env.REACT_APP_STACKOVERFLOW_REDIRECT_URI
                        }
                      />
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:px-6 text-right">
                    <NextStepButton
                      setStep={setCurrentStep}
                      disabled={user.profiles.length === 0}
                    />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <SetUserInfoStep setStep={setCurrentStep} user={user} />
              )}
              {currentStep === 3 && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    {user.profiles.length === 0 ? (
                      <GithubConnect />
                    ) : (
                      <ProfileInfo setupMode={true} />
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
                    <PreviousStepButton setStep={setCurrentStep} />
                    <NextStepButton
                      setStep={setCurrentStep}
                      completeSetup={true}
                    />
                  </div>
                </div>
              )}

              {user.newUser && (
                <Portal>
                  <SetUsernameModal
                    isOpen={user.newUser}
                    username={user.username}
                  />
                </Portal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupUser;
