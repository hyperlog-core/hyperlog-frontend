import React, { useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { logoutUser } from "../utils/auth";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { currentUser } from "../store/atoms";
import { useSetRecoilState } from "recoil";

const Logout = () => {
  const client = useApolloClient();

  const setUser = useSetRecoilState(currentUser);

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
      setUser({
        loggedIn: false,
      });
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
