import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isGithubConnected, currentUser } from "../store/atoms";
import ProfileInfo from "../components/ProfileInfo";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

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
    `https://1gyhym8025.execute-api.ap-south-1.amazonaws.com/prod/profile_info/${userID}`
  ).then((res) => res.json());
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
            setProfileInfo(JSON.parse(result.body));
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
            setProfileInfo(JSON.parse(result.body));
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
