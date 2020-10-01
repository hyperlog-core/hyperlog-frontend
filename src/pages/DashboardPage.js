import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import UserLayout from "../layout/UserLayout";
import { refreshUser } from "../utils/auth";
import StackoverflowConnect from "../components/StackoverflowConnect";

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
      stackOverflow {
        id
        reputation
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
        {user.stackOverflow ? (
          `StackOverflow is connected! Reputation: ${user.stackOverflow.reputation}`
        ) : (
          <StackoverflowConnect
            clientId="18592"
            redirectUri="http://localhost:3000"
          />
        )}
      </UserLayout>
    </>
  );
};

export default DashboardPage;
