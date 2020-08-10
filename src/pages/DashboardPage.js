import React from "react";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import ProfileInfo from "../components/ProfileInfo";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.profiles.length === 0) {
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
