/* eslint-disable prettier/prettier */
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(undefined, (err) => {
  const url = `${
    process.env.REACT_APP_NODE_ENV === "production" ? window.location.origin + "/" : process.env.REACT_APP_BACKEND_ROOT
  }api/auth/verify/`;

  if (
    err.request.responseURL !== url &&
    (err.response.status === 403 || err.response.data.detail === "Authentication credentials were not provided.")
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
export const ENDPOINT_RESET_PASSWORD = getEndpointUrl("auth/password/reset/");
export const ENDPOINT_RESET_PASSWORD_CONFIRM = getEndpointUrl("auth/password/reset/confirm/");

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

// Account
export const ENDPOINT_PROFILE = getEndpointUrl("me/profile/");
export const ENDPOINT_COMPANY = getEndpointUrl("me/company/");
export const ENDPOINT_NOTIFICATIONS = getEndpointUrl("me/notification/");
export const ENDPOINT_ACCOUNT_INFO = getEndpointUrl("me/account/");
export const ENDPOINT_ACCOUNT_SETTINGS = getEndpointUrl("me/settings/");
export const ENDPOINT_USER_INFO = getEndpointUrl("me/user/");
export const ENDPOINT_USER_EDUCATION = getEndpointUrl("me/education/");
export const ENDPOINT_USER_PROJECT = getEndpointUrl("me/project/");
export const ENDPOINT_USER_WORK = getEndpointUrl("me/work/");
export const ENDPOINT_PAYONEER_SIGNUP = getEndpointUrl("payoneer/");

export const ENDPOINT_PROJECTS = getEndpointUrl("projects/");
export const ENDPOINT_USERS = getEndpointUrl("users/");
export const ENDPOINT_DOCUMENTS = getEndpointUrl("documents/");
export const ENDPOINT_PARTICIPATION = getEndpointUrl("participation/");
export const ENDPOINT_PROGRESS_EVENTS = getEndpointUrl("progress-events/");
export const ENDPOINT_PROGRESS_REPORTS = getEndpointUrl("progress-reports/");
export const ENDPOINT_SKILLS = getEndpointUrl("skills/");
export const ENDPOINT_ACTIVITIES = getEndpointUrl("activity/");
export const ENDPOINT_COMMENTS = getEndpointUrl("comments/");
export const ENDPOINT_CHANNELS = getEndpointUrl("channels/");
export const ENDPOINT_MESSAGES = getEndpointUrl("messages/");
export const ENDPOINT_UPLOADS = getEndpointUrl("uploads/");
export const ENDPOINT_INVOICES = getEndpointUrl("invoices/");
export const ENDPOINT_INVOICES_SUMMARY = getEndpointUrl("invoices/summary/");
export const ENDPOINT_INTEREST_POLLS = getEndpointUrl("interest-polls/");

export const ENDPOINT_COUNTRIES = getEndpointUrl("countries/");

export const ENDPOINT_CONTACT_REQUEST = getEndpointUrl("contact-request/");
export const ENDPOINT_INVITE_REQUEST = getEndpointUrl("invite-request/");
export const ENDPOINT_MEDIUM = getEndpointUrl("medium/");
export const ENDPOINT_OEMBED = getEndpointUrl("oembed/");
export const ENDPOINT_SKILL_PAGES = getEndpointUrl("skill-pages/");
export const ENDPOINT_BLOGS = getEndpointUrl("blogs/");
export const ENDPOINT_MIGRATE = getEndpointUrl("migrate/");
export const ENDPOINT_NOTIFICATION_LOG = getEndpointUrl("notification-log/");
export const ENDPOINT_LOG_SEARCH = getEndpointUrl("log/search/");
export const ENDPOINT_VISITORS = getEndpointUrl("visitors/");
export const ENDPOINT_DEVELOPER_RATING = getEndpointUrl("developer-rating/");
export const ENDPOINT_GENERAL_RATING = getEndpointUrl("progress-reports/");

export const ENDPOINT_TEST_RESULTS = getEndpointUrl("results/");

export const flattenJson = (jsonData, key) => {
  let flattenedData = {};

  if (jsonData !== null && jsonData !== undefined) {
    if (jsonData instanceof File) {
      if (key) {
        let flattenedUpdate = {};
        flattenedUpdate[key] = jsonData;
        flattenedData = { ...flattenedData, ...flattenedUpdate };
      }
    } else if (Array.isArray(jsonData)) {
      if (key && jsonData.length) {
        jsonData.forEach((item, idx) => {
          flattenedData = {
            ...flattenedData,
            ...flattenJson(item, `${key}[${idx}]`),
          };
        });
      }
    } else if (typeof jsonData === "object") {
      Object.keys(jsonData).forEach((nestedKey) => {
        flattenedData = {
          ...flattenedData,
          ...flattenJson(jsonData[nestedKey], `${key ? `${key}${key.endsWith("]") ? "" : "."}` : ""}${nestedKey}`),
        };
      });
    } else if (key) {
      let flattenedUpdate = {};
      flattenedUpdate[key] = jsonData;
      flattenedData = { ...flattenedData, ...flattenedUpdate };
    }
  }
  return flattenedData;
};

export const composeFormData = (jsonData) => {
  let flattenedData = flattenJson(jsonData);
  let formData = new FormData();
  Object.keys(flattenedData).forEach((key) => {
    formData.append(key, flattenedData[key]);
  });
  return formData;
};
