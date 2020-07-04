import React from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import { useRecoilValue } from "recoil";
import { isGithubConnected } from "../store/atoms";

const DashboardPage = () => {
  const githubConnection = useRecoilValue(isGithubConnected);

  return (
    <UserLayout header={`Dashboard`}>
      {!githubConnection && <GithubConnect />}
    </UserLayout>
  );
};

export default DashboardPage;
