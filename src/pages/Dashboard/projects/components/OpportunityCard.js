/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

/* -------------------------- Internal Dependencies ------------------------- */
import { isDev, isPMAndHasProjectAcess, isAdmin } from "../../../../utils/auth";
import styled from "styled-components";
import { ProjectCardStyle } from "./ProjectCard";

const OpportunityCard = ({ project }) => {
  const interestPolls = project.interest_polls;
  const interestedDevs = interestPolls.filter(
    (interest) => interest.status == "interested"
  ).length;
  return (
    <Wrapper>
      <Link
        to={`/projects/${project.id}`}
        className={`project-card ${
          isPMAndHasProjectAcess(project) || isAdmin() || isDev()
            ? "active"
            : "inactive"
        }`}
      >
        <h4>{_.truncate(project.title, { length: 30 })}</h4>
        <div>
          <p className="time">
            <i className="tg-ic-clock-outline tunga-ic-sz-sm "></i>
            {moment.utc(project.create_at).local().format("DD MMM YYYY")}
          </p>

          <div className="d-flex project__card-about">
            <div>
              <p>Sent</p>
              <h4 className="text-left">{interestPolls.length}</h4>
            </div>
            <div>
              <p>Interested</p>

              <h4 className="text-right">{interestedDevs}</h4>
            </div>
          </div>
        </div>
      </Link>{" "}
    </Wrapper>
  );
};

OpportunityCard.propTypes = {
  project: PropTypes.shape({
    create_at: PropTypes.string,
    id: PropTypes.number,
    interest_polls: PropTypes.array,
    title: PropTypes.string,
  }),
};

const Wrapper = styled(ProjectCardStyle)`
  .project-card {
    height: auto;
  }
  .project__card-about {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid #edf1f7;
    padding-top: 24px;
  }
  h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #151a30;
  }
  p.time {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 150%;

    color: #8f9bb3;
    i {
      margin-right: 4px;
      color: #8f9bb3;
    }
  }
  .d-flex.project__card-about h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #3e4857;
  }
  .d-flex.project__card-about p {
    margin-bottom: 4px;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    color: #8f9bb3;
  }
`;

export default OpportunityCard;
