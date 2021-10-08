import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Switch } from "react-router";

import DashboardLayout from "../../../layouts/DashboardLayout";
import ProjectDetail from "./projectDetail";
import ProjectList from "./ProjectList";
import ProjectListContainer from "./ProjectListContainer";

const Overview = ({ match }) => {
  return (
    <DashboardLayout>
      <Switch>
        {["dedicated", "managed", "opportunity", "archived/:type"].map(
          (path) => {
            return (
              <Route
                key={`projects-${path}`}
                path={`${match.path}/${path}`}
                render={(props) => (
                  <ProjectListContainer {...props} filter={path}>
                    <ProjectList />
                  </ProjectListContainer>
                )}
              />
            );
          }
        )}
        <Redirect
          from="/projects/archived"
          to={`/projects/archived/dedicated`}
        />
        <Route
          path={`${match.path}/:id`}
          render={(props) => <ProjectDetail {...props} />}
        />
        <Redirect from="/projects" to={`/projects/dedicated`} />
      </Switch>
    </DashboardLayout>
  );
};

Overview.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default Overview;
