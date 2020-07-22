import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isGithubConnected, currentUser } from "../store/atoms";
import ProfileInfo from "../components/ProfileInfo";
import PulseLoader from "react-spinners/PulseLoader";
import { useHistory } from "react-router-dom";

const fetchUserData = (userID) => {
  return fetch(`${process.env.REACT_APP_AWS_URL}/user/${userID}`).then((res) =>
    res.json()
  );
};

const DashboardPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [calledOnce, setCalledOnce] = useState(false);

  const history = useHistory();

  const githubConnection = useRecoilValue(isGithubConnected);
  const user = useRecoilValueLoadable(currentUser);

  switch (user.state) {
    case "hasValue":
      if (user.contents.user && !isLoaded && !calledOnce) {
        setCalledOnce(true);
        fetchUserData(user.contents.user.id).then(
          (result) => {
            if (result) {
              setProfileInfo(result);
            } else {
              history.go();
            }
            setIsLoaded(true);
          },
          (error) => {
            setError(error);
            setIsLoaded(true);
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
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
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
          <ProfileInfo profile={profileInfo} />
        </UserLayout>
      );
    }
  }
};

export default DashboardPage;
