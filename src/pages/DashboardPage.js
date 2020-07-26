import React from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue } from "recoil";
import { isGithubConnected } from "../store/atoms";
import ProfileInfo from "../components/ProfileInfo";
import PulseLoader from "react-spinners/PulseLoader";

const DashboardPage = () => {
  const githubConnection = useRecoilValue(isGithubConnected);

  if (!githubConnection) {
    return (
      <UserLayout header={`One more step...`}>
        <GithubConnect />
      </UserLayout>
    );
  } else if (githubConnection) {
    return (
      <UserLayout header={`Dashboard`}>
        <ProfileInfo />
      </UserLayout>
    );
  } else {
    return (
      <UserLayout header={`Loading...`}>
        <PulseLoader size="60px" color="#000000" />
      </UserLayout>
    );
  }
};

export default DashboardPage;
