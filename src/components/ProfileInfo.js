import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import RepoSelectionPage from "./RepoSelectionPage";
import UserHomeDash from "./UserHomeDash";
import { useUser } from "../utils/apiGateway";

const ProfileInfo = ({ analyse, loading, setupMode }) => {
  const userStored = JSON.parse(localStorage.getItem("user"));

  const { user, isLoading, isError } = useUser(userStored.id);

  if (isError) {
    return <div>Error: Something Went Wrong</div>;
  } else if (isLoading || (user && user.status === 404)) {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  } else if (!user.data.selectedRepos) {
    return (
      <RepoSelectionPage
        selected={user.data.selectedRepos ?? []}
        editMode={true}
        firstTime={true}
      />
    );
  } else if (user.data.selectedRepos) {
    return (
      <UserHomeDash
        setupMode={setupMode}
        profile={user.data}
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

export default ProfileInfo;
