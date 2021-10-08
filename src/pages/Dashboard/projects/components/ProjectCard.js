/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

/* -------------------------- Internal Dependencies ------------------------- */
import {
  isDev,
  isPMAndHasProjectAcess,
  isAdmin,
} from "../../../../components/utils/auth";
import styled from "styled-components";
import Avatar from "../../../../components/Avatar";
import IconButton from "../../../../components/IconButton";
import Icon from "../../../../components/Icon";
import { generateUserIntials } from "../../../../components/utils/stringUtils";

const ProjectCard = ({ project }) => {
  const avatarsToShow = 1; // TODO: make this responsive depending on the viewport

  const participants = project.participation.map((participant) => ({
    avatar: participant.user.avatar_url,
    initials: generateUserIntials(participant.user),
  }));

  // This is the number of extra participants no visible on the card
  const extraParticipants =
    participants.length > avatarsToShow
      ? participants.length - avatarsToShow
      : null;

  let nextDeadline = project.deadline,
    nextEvent = project.deadline ? "Project Deadline" : null;

  if (project.progress_events) {
    project.progress_events.forEach((event) => {
      if (
        !nextDeadline ||
        moment.utc(event.due_at) < moment.utc(nextDeadline)
      ) {
        nextDeadline = event.due_at;
        nextEvent = event.title;
      }
    });
  }

  return (
    <ProjectCardStyle>
      <Link
        to={`/projects/${project.id}`}
        className={`project-card ${
          project.archived
            ? "archived"
            : isPMAndHasProjectAcess(project) || isAdmin() || isDev()
            ? "active"
            : "inactive"
        }`}
      >
        <div className="card-title">
          {_.truncate(project.title, { length: 45 })}
        </div>
        <div className="next-deadline">
          <span>
            <Icon name="clock-outline" size="sm" /> Next deadline
          </span>
          <p>
            {nextDeadline
              ? moment.utc(nextDeadline).local().format("Do MMM YYYY")
              : "Deadline Not set"}
            {nextEvent && ` - ${_.truncate(nextEvent, { length: 40 })}`}
          </p>
        </div>

        <div className="group-avatars-container">
          {participants.slice(0, avatarsToShow).map((user, i) => {
            return (
              <Avatar
                key={`avatar-${i}`}
                image={user.avatar}
                initials={user.initials}
                size="dash"
                className={`${
                  i != 0 ? "overlapped_group_avatar" : "initial_group_avatar"
                } active-project ${!user.avatar ? "avatar-initials" : ""}`}
              />
            );
          })}
          {extraParticipants && (
            <div className="more-avatars">
              <span>+{extraParticipants}</span>
            </div>
          )}

          <IconButton
            className="group_avatars-cta"
            name="dots-horizontal"
            size="sm"
          />
        </div>
      </Link>
    </ProjectCardStyle>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    archived: PropTypes.bool,
    deadline: PropTypes.string,
    id: PropTypes.any,
    participation: PropTypes.any, // TODO: (@katuula) use concise proptypes
    progress_events: PropTypes.array,
    title: PropTypes.string,
  }),
};

export const ProjectCardStyle = styled.div`
  .project-card {
    min-height: 211px !important;
    height: auto;
    position: relative;
    height: 255px;
    background-color: white;
    padding: 24px;
    border: solid 1px #ececec;
    box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    margin: 15px 0px;
    color: #151a30;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      color: black;
      text-decoration: none;
    }

    .card-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #151a30;
      height: 48px;
    }

    .next-deadline {
      span {
        font-size: 14px;
        line-height: 24px;
        color: #8f9bb3;

        i {
          vertical-align: middle;
        }
      }

      p {
        font-size: 14px;
        line-height: 24px;
        color: #3e4857;
      }
    }

    &.active {
      border-bottom: 4px solid #219653;
    }

    .group-avatars-container {
      margin-top: auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-top: 1px solid #edf1f7;
      padding-top: 24px;

      > button {
        margin: 0 0 0 auto;
      }

      .overlapped_group_avatar {
        margin-left: -10px;
      }

      .avatar {
        width: 38px;
        height: 38px;
        border: 1px solid #fff;
        margin-bottom: 4px;

        &.avatar-initials {
          font-size: 14px !important;
          font-weight: 500;
        }
      }

      .more-avatars {
        background: #8f9bb3;
        width: 38px;
        height: 38px;
        border: 1px solid #fff;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        margin-right: 5px;
        margin-left: -15px;
        display: inline-flex;
        justify-content: center;

        span {
          margin: auto 0 auto 0;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
          color: get-color("white");
        }
      }

      .group_avatars-cta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #8f9bb3;

        &:hover {
          text-decoration: none;
        }

        i {
          font-size: 6px;
        }
      }
    }
  }
`;

export default ProjectCard;
