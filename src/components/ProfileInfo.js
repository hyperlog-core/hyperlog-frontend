import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import RepoSelectionPage from "./RepoSelectionPage";

const ProfileInfo = ({ profile, analyse, loading }) => {
  if (!profile.selectedRepos) {
    return <RepoSelectionPage repos={profile.repos} />;
  } else if (profile.selectedRepos) {
    return <div>Selected Repos</div>;
  } else {
    return (
      <div className="flex w-full h-64 justify-center items-center">
        <PulseLoader size="20px" color="#374151" />
      </div>
    );
  }
};

export default ProfileInfo;