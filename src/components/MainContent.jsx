/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/* -------------------------- Internal Dependencies ------------------------- */
import { getUser, isDev } from "../components/utils/auth";
// import OnboardContainer from "./onboard/OnboardContainer";
import Dashboard from "../pages/Dashboard/Dashboard";
// import PaymentsContainer from "./payments";
// import TestsContainer from "./tests";
// import SettingsContainer from "./settings/SettingsContainer";
// import ProjectsContainer from "./projects/ProjectsContainer";
import Info from "../components/core/Info";
// import WorkRedirect from "./projects/WorkRedirect";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  isLargeDevice: PropTypes.bool,
  isProjectDetailsRoute: PropTypes.bool,
  className: PropTypes.string,
  noTitleBar: PropTypes.bool,
  user: PropTypes.object,
  zIndexCap: PropTypes.bool,
  rightNavStatus: PropTypes.object,
};

const MainContent = ({
  isLargeDevice = true,
  isProjectDetailsRoute = false,
  className,
  noTitleBar,
  zIndexCap,
}) => {
  return (
    <div
      id="main-content"
      className={`main-content ${className || ""} ${
        noTitleBar ? "no-title-bar" : ""
      } ${zIndexCap ? "z-index-cap" : ""} ${
        isProjectDetailsRoute ? "squeeze" : ""
      }`}
    >
      <Switch>
        {"proposal".split("|").map((path) => {
          return (
            <Route
              key={`app-path--${path}`}
              path={`/${path}`}
              render={() => (
                <div>
                  <Info message="This part of Tunga is being updated. Please check back in a bit." />
                  <p>For urgent matters, please use the chat function.</p>
                </div>
              )}
            />
          );
        })}
        {/* <Route path="/onboard" component={OnboardContainer} /> */}
        {getUser().can_contribute ? (
          [
            <Route
              key="dashboard"
              path="/dashboard"
              render={(props) => (
                <Dashboard {...props} isLargeDevice={isLargeDevice} />
              )}
            />,
            // <Route
            //   key="projects"
            //   path="/projects"
            //   component={ProjectsContainer}
            // />,
            ["/work/:taskId", "/work/:taskId/event/:eventId"].map((path) => {
              return (
                <Route
                  key={`app-path--${path}`}
                  exact
                  path={path}
                  //   render={(props) => (
                  //     <WorkRedirect
                  //       {...props}
                  //       taskId={props.match.params.taskId}
                  //       eventId={props.match.params.eventId}
                  //     />
                  //   )}
                />
              );
            }),
            <Redirect key="projects-work" from="work" to="projects" />,
            // <Route key="tests" path="/tests" component={TestsContainer} />,
            // <Route
            //   key="payments"
            //   path="/payments/:filter"
            //   component={PaymentsContainer}
            // />,
            // <Route
            //   key="settings"
            //   path="/settings"
            //   component={SettingsContainer}
            // />,
            <Redirect
              key="payments-redirect"
              from="/payments"
              to={`/payments/${isDev() ? "out" : "in"}`}
            />,
            <Redirect key="dashboard-redirect" path="*" to="/dashboard" />,
          ]
        ) : (
          <Redirect path="*" to="/onboard" />
        )}
      </Switch>
    </div>
  );
};

MainContent.propTypes = proptypes;

export default MainContent;
