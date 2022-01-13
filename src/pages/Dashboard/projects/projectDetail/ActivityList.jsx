/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ProgressBar } from "react-bootstrap";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import Avatar from "../../../../components/Avatar";
import Attachments from "./Attachments";
import Progress from "../../../../components/Progress";
import LoadMore from "../../../../components/LoadMore";
import {
  getUser,
  isAdmin,
  isClient,
  isDev,
  isCM,
  isCSO,
} from "../../../../utils/auth";
import { getdateFormated } from "../../../../utils/dateUtil";
import stringUtils, {
  generateUserIntials,
} from "../../../../utils/stringUtils";
import {
  INVOICE_TYPE_SALE,
  PROGRESS_EVENT_TYPE_CLIENT,
  PROGRESS_EVENT_TYPE_MILESTONE,
  PROGRESS_EVENT_TYPE_CM,
  PROGRESS_EVENT_TYPE_MILESTONE_INTERNAL,
  PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
  INVOICE_TYPE_COMMITMENT,
  INVOICE_TYPE_FINAL,
} from "../../../../utils/api";

class ActivityList extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    hasMore: PropTypes.bool,
    onLoadMore: PropTypes.func,
  };

  static defaultProps = {
    activities: [],
    isLoading: false,
    isLoadingMore: false,
  };

  constructor(props) {
    super(props);
    this.state = { listId: stringUtils.generate() };
  }

  cleanActivity(item) {
    let activity = item.activity;
    let activityType = item.activity_type;
    let creator = null;
    let createdAt = item.timestamp;
    let body = null;
    let uploads = null;
    let more = null;

    // TODO: check for activity types message, comment, upload, legacy_upload, document, legacy_participation, legacy_progress_event, legacy_progress_report
    switch (activityType) {
      case "invoice":
        if (isDev() && activity.user.id !== getUser().id) {
          // Devs only see their own invoices
          break;
        }

        if (
          isClient() &&
          !isAdmin() &&
          [
            INVOICE_TYPE_SALE,
            INVOICE_TYPE_COMMITMENT,
            INVOICE_TYPE_FINAL,
          ].includes(item.activity.type)
        ) {
          // Clients only see sales, commitment and final invoices
          break;
        }

        creator = activity.created_by;
        createdAt = activity.created_at;
        body = (
          <p>
            <Link to={`/network/${creator.username}/`}>
              {creator.display_name}
            </Link>{" "}
            generated an invoice: {activity.title}{" "}
            <a href={activity.download_url} target="_blank" rel="noreferrer">
              {activity.number}
            </a>
          </p>
        );

        break;
      case "field_change_log": {
        if (!["start_date", "deadline", "due_at"].includes(activity.field)) {
          // On date changes
          break;
        }

        creator = activity.created_by;
        createdAt = activity.created_at;
        const fieldDisplayMap = {
          start_date: "start date",
          deadline: "deadline",
          due_at: "milestone",
        };
        body = (
          <p>
            <Link to={`/network/${creator.username}/`}>
              {creator.display_name}
            </Link>{" "}
            changed{" "}
            {activity.target_type === "progress_event" ? (
              <span>
                due date for{" "}
                <Link to={`/projects/${activity.target.project.id}/reports`}>
                  {activity.target.title}
                </Link>
              </span>
            ) : (
              <span>
                project {fieldDisplayMap[activity.field] || "planning"}
              </span>
            )}{" "}
            to {moment.utc(activity.new_value).local().format("Do, MMMM YYYY")}
            {" Reason: "}
            {activity.reason}
          </p>
        );

        break;
      }
      case "participation":
        if (["add", "create"].includes(item.action)) {
          creator = activity.created_by;
          createdAt = activity.created_at;
          let participant = activity.user;
          body = (
            <p>
              <Link to={`/network/${participant.username}/`}>
                {participant.display_name}
              </Link>{" "}
              was added to this project.
            </p>
          );
        }
        break;
      case "progress_event":
        if (
          isDev() &&
          [
            PROGRESS_EVENT_TYPE_CM,
            PROGRESS_EVENT_TYPE_CLIENT,
            PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
          ].includes(activity.type)
        ) {
          break;
        }
        if (
          (isCM() || isCSO()) &&
          [PROGRESS_EVENT_TYPE_CLIENT].includes(activity.type)
        ) {
          break;
        }
        if (
          isClient() &&
          !isAdmin() &&
          [
            PROGRESS_EVENT_TYPE_CM,
            PROGRESS_EVENT_TYPE_MILESTONE_INTERNAL,
          ].includes(activity.type)
        ) {
          break;
        }
        if (item.action === "create") {
          creator = activity.created_by || {
            id: "tunga",
            username: null,
            short_name: "Tunga",
            display_name: "Tunga Bot",
            avatar_url:
              "https://work.tunga.io/images/tunga_logo_round.png?4168b833a23d7a14a56701935b6e79f4",
          };
          createdAt = activity.created_at;
          body = (
            <p>
              <Link to={`/network/${creator.username}/`}>
                {creator.display_name}
              </Link>{" "}
              {[
                PROGRESS_EVENT_TYPE_MILESTONE,
                PROGRESS_EVENT_TYPE_MILESTONE_INTERNAL,
              ].includes(activity.type)
                ? "created a milestone: "
                : null}
              <Link to={`/projects/${activity.project.id}/reports`}>
                {activity.title || (
                  <>
                    Scheduled{" "}
                    {[PROGRESS_EVENT_TYPE_CLIENT].includes(activity.type) ||
                    (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
                      activity.user.is_project_owner)
                      ? "a progress survey"
                      : "an update"}
                  </>
                )}
              </Link>{" "}
              Due: {getdateFormated(activity.due_at, true)}
            </p>
          );
        }
        break;
      case "progress_report":
        if (
          isDev() &&
          ([
            PROGRESS_EVENT_TYPE_CM,
            PROGRESS_EVENT_TYPE_CLIENT,
            PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
          ].includes(activity.event.type) ||
            (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
              !activity.user.is_developer))
        ) {
          break;
        }
        if (
          (isCM() || isCSO()) &&
          ([
            PROGRESS_EVENT_TYPE_CLIENT,
            PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
          ].includes(activity.event.type) ||
            (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
              activity.user.is_project_owner))
        ) {
          break;
        }
        if (
          isClient() &&
          !isAdmin() &&
          ([
            PROGRESS_EVENT_TYPE_CM,
            PROGRESS_EVENT_TYPE_MILESTONE_INTERNAL,
            PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
          ].includes(activity.event.type) ||
            (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
              activity.user.is_client_manager))
        ) {
          break;
        }
        if (item.action === "create") {
          creator = activity.user;
          createdAt = activity.created_at;
          uploads = activity.uploads;
          more = {
            link: `/projects/${activity.event.project.id}/reports`,
            text: "View full report",
          };
          let progress = activity.percentage || 0;
          body = (
            <div className="activity-list-content">
              <Link to={`/network/${creator.username}/`}>
                {creator.display_name}
              </Link>{" "}
              added{" "}
              {[
                PROGRESS_EVENT_TYPE_CLIENT,
                PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
              ].includes(activity.event.type) ||
              (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
                activity.user.is_project_owner)
                ? "Progress survey"
                : "Progress report"}
              :{" "}
              <Link to={`/projects/${activity.event.project.id}/reports`}>
                {[
                  PROGRESS_EVENT_TYPE_CLIENT,
                  PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
                ].includes(activity.event.type) ||
                (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
                  activity.user.is_project_owner)
                  ? "Progress survey"
                  : activity.event.title || "Scheduled Update"}
              </Link>
              {[
                PROGRESS_EVENT_TYPE_CLIENT,
                PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING,
              ].includes(activity.event.type) ||
              (PROGRESS_EVENT_TYPE_MILESTONE === activity.event.type &&
                activity.user.is_project_owner) ? null : (
                <div>
                  <div>Status: {activity.status_display}</div>
                  <div>
                    <ProgressBar
                      bsStyle="success"
                      now={progress}
                      label={`${progress}% Completed`}
                    />
                  </div>
                  {activity.accomplished && (
                    <a target="_blank">{activity.accomplished}</a>
                  )}
                </div>
              )}
            </div>
          );
        }
        break;
      case "integration_activity":
        if (item.action === "report") {
          creator = {
            short_name: activity.user_display_name,
            display_name: activity.user_display_name,
            avatar_url: activity.avatar_url,
          };
          createdAt = activity.created_at;
          body = (
            <div className="activity-list-content">
              {activity.title || activity.body}
              {!(activity.title || activity.body) && activity.url && (
                <div>
                  <a href={activity.url} target="_blank" rel="noreferrer">
                    {activity.url}
                  </a>
                </div>
              )}
            </div>
          );
        }
        break;
      default:
        break;
    }
    if (creator) {
      return {
        id: item.id,
        type: activityType,
        user: creator,
        created_at: createdAt,
        body,
        uploads,
        more,
      };
    }
    return null;
  }

  renderThread(activity, idx) {
    return (
      <ListWrapper className="ListItem" key={`activity ${idx}`}>
        {activity.user.id && activity.user.username ? (
          <a
            href={`/network/${activity.user.username}/`}
            target="_blank"
            rel="noreferrer"
          >
            <Avatar
              image={activity.user.avatar_url}
              initials={generateUserIntials(activity.user)}
              size="dash"
            />
          </a>
        ) : (
          <Avatar
            image={activity.user.avatar_url}
            initials={generateUserIntials(activity.user)}
            size="dash"
          />
        )}

        <div>
          {activity.body}
          {activity.uploads && activity.uploads.length && (
            <Attachments attachments={activity.uploads} />
          )}

          <span className="date">
            {getdateFormated(activity.created_at, true)}
          </span>
        </div>
      </ListWrapper>
    );
  }

  render() {
    const { activities, isLoading, isLoadingMore, hasMore, onLoadMore } =
      this.props;

    return (
      <div id={`list${this.state.listId}`} className="activity-list">
        <div className="activity-wrapper">
          {isLoading ? (
            <Progress />
          ) : activities && activities.length ? (
            <div>
              <LoadMore
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={onLoadMore}
              >
                Show older activity
              </LoadMore>

              {activities &&
                activities.map((item, idx) => {
                  let activity = this.cleanActivity(item);
                  if (activity) {
                    return this.renderThread(activity, idx);
                  } else {
                    return null;
                  }
                })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const ListWrapper = styled.div`
  display: flex;
  padding: 20px 0;

  &:first-of-type {
    padding-top: 0px;
  }

  .avatar.avatar-dash {
    width: 35px;
    height: 35px;
  }
  .avatar.avatar-initials {
    font-size: 12px;
  }

  p,
  .activity-list-content,
  .clearfix {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #3e4857;
    margin-bottom: 8px;

    a {
      color: #3e4857;
      font-weight: 600;
      text-decoration: none;
    }
  }

  .date {
    font-size: 14px;
    line-height: 21px;
    color: #8f9bb3;
  }
`;

export default ActivityList;
