import React from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue } from "recoil";
import { isGithubConnected } from "../store/atoms";
import ProfileInfo from "../components/ProfileInfo";

const DashboardPage = () => {
  const githubConnection = useRecoilValue(isGithubConnected);

  if (!githubConnection) {
    return (
      <UserLayout header={`One more step...`}>
        <GithubConnect />
      </UserLayout>
    );
  } else {
    return (
      <UserLayout header={`Dashboard`}>
        <ProfileInfo />
      </UserLayout>
    );
  }
};

export default DashboardPage;
