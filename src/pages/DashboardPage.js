import React from "react";
import { gql, useQuery } from "@apollo/client";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import ProfileInfo from "../components/ProfileInfo";
import { refreshUser } from "../utils/auth";

const GET_USER_POLL = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      email
      profiles {
        id
      }
    }
  }
`;

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, data } = useQuery(GET_USER_POLL, {
    pollInterval: 1000,
  });

  if (
    !loading &&
    JSON.parse(localStorage.getItem("user")).profiles.length !==
      data.thisUser.profiles.length
  ) {
    refreshUser(data.thisUser);
  }

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
