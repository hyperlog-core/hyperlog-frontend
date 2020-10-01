import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import logo from "../logo.svg";
import { refreshUser } from "../utils/auth";
import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

const GET_USER = gql`
  query {
    thisUser {
      id
      firstName
      lastName
      username
      email
      newUser
      showAvatar
      themeCode
      socialLinks
      setupStep
      tagline
      profiles {
        id
        accessToken
      }
      stackOverflow {
        id
      }
    }
  }
`;

const HomeProcessing = () => {
  const { loading, data } = useQuery(GET_USER);
  const history = useHistory();

  if (!loading && JSON.parse(localStorage.getItem("user")) !== data.thisUser) {
    refreshUser(data.thisUser);
    if (data.thisUser.setupStep !== 0) {
      history.push("/setup");
    } else {
      history.push("/dashboard");
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <img src={logo} alt="Logo" className="mb-2" />
        <PulseLoader size="15px" />
      </div>
    </div>
  );
};

export default HomeProcessing;
