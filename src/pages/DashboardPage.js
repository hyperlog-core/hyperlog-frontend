import React from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";

const DashboardPage = () => {
  return (
    <UserLayout header={`Dashboard`}>
      <GithubConnect />
    </UserLayout>
  );
};

export default DashboardPage;
