/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

/* -------------------- Internel Dependencies (Utilites) -------------------- */

import {
  isAdmin,
  isAdminOrClient,
  isPMAndHasProjectAcess,
  isDevOrClient,
} from "../../../../utils/auth";
import SummaryPlaceholder from "../../../../components/SummaryPlaceholder/SummaryPlaceholder";
import Icon from "../../../../components/Icon";
import IconButton from "../../../../components/IconButton";
import {
  onManageMilestone,
  onManagePlan,
  onManageSchedule,
} from "../../../../utils/projectUtils";
import { fetchProject } from "../../../../redux/actions/ProjectActions";
import usePrevious from "../../../../hooks/usePrevious";

/* ------------------------- Component dependencies ------------------------- */

const Planning = () => {
  const dispatch = useDispatch();
  const { project, isMakingRequest } = useSelector(({ Projects }) => Projects);
  const prevIsMakingRequest = usePrevious(isMakingRequest);
  const [planningDoc, setPlanningDoc] = useState({});
  const hasAccess = isAdminOrClient(project) || isPMAndHasProjectAcess(project);

  useEffect(() => {
    getLatestPlanningDoc();
  }, []);

  useEffect(() => {
    if (
      prevIsMakingRequest?.updateDocument ||
      prevIsMakingRequest?.createEvent ||
      prevIsMakingRequest?.updateEvent
    ) {
      dispatch(fetchProject(project.id));
    }
  }, [isMakingRequest]);

  const getLatestPlanningDoc = () => {
    let localDoc = null;
    (project.documents || []).forEach((doc) => {
      if (
        doc.type === "planning" &&
        (!localDoc ||
          moment.utc(localDoc.created_at) < moment.utc(doc.created_at))
      ) {
        localDoc = doc;
      }
    });
    setPlanningDoc(localDoc);
  };

  const getMilestones = () => {
    let milestones = (project.progress_events || []).filter(
      (event) => event.type === "milestone"
    );

    let addedDivider = false;
    let milestonesNew = milestones.reduce((acc, value) => {
      if (new Date() > new Date(value.due_at) && !addedDivider) {
        acc.push({ type: "divider" });
        addedDivider = true;
      }
      acc.push(value);
      return acc;
    }, []);

    return milestonesNew;
  };

  return (
    <div className="project-planning">
      {!project.start_date &&
      !project.deadline &&
      getMilestones().length === 0 &&
      isDevOrClient() &&
      !isAdmin() ? (
        <SummaryPlaceholder
          className="page"
          description={`No planning available yet.`}
        />
      ) : (
        <>
          <div className="section">
            <div className="section-title">
              <span>Detailed Planning Documents</span>
              {!planningDoc && hasAccess && !project.archived && (
                <a
                  href="#"
                  className="add-btn"
                  onClick={() => onManagePlan(project)}
                >
                  <Icon name="round-add" size="sm" />
                  &nbsp;&nbsp;Add New
                </a>
              )}
            </div>

            {planningDoc && (
              <div className="section-item">
                <a
                  href={planningDoc.url}
                  className="truncate"
                  target="_blank"
                  rel="noreferrer"
                  title={planningDoc.title || ""}
                >
                  <Icon name="file-document-outline" />
                  {planningDoc.title ? planningDoc.title : "Document Name"}
                </a>
                {hasAccess && !project.archived && (
                  <IconButton
                    name="circle-edit-outline"
                    size="main"
                    className="btn-edit"
                    onClick={() => onManagePlan(project, planningDoc)}
                  />
                )}
              </div>
            )}
          </div>

          <div className="section">
            <div className="section-title">
              <span>Timeline</span>

              {hasAccess &&
                ((!project.archived && !project.start_date) ||
                  !project.deadline) && (
                  <a
                    href="#"
                    className="add-btn"
                    onClick={() => onManageSchedule(project)}
                  >
                    <Icon name="round-add" size="sm" />
                    &nbsp;&nbsp;Add New
                  </a>
                )}
            </div>

            {project.start_date && project.deadline && (
              <Timeline>
                <div>{moment(project.start_date).format("Do MMM YYYY")}</div>
                <div>-</div>
                <div>{moment(project.deadline).format("Do MMM YYYY")}</div>

                {hasAccess && !project.archived && (
                  <IconButton
                    name="circle-edit-outline"
                    size="main"
                    onClick={() =>
                      onManageSchedule(project, {
                        start_date: project.start_date,
                        deadline: project.deadline,
                      })
                    }
                  />
                )}
              </Timeline>
            )}
          </div>

          <div className="section milestones">
            <div className="section-title">
              <span>Milestones</span>

              {hasAccess && !project.archived && (
                <a
                  href="#"
                  className="add-btn"
                  onClick={() => onManageMilestone(project)}
                >
                  <Icon name="round-add" size="sm" />
                  &nbsp;&nbsp;Add New
                </a>
              )}
            </div>

            <div className="section-item-wrapper">
              {getMilestones().map((milestone, i) => {
                return (
                  <React.Fragment key={`milestone-${i}`}>
                    {milestone.type && milestone.type === "divider" ? (
                      <div className="milestone-divider">
                        <div className="head"></div>
                        <div className="divider"></div>
                        <span>Today, {moment().format("Do MMM YYYY")}</span>
                      </div>
                    ) : (
                      <div className="section-item">
                        <span>
                          <Icon name="flag-outline" size="sm" />
                          {milestone.title}
                        </span>
                        <div className="milestone-time">
                          <Icon name="clock-outline" size="sm" />
                          &nbsp;&nbsp;
                          <span>
                            {moment(milestone.due_at).format("Do MMM YYYY")}
                          </span>
                          {hasAccess && !project.archived && (
                            <IconButton
                              name="circle-edit-outline"
                              size="main"
                              className="btn-edit"
                              onClick={() =>
                                onManageMilestone(project, milestone)
                              }
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Timeline = styled.div`
  display: flex;

  div {
    width: 195px;
    padding: 10px 16px;
    font-size: 16px;
    line-height: 24px;
    color: #3e4857;
    background: #ffffff;
    border: 1px solid rgba(194, 204, 217, 0.25);
    border-radius: 4px;

    &:nth-child(2) {
      width: fit-content;
      background: transparent;
      border: none;
    }
  }

  button {
    margin-left: 26px;
    i {
      color: #8f9bb3;
    }
  }
`;

Planning.propTypes = {
  project: PropTypes.object,
};

export default Planning;
