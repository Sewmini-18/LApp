import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Folder from "./folder.component";
import View from "./view.component";
import UserHistory from "./userHistory.component";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/" component={Folder} />
          <Route exact path="/user_history" component={UserHistory} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
