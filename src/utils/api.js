/* eslint-disable prettier/prettier */
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(undefined, (err) => {
  const url = `${
    process.env.REACT_APP_NODE_ENV === "production"
      ? window.location.origin + "/"
      : process.env.REACT_APP_BACKEND_ROOT
  }api/auth/verify/`;

  if (
    err.request.responseURL !== url &&
    (err.response.status === 403 ||
      err.response.data.detail ===
        "Authentication credentials were not provided.")
  ) {
    window.location.pathname = `/login`;
  }
  return Promise.reject(err);
});

let BACKEND_PATH = process.env.REACT_APP_BACKEND_ROOT;
let API_PATH = "api/";

export const API_ROOT = `${BACKEND_PATH}${API_PATH}`;

const getEndpointUrl = (path) => {
  return API_ROOT + path;
};

// Auth
export const ENDPOINT_LOGIN = getEndpointUrl("auth/login/");
export const ENDPOINT_LOGOUT = getEndpointUrl("auth/logout/");
export const ENDPOINT_VERIFY = getEndpointUrl("auth/verify/");
export const ENDPOINT_REGISTER = getEndpointUrl("auth/register/");
export const ENDPOINT_EMAIL_VISITOR = getEndpointUrl("auth/visitor/");
export const ENDPOINT_APPLY = getEndpointUrl("apply/");
export const ENDPOINT_INVITE = getEndpointUrl("invite/");
export const ENDPOINT_CHANGE_PASSWORD = getEndpointUrl("auth/password/change/");
export const ENDPOINT_RESET_PASSWORD_CONFIRM = getEndpointUrl(
  "auth/password/reset/confirm/"
);

// ACCOUNT
export const ENDPOINT_ACCOUNT_SETTINGS = getEndpointUrl("me/settings/");
export const ENDPOINT_USER_INFO = getEndpointUrl("me/user/");
export const ENDPOINT_ACCOUNT_INFO = getEndpointUrl("me/account/");
export const ENDPOINT_RESET_PASSWORD = getEndpointUrl("auth/password/reset/");

export const ENDPOINT_INVOICES_SUMMARY = getEndpointUrl("invoices/summary/");
export const ENDPOINT_INVOICES = getEndpointUrl("invoices/");
export const ENDPOINT_PROJECTS = getEndpointUrl("projects/");
export const ENDPOINT_NOTIFICATION_LOG = getEndpointUrl("notification-log/");
export const ENDPOINT_USERS = getEndpointUrl("users/");
export const ENDPOINT_PROGRESS_EVENTS = getEndpointUrl("progress-events/");
export const ENDPOINT_DOCUMENTS = getEndpointUrl("documents/");
export const ENDPOINT_ACTIVITIES = getEndpointUrl("activity/");

export const ENDPOINT_NOTIFICATIONS = getEndpointUrl("me/notification/");
export const ENDPOINT_SKILLS = getEndpointUrl("skills/");
export const ENDPOINT_TEST_RESULTS = getEndpointUrl("results/");
export const ENDPOINT_PAYONEER_SIGNUP = getEndpointUrl("payoneer/");

export const USER_TYPE_DEVELOPER = 1;
export const USER_TYPE_PROJECT_OWNER = 2;
export const USER_TYPE_PROJECT_MANAGER = 3;
export const USER_TYPE_DESIGNER = 4;

export const PROJECT_TYPE_WEB = "web";
export const PROJECT_TYPE_MOBILE = "mobile";
export const PROJECT_TYPE_OTHER = "other";

export const PROJECT_DURATION_2_WEEKS = "2w";
export const PROJECT_DURATION_6_MONTHS = "6m";
export const PROJECT_DURATION_PERMANENT = "permanent";

export const STATUS_INITIAL = "initial";
export const STATUS_INTERESTED = "interested";
export const STATUS_UNINTERESTED = "uninterested";

export const INVOICE_TYPE_FINAL = "final";
export const INVOICE_TYPE_SALE = "sale";
export const INVOICE_TYPE_PURCHASE = "purchase";
export const INVOICE_TYPE_CREDIT_NOTE = "credit_nota";
export const INVOICE_TYPE_COMMITMENT = "commitment";
export const PROGRESS_EVENT_TYPE_CM = "cm";
export const PROGRESS_EVENT_TYPE_CLIENT = "client";
export const PROGRESS_EVENT_TYPE_MILESTONE = "milestone";
export const PROGRESS_EVENT_TYPE_CLIENT_DEVELOPER_RATING = "developer_rating";
export const PROGRESS_EVENT_TYPE_MILESTONE_INTERNAL = "internal";
export const INVOICE_TYPES = {
  sale: "Payment",
  purchase: "Payout",
  credit_nota: "Credit Note",
};

function flattenJson(jsonData, key) {
  let flattenedData = {};

  if (jsonData) {
    if (jsonData instanceof File) {
      if (key) {
        let flattenedUpdate = {};
        flattenedUpdate[key] = jsonData;
        flattenedData = { ...flattenedData, ...flattenedUpdate };
      }
    } else if (typeof jsonData === "object") {
      Object.keys(jsonData).forEach((nestedKey) => {
        flattenedData = {
          ...flattenedData,
          ...flattenJson(
            jsonData[nestedKey],
            `${key ? `${key}${key.endsWith("]") ? "" : "."}` : ""}${nestedKey}`
          ),
        };
      });
    } else if (key) {
      let flattenedUpdate = {};
      flattenedUpdate[key] = jsonData;
      flattenedData = { ...flattenedData, ...flattenedUpdate };
    }
  }
  return flattenedData;
}

export function composeFormData(data) {
  let flattenedData = flattenJson(data);
  let formData = new FormData();
  Object.keys(flattenedData).forEach((key) => {
    formData.append(key, flattenedData[key]);
  });
  return formData;
}
