import React, { useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { logoutUser } from '../utils/auth';
import { useApolloClient } from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const client = useApolloClient();
  const history = useHistory();
  useEffect(() => {
    logoutUser();
    client.clearStore();
    return history.push("/login");
  });
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <MoonLoader size="60" />
      </div>
    </div>
  );
}

export default Logout;
