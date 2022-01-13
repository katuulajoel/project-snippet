/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import moment from "moment";

/* ------------------------- Component dependencies ------------------------- */
import IconButton from "../../../../components/IconButton";
import Avatar from "../../../../components/Avatar";
import { isAdmin, isCMOrCSOAndHasProjectAcess } from "../../../../utils/auth";
import styled from "styled-components";
import { generateUserIntials } from "../../../../utils/stringUtils";
import useRightNav from "../../../../layouts/RightSideNav/useRightNav";

const Overview = ({ project, history }) => {
  const { close } = useRightNav();
  return (
    <Wrapper>
      <div className="section">
        <div className="section-header">
          Project Title
          {(isCMOrCSOAndHasProjectAcess(project) || isAdmin()) && (
            <IconButton
              className="btn-no-outline close-ic-btn"
              size="dash"
              name="circle-edit-outline"
              onClick={() => {
                history.push(`/projects/${project.id}/settings/details`);
                close();
              }}
            />
          )}
        </div>
        <div className="section-content">
          <p>{project.title}</p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          Description
          {(isCMOrCSOAndHasProjectAcess(project) || isAdmin()) && (
            <IconButton
              className="btn-no-outline close-ic-btn"
              size="dash"
              name="circle-edit-outline"
              onClick={() => {
                history.push(`/projects/${project.id}/settings/details`);
                close();
              }}
            />
          )}
        </div>

        <div className="section-content">
          <p>{project.description || "No description"}</p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          Project Type
          {(isCMOrCSOAndHasProjectAcess(project) || isAdmin()) && (
            <IconButton
              className="btn-no-outline close-ic-btn"
              size="dash"
              name="circle-edit-outline"
              onClick={() => {
                history.push(`/projects/${project.id}/settings/details`);
                close();
              }}
            />
          )}
        </div>

        <div className="section-content">
          <p style={{ textTransform: "capitalize" }}>
            {project.category === "project"
              ? "Managed"
              : project.category || "No project type"}
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">Timeline</div>

        <div className="section-content">
          <p>
            {project.deadline
              ? moment(project.deadline).format("Do of MMMM YYYY")
              : "Timeline not set"}
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          Team
          {(isCMOrCSOAndHasProjectAcess(project) || isAdmin()) && (
            <IconButton
              className="btn-no-outline close-ic-btn"
              size="dash"
              name="circle-edit-outline"
              onClick={() => {
                history.push(`/projects/${project.id}/settings/team`);
                close();
              }}
            />
          )}
        </div>

        <div className="section-content">
          <p className="team-header">Project Owner</p>
          <div className="team-participant">
            {project.owner ? (
              <>
                <Avatar
                  image={project.owner.avatar_url}
                  title={project.owner.display_name}
                  verified
                />
                <p>{project.owner.display_name}</p>
              </>
            ) : (
              <br />
            )}
          </div>

          <p className="team-header">Client Manager</p>
          <div className="team-participant">
            {project.cm ? (
              <>
                <Avatar
                  className={!project.cm.avatar_url ? "avatar-initials" : ""}
                  image={project.cm.avatar_url}
                  title={project.cm.display_name}
                  initials={generateUserIntials(project.cm)}
                  size="dash"
                  verified
                />
                <p>{project.cm.display_name}</p>
              </>
            ) : (
              <br />
            )}
          </div>

          <p className="team-header">Team Members</p>
          {project.participation.map((participation) => {
            return (
              <div
                key={`Team ${participation.user.id}`}
                className="team-participant"
              >
                <Avatar
                  className={
                    !participation.user.avatar_url
                      ? "avatar-initials"
                      : "avatar"
                  }
                  image={participation.user.avatar_url}
                  title={participation.user.display_name}
                  initials={generateUserIntials(participation.user)}
                  size="dash"
                  verified={participation.status === "accepted"}
                />
                <p>{participation.user.display_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .section {
    padding-bottom: 24px;
    border-bottom: 1px solid #edf1f7;

    .section-header {
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #8f9bb3;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        font-size: 15px;
      }
    }

    .section-content {
      padding-top: 8px;

      p {
        font-size: 16px;
        line-height: 22px;
        color: #3e4857;
        margin: 0;
      }

      .team-participant {
        display: flex;
        align-items: baseline;
        padding: 5px 0px;

        > p {
          align-self: center;
        }
      }

      .team-header {
        margin: 16px 0;
      }
    }
  }
`;

export default Overview;
