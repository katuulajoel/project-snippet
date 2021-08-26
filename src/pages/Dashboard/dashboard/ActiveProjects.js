import React from "react";
import { useSelector } from "react-redux";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { Link } from "react-router-dom";
import { getdateFormated } from "../../../components/utils/dateUtil";
import { isAdminOrPM } from "../../../components/utils/auth";
import Icon from "../../../components/Icon";
import styled from "styled-components";
import Avatar from "../../../components/Avatar";
import { generateUserIntials } from "../../../components/utils/stringUtils";

const ActiveProjects = () => {
  const {
    notifications: { projects },
  } = useSelector(({ Dashboard }) => Dashboard);
  return (
    <div className="dashboard-card">
      <h3 className="title">
        {`${isAdminOrPM() ? "" : "Your "}`}
        Active Projects
      </h3>
      {projects?.length == 0 ? (
        <SummaryPlaceholder description="No active projects" />
      ) : (
        <div className="content">
          {projects?.map((project) => {
            return (
              <ActiveProject key={project.id}>
                <div className="detail">
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  {project.milestone && (
                    <span className="sub-text">
                      <Icon name="clock-outline" size="sm" />{" "}
                      {getdateFormated(project.milestone.due_at)}
                      {" - "}
                      {project.milestone.title}
                    </span>
                  )}
                </div>
                <div className="group-avatars-container">
                  {project?.team?.splice(0, 4).map((user, i) => {
                    return (
                      <Avatar
                        key={`avatar-${i}`}
                        image={user.image}
                        initials={generateUserIntials(user)}
                        size="dash"
                        className={`${
                          i != 0
                            ? "overlapped_group_avatar"
                            : "initial_group_avatar"
                        } active-project ${
                          user.initials == "TA" ? "avatar-tunga" : null
                        }`}
                      />
                    );
                  })}

                  {project?.team?.length > 5 && (
                    <div className="more-avatars">
                      <span>+{project.team.length - 1}</span>
                    </div>
                  )}

                  <Link
                    className="group_avatars-cta"
                    to={`/projects/${project.id}/settings/team`}
                  >
                    <Icon name="arrow-right" size="sm" />
                  </Link>
                </div>
              </ActiveProject>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ActiveProject = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 0;
  border-bottom: 1px solid #edf1f7;

  .detail {
    a {
      font-weight: 600;
      color: #151a30;
      text-decoration: none;
    }
  }

  .group-avatars-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 0 0 auto;

    .overlapped_group_avatar {
      margin-left: -15px;
    }

    .initial_group_avatar {
      margin-left: 0px;
    }

    .more-avatars {
      background: #8f9bb3;
      width: 42px;
      height: 42px;
      border: 2px solid #fff;
      border-radius: 50%;
      position: relative;
      display: inline-block;
      margin-right: 5px;
      margin-left: -15px;
      display: flex;
      justify-content: center;

      span {
        margin: auto 0 auto 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        color: #fff;
      }
    }

    .group_avatars-cta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #8f9bb3;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

export default ActiveProjects;
