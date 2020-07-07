import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isGithubConnected, currentUser } from "../store/atoms";

const DashboardPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  const githubConnection = useRecoilValue(isGithubConnected);
  const user = useRecoilValueLoadable(currentUser);

  switch (user.state) {
    case "hasValue":
      if (user.contents.user && !isLoaded) {
        fetch(
          `https://1gyhym8025.execute-api.ap-south-1.amazonaws.com/prod/profile_info/${user.contents.user.id}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setProfileInfo(JSON.parse(result.body));
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
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
    console.log(profileInfo);
    return (
      <UserLayout header={`Dashboard`}>
        {!githubConnection && <GithubConnect />}
        {githubConnection && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Do your first analysis
              </h3>
              <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                <p>
                  It seems like this is your first time here. Let's get started
                  with the first ever analysis of your profile.
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-200 focus:shadow-outline-teal active:bg-teal-300 active:text-gray-100 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </UserLayout>
    );
  }
};

export default DashboardPage;
