/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { hasProjectAccess, isPM } from "../../../components/utils/auth";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { fetchProject } from "../../../actions/ProjectActions";
import Progress from "../../../components/Progress";
import PaymentContainer from "./PaymentContainer";

const ProjectPage = ({ match }) => {
  const { isMakingRequest, project } = useSelector(({ Projects }) => Projects);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(project);
    if (project === null) {
      dispatch(fetchProject(21)); // TODO: project Id should gotten by selecting from list
    }
  }, []);

  if (isMakingRequest.fetch || project === null) {
    // TODO: if project is null show appropriate error
    return <Progress style={{ textAlign: "center" }} />;
  }

  return (
    <DashboardLayout>
      {hasProjectAccess(project) || isPM() ? (
        <Switch>
          {[
            ["docs", <></>],
            ["plan", <></>],
            [
              "pay",
              <PaymentContainer project={project.project} key={"payment"} />,
            ],
            ["reports", <></>],
            ["settings", <></>],
          ].map((path) => {
            return (
              <Route
                key={`project-management-path--${path}`}
                path={`${match.path}/${project.project.id}/${path[0]}`}
                render={() => path[1]}
              />
            );
          })}
          <Redirect from="*" to={`/projects/${project.project.id}/plan`} />
        </Switch>
      ) : (
        <SummaryPlaceholder
          className="page"
          description={`You don't have permission to access this project's resources`}
        />
      )}
    </DashboardLayout>
  );
};

export default ProjectPage;
