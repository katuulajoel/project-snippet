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

function getEndpointUrl(path) {
  return API_ROOT + path;
}

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

export const ENDPOINT_USER_INFO = getEndpointUrl("me/settings/");
export const ENDPOINT_ACCOUNT_INFO = getEndpointUrl("me/account/");
export const ENDPOINT_RESET_PASSWORD = getEndpointUrl("auth/password/reset/");

export const ENDPOINT_INVOICES_SUMMARY = getEndpointUrl("invoices/summary/");
export const ENDPOINT_INVOICES = getEndpointUrl("invoices/");
export const ENDPOINT_PROJECTS = getEndpointUrl("projects/");
export const ENDPOINT_NOTIFICATIONS = getEndpointUrl("me/notification/");
export const ENDPOINT_NOTIFICATION_LOG = getEndpointUrl("notification-log/");
export const ENDPOINT_USERS = getEndpointUrl("users/");
export const ENDPOINT_PROGRESS_EVENTS = getEndpointUrl("progress-events/");
export const ENDPOINT_DOCUMENTS = getEndpointUrl("documents/");
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
export const INVOICE_TYPES = {
  sale: "Payment",
  purchase: "Payout",
  credit_nota: "Credit Note",
};

export function composeFormData(data) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
}
