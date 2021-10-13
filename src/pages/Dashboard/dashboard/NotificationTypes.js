import React from "react";
import { Link } from "react-router-dom";
import { getUser, isClient, isDev, isAdmin } from "../../../utils/auth";
import { generateUserIntials } from "../../../utils/stringUtils";
import { DOC_TYPE_OTHER } from "../../../configs/constants/projectConstants";
import moment from "moment";
import { INVOICE_TYPE_SALE } from "../../../utils/api";

const notificationDetails = (item, user) => ({
  type: "activity",
  id: item?.id,
  date: item.timestamp,
  ...(user?.avatar_url
    ? { avatar: user.avatar_url }
    : { initials: generateUserIntials(user) }),
});

export const participation = (renderNotification, item) => {
  return renderNotification({
    key: `${item.key}-participation`,
    text: (
      <span>
        {getUser().id === item.activity.user?.id ? (
          "You have"
        ) : (
          <span>
            <Link
              to={`#`}
              style={{ textDecoration: "none", cursor: "default" }}
            >
              {item.activity.user?.display_name}
            </Link>{" "}
            has
          </span>
        )}{" "}
        been added to {isDev() ? "the" : "your"} team for&nbsp;
        <Link to={`/projects/${item.activity.project?.id}/team`}>
          {item.activity.project?.title}
        </Link>
      </span>
    ),
    ...notificationDetails(item, item.activity.user),
  });
};

export const document = (renderNotification, item) => {
  return renderNotification({
    key: `${item.key}-document`,
    text: (
      <span>
        {getUser().id === item.activity.created_by.id ? (
          "You"
        ) : (
          <span>
            <Link to={`#`}>{item.activity.created_by.display_name}</Link>
          </span>
        )}
        {` added a ${
          item.activity.type !== DOC_TYPE_OTHER
            ? `${item.activity.type} `
            : null
        }document to project `}
        <Link to={`/projects/${item.activity.project?.id}/docs`}>
          {item.activity.project?.title}
        </Link>
      </span>
    ),
    ...notificationDetails(item, item.activity.created_by),
  });
};

export const invoice = (renderNotification, item) => {
  if (isDev() && item.activity.user?.id !== getUser().id) {
    // Devs only see their own invoices
    return null;
  }

  if (isClient() && !isAdmin() && item.activity.type !== INVOICE_TYPE_SALE) {
    // Clients only see sales invoices
    return null;
  }

  return renderNotification({
    key: `${item.key}-invoice`,
    text: (
      <span>
        {getUser().id === item.activity.created_by.id ? (
          "You"
        ) : (
          <span>
            <Link to={`#`}>{item.activity.created_by.display_name}</Link>
          </span>
        )}{" "}
        generated an invoice for&nbsp;
        <Link to={`/projects/${item.activity.project?.id}/pay`}>
          {item.activity.project?.title}
        </Link>{" "}
        : {item.activity.title}
      </span>
    ),
    ...notificationDetails(item, item.activity.created_by),
  });
};

export const fieldChangeLog = (renderNotification, item) => {
  if (!["start_date", "deadline", "due_at"].includes(item.activity.field)) {
    // On date changes
    return null;
  }
  const fieldDisplayMap = {
    start_date: "start date",
    deadline: "deadline",
    due_at: "milestone",
  };

  return renderNotification({
    key: `${item.key}-field-change-log`,
    text: (
      <span>
        {getUser().id === item.activity.created_by.id ? (
          "You"
        ) : (
          <span>
            <Link to={`#`}>{item.activity.created_by.display_name}</Link>
          </span>
        )}{" "}
        changed{" "}
        {item.activity.target_type === "progress_event" ? (
          <span>
            {" "}
            due date for &nbsp;
            <Link
              to={`/projects/${item.activity.target.project.id}/events/${item.activity.target.id}`}
            >
              {item.activity.target.title}
            </Link>
          </span>
        ) : (
          <span>
            project {fieldDisplayMap[item.activity.field] || "planning"}
          </span>
        )}{" "}
        to {moment.utc(item.activity.new_value).local().format("Do, MMMM YYYY")}{" "}
        for&nbsp;
        {item.activity.target.project ? (
          <Link to={`/projects/${item.activity.target.project.id}/plan`}>
            {item.activity.target.project.title}
          </Link>
        ) : (
          <Link to={`/projects/${item.activity.target.id}/plan`}>
            {item.activity.target.title}
          </Link>
        )}
      </span>
    ),
    ...notificationDetails(item, item.activity.created_by),
  });
};
