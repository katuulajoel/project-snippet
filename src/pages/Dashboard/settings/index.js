import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Invite from "./Invite";
import PendingInvite from "./Invite/views/PendingInvites";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className={`content-card settings-card settings-container clearfix`}>
        <Switch>
          <Route path="/settings/invite" component={Invite} />
          <Route path="/settings/invites/pending" component={PendingInvite} />
        </Switch>
      </div>
    </DashboardLayout>
  );
}
