import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isGithubConnected, currentUser } from "../store/atoms";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import PulseLoader from "react-spinners/PulseLoader";
import PriorAnalysisComplete from "../components/PriorAnalysisComplete";

const MUTATION_ANALYSE_USER_PROFILE = gql`
  mutation {
    analyseProfile {
      success
      errors
    }
  }
`;

const fetchUserData = (userID) => {
  return fetch(
    `https://api.hyperlog.io/gateway/profile_info/${userID}`
  ).then((res) => res.json());
};

const ProfileInfo = ({ profile, analyse, loading }) => {
  if (profile.status === "running") {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            We're analysing your profile. It might take a while
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>
              We've started the analysis of your profile. This process takes a
              little while, so why don't you go grab a coffee, or do some other
              work till then. We'll notify you on your email once done.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (profile.turn === 0) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Do your first analysis
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>
              It seems like this is your first time here. Let's get started with
              the first ever analysis of your profile.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-200 focus:shadow-outline-teal active:bg-teal-300 active:text-gray-100 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              onClick={analyse}
              disabled={loading}
            >
              {loading ? (
                <PulseLoader size="10" color="#ffffff" />
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (profile.turn > 0) {
    return (
      <PriorAnalysisComplete
        profile={profile}
        analyse={analyse}
        loading={loading}
      />
    );
  } else {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  }
};

const DashboardPage = () => {
  const [error, setError] = useState(null);
  const [mutError, setMutError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  const githubConnection = useRecoilValue(isGithubConnected);
  const user = useRecoilValueLoadable(currentUser);

  const [
    startAnalysis,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(MUTATION_ANALYSE_USER_PROFILE, {
    onCompleted: (data) => {
      if (data.analyseProfile.success) {
        fetchUserData(user.contents.user.id).then(
          (result) => {
            setProfileInfo(result);
          },
          (error) => {
            setError(error);
          }
        );
      } else {
        setMutError(data.analyseProfile.errors[0]);
      }
    },
    onError: (err) => console.log(err),
  });

  switch (user.state) {
    case "hasValue":
      if (user.contents.user && !isLoaded) {
        fetchUserData(user.contents.user.id).then(
          (result) => {
            setProfileInfo(result);
          },
          (error) => {
            setError(error);
          }
        );
        setIsLoaded(true);
      }
      break;
    case "hasError":
    default:
      throw user.contents;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading</div>;
  } else {
    if (!githubConnection) {
      return (
        <UserLayout header={`Dashboard`}>
          <GithubConnect />
        </UserLayout>
      );
    } else {
      return (
        <UserLayout header={`Dashboard`}>
          {(mutationError || mutError) && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm leading-5 text-red-700">{mutError}</p>
                </div>
              </div>
            </div>
          )}
          <ProfileInfo
            profile={profileInfo}
            analyse={startAnalysis}
            loading={mutationLoading}
          />
        </UserLayout>
      );
    }
  }
};

export default DashboardPage;
