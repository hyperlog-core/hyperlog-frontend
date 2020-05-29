import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { logoutUser } from "../utils/auth";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";

const Logout = () => {
  const client = useApolloClient();
  const history = useHistory();

  const LOGOUT_MUTATION = gql`
    mutation {
      logout {
        success
      }
    }
  `;

  const [userLogout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      logoutUser();
      client.clearStore();
      history.push("/login");
    },
  });

  useEffect(() => {
    userLogout();
  });
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <MoonLoader size="60" />
      </div>
    </div>
  );
};

export default Logout;
