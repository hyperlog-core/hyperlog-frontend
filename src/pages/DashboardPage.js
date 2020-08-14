import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import UserLayout from "../layout/UserLayout";
import GithubConnect from "../components/GithubConnect";
import ProfileInfo from "../components/ProfileInfo";
import { refreshUser } from "../utils/auth";
import Portal from "../Portal";
import SetUsernameModal from "../components/SetUsernameModal";

const GET_USER_POLL = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      username
      email
      newUser
      profiles {
        id
      }
    }
  }
`;

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, data, startPolling, stopPolling } = useQuery(GET_USER_POLL);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (!loading && JSON.parse(localStorage.getItem("user")) !== data.thisUser) {
    refreshUser(data.thisUser);
  }

  return (
    <>
      <UserLayout
        header={user.profiles.length === 0 ? `One more step...` : "Dashboard"}
      >
        {user.profiles.length === 0 ? <GithubConnect /> : <ProfileInfo />}
      </UserLayout>
      {user.newUser && (
        <Portal>
          <SetUsernameModal isOpen={user.newUser} username={user.username} />
        </Portal>
      )}
    </>
  );
};

export default DashboardPage;
