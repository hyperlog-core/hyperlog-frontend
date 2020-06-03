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
import { isUserAuthenticated } from "./utils/auth";
import Logout from "./helpers/Logout";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isUserAuthenticated() ? (
            <Redirect to="/dashboard" />
          ) : (
            <RegisterPage />
          )}
        </Route>
        <Route exact path="/login">
          {isUserAuthenticated() ? <Redirect to="/dashboard" /> : <LoginPage />}
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
