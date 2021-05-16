import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./components/pages/dashboard";
import Signin from "./components/pages/signin";
import Signup from "./components/pages/signup";
import ConfirmAccount from "./modules/auth/ConfirmAccount";
import ForgotPassword from "./modules/auth/ForgotPassword";
import ResetPasswordVerify from "./modules/auth/ResetPasswordVerify";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/confirm-account" component={ConfirmAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route
            path="/reset-password-verify"
            component={ResetPasswordVerify}
          />
          <Route path="/register" component={Signup} />
          <Route path="/home" render={(props) => <Dashboard {...props} />} />
          <Route path="/login" component={Signin} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    );
  }
}
export default App;
