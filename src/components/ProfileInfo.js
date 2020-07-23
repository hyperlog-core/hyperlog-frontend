import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import RepoSelectionPage from "./RepoSelectionPage";
import UserHomeDash from "./UserHomeDash";
import { useRecoilValueLoadable } from "recoil";
import { currentUser } from "../store/atoms";

const fetchUserData = (userID) => {
  return fetch(`${process.env.REACT_APP_AWS_URL}/user/${userID}`).then((res) =>
    res.json()
  );
};

const ProfileInfo = ({ analyse, loading }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [calledOnce, setCalledOnce] = useState(false);

  const user = useRecoilValueLoadable(currentUser);

  switch (user.state) {
    case "hasValue":
      if (user.contents.user && !isLoaded && !calledOnce) {
        setCalledOnce(true);
        fetchUserData(user.contents.user.id).then(
          (result) => {
            setProfileInfo(result);
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
  } else if (!profileInfo.selectedRepos) {
    return (
      <RepoSelectionPage
        repos={profileInfo.repos}
        selected={profileInfo.selectedRepos ?? []}
        editMode={true}
        firstTime={true}
      />
    );
  } else if (profileInfo.selectedRepos) {
    return (
      <UserHomeDash profile={profileInfo} analyse={analyse} loading={loading} />
    );
  } else {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  }
};

export default ProfileInfo;
