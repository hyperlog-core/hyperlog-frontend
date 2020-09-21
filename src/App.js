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
import { isUserAuthenticated } from "./utils/auth";
import HomeProcessing from "./pages/HomeProcessing";
import SetupUser from "./pages/SetupUser";

function App() {
  const loggedIn = isUserAuthenticated();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <RegisterPage />}
        </Route>
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage />}
        </Route>

        <PrivateRoute>
          <Route exact path="/home">
            <HomeProcessing />
          </Route>
          <Route exact path="/setup">
            <SetupUser />
          </Route>
          <Route exact path="/dashboard">
            <NavBar />
            <DashboardPage />
          </Route>
          <Route exact path="/profile">
            <NavBar />
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
