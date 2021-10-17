import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CreateUser from "./Invite/CreateUser";
import Invite from "./Invite/InviteUser";
// import Invite from "./Invite";
import PendingInvite from "./Invite/pendingInvites/PendingInvites";
import Privacy from "./Privacy";
// import * as userActions from "../../../actions/UserActions";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className={`content-card settings-card settings-container clearfix`}>
        <Switch>
          <Route exact path="/settings/privacy" component={Privacy} />
          <Route exact path="/settings/invite" component={Invite} />
          <Route exact path="/settings/invite/create" component={CreateUser} />
          <Route
            exact
            path="/settings/invite/pending"
            component={PendingInvite}
          />
        </Switch>
      </div>
    </DashboardLayout>
  );
}
