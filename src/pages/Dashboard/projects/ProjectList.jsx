import PropTypes from "prop-types";
import React from "react";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

import { isDev } from "../../../components/utils/auth";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import ProjectCard from "./components/ProjectCard";
import OpportunityCard from "./components/OpportunityCard";

const ProjectList = (props) => {
  const { stage, archived } = props;

  const { projects } = useSelector(({ Projects }) => Projects);

  const getStageName = (stage) => {
    switch (stage) {
      case "opportunity":
        return `${!isDev() ? "created " : ""}any opportunities`;
      case "active":
        if (archived == "False") {
          return `${!isDev() ? "created " : ""}any projects`;
        } else {
          return `${!isDev() ? "archived " : ""}any projects`;
        }
      default:
        return `${!isDev() ? "created " : ""}any projects`;
    }
  };

  return projects.results.length ? (
    <div>
      <Row className="card-list">
        {projects.results.map((project) => {
          return (
            <Col key={`project-card--${project.id}`} sm="3">
              {stage === "opportunity" ? (
                <OpportunityCard project={project} />
              ) : (
                <ProjectCard project={project} />
              )}
            </Col>
          );
        })}
      </Row>

      {/* <LoadMore
        hasMore={projects.next}
        isLoadingMore={isMakingRequest.listMore}
        onLoadMore={isMakingRequest.list}
      /> */}
    </div>
  ) : (
    <SummaryPlaceholder
      className={`${archived === "True" ? "page-filters-pay-summary" : "page"}`}
      description={`Seems you${
        !isDev() ? " have not" : " dont have"
      } ${getStageName(stage)}.`}
    />
  );
};

//TODO: need to specify custom description for the different user types.

ProjectList.propTypes = {
  archived: PropTypes.string,
  stage: PropTypes.string,
};

export default ProjectList;
