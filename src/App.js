import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./helpers/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Logout from "./helpers/Logout";
import NavBar from "./components/NavBar";
import { useRecoilState } from "recoil";
import { currentUser } from "./store/atoms";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

function App() {
  const [user, setUser] = useRecoilState(currentUser);

  const GET_CURRENT_USER_QUERY = gql`
    query {
      thisUser {
        email
        firstName
        lastName
      }
    }
  `;

  const { loading } = useQuery(GET_CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      setUser({
        loggedIn: true,
        user: data.thisUser,
      });
    },
    onError: (_err) => {
      setUser({ loggedIn: false });
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user.loggedIn ? <Redirect to="/dashboard" /> : <RegisterPage />}
        </Route>
        <Route exact path="/login">
          {user.loggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
        </Route>

        <PrivateRoute>
          <NavBar />
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
