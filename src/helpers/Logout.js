import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { logoutUser } from "../utils/auth";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <MoonLoader size="60px" />
      </div>
    </div>
  );
};

export default Logout;
