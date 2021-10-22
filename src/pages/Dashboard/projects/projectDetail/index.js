import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import SummaryPlaceholder from "../../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { hasProjectAccess, isPM } from "../../../../utils/auth";
import { fetchProject } from "../../../../redux/actions/ProjectActions";
import Progress from "../../../../components/Progress";
import PaymentContainer from "./PaymentContainer";
import { FETCH_PROJECT_SUCCESS } from "../../../../configs/constants/ActionTypes";
import Planning from "./Planning";

const ProjectDetail = ({ match }) => {
  const { isMakingRequest, project } = useSelector(({ Projects }) => Projects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (project === null || project.id !== match.params.id) {
      dispatch(fetchProject(match.params.id));
    }

    return () => {
      dispatch({ type: FETCH_PROJECT_SUCCESS, data: null });
    };
  }, []);

  if (isMakingRequest.fetch || project === null) {
    // TODO: if project is null show appropriate error
    return <Progress style={{ textAlign: "center" }} />;
  }

  return hasProjectAccess(project) || isPM() ? (
    <Switch>
      {[
        ["docs", <></>],
        ["plan", <Planning project={project} key={"plan"} />],
        ["pay", <PaymentContainer project={project} key={"payment"} />],
        ["reports", <></>],
        ["settings", <></>],
      ].map((path) => {
        return (
          <Route
            key={`project-management-path--${path}`}
            path={`${match.url}/${path[0]}`}
            render={() => path[1]}
          />
        );
      })}
      <Redirect from="*" to={`${match.url}/plan`} />
    </Switch>
  ) : (
    <SummaryPlaceholder
      className="page"
      description={`You don't have permission to access this project's resources`}
    />
  );
};

ProjectDetail.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.any, // TODO: (@katuula) use a much concise prop type
    params: PropTypes.any, // TODO: (@katuula) use a much concise prop type
    url: PropTypes.any, // TODO: (@katuula) use a much concise prop type
  }),
};

export default ProjectDetail;
