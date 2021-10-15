import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  createNotificationLog,
  clearNotification,
} from "../../../redux/actions/DashboardActions";
import {
  STATUS_APPROVED,
  STATUS_PENDING,
} from "../../../configs/constants/projectConstants";
import Avatar from "../../../components/Avatar";
import IconButton from "../../../components/IconButton";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { getUser, isDev } from "../../../utils/auth";
import { getdateFormated } from "../../../utils/dateUtil";
import Progress from "../../../components/Progress";
import {
  invoice,
  participation,
  document,
  fieldChangeLog,
} from "./NotificationTypes";

const RecentNotifications = () => {
  const dispatch = useDispatch();
  const {
    notifications: { profile, activities },
    isMakingRequest: { notificationLog, clearNofitication, notification },
  } = useSelector(({ Dashboard }) => Dashboard);

  let shouldUpdateProfile =
      (profile.required.length > 0 || profile.optional.length > 0) &&
      !(profile.cleared || []).includes("complete"),
    shouldConnectPayoneer =
      isDev() &&
      ![STATUS_APPROVED, STATUS_PENDING].includes(getUser().payoneer_status) &&
      !(profile.cleared || []).includes("payoneer");

  const renderNotification = ({
    key,
    text,
    type,
    id,
    date,
    avatar = null,
    initials = null,
  } = {}) => {
    let classname = "";
    if (initials == "TA") {
      classname = "avatar-tunga";
    } else if (initials) {
      classname = "avatar-initials";
    }
    return (
      <div key={key} className="list-layout">
        <Avatar
          className={classname}
          image={avatar}
          size="dash"
          initials={initials}
        />
        <div className="detail">
          <p>{text}</p>
          <span className="sub-text">{getdateFormated(date, true)}</span>
        </div>
        <Close>
          <IconButton
            className="btn-icon"
            name="cross"
            size="sm"
            onClick={() =>
              dispatch(createNotificationLog({ type, notification_id: id }))
            }
          />
        </Close>
      </div>
    );
  };

  const notificationTypes = (item) => ({
    invoice: invoice(renderNotification, item),
    participation: participation(renderNotification, item),
    document: document(renderNotification, item),
    field_change_log: fieldChangeLog(renderNotification, item),
  });

  const clearAllNotifications = () => {
    dispatch(clearNotification());

    if (shouldUpdateProfile) {
      dispatch(
        createNotificationLog({ type: "profile", notification_id: "complete" })
      );
    }

    if (shouldConnectPayoneer) {
      dispatch(
        createNotificationLog({ type: "profile", notification_id: "payoneer" })
      );
    }
  };

  const notifications = activities
    .map((item, i) => {
      return notificationTypes({ ...item, key: `notification-${i}` })[
        item.activity_type
      ];
    })
    .filter((item) => item);

  return (
    <div className="dashboard-card">
      <h3 className="title">
        Recent Notifications
        {(notificationLog || clearNofitication || notification) && (
          <Progress style={{ display: "inline-block", marginLeft: "15px" }} />
        )}
        <small
          onClick={() => clearAllNotifications()}
          style={{
            float: "right",
            cursor: "pointer",
          }}
        >
          Clear all
        </small>
      </h3>

      {shouldUpdateProfile ||
      shouldConnectPayoneer ||
      notifications.length > 0 ? (
        <div className="content">
          {shouldUpdateProfile &&
            renderNotification({
              key: "profile-card",
              text: (
                <>
                  <span>
                    Please complete your profile{" "}
                    {profile.required.length > 0 && (
                      <span>
                        to be able to {isDev() ? "accept" : "create"} projects
                      </span>
                    )}
                  </span>
                  &nbsp;
                  <Link to={`/settings/`}>Go to profile</Link>
                </>
              ),
              type: "profile",
              id: "complete",
              initials: "TA",
            })}

          {shouldConnectPayoneer &&
            renderNotification({
              key: "payoneer-card",
              text: (
                <>
                  Please connect your account with Payoneer to receive
                  payments&nbsp;
                  <Link to={`/settings/payment/`}>Set up Payoneer</Link>
                </>
              ),
              type: "profile",
              id: "payoneer",
              initials: "TA",
            })}

          {notifications}
        </div>
      ) : (
        <SummaryPlaceholder description="No recent notifications" />
      )}
    </div>
  );
};

const Close = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 auto;

  .btn-icon {
    color: #8f9bb3;
    i {
      font-weight: 600;
    }
  }
`;

export default RecentNotifications;
