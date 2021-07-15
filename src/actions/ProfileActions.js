import axios from "axios";
import {
  ENDPOINT_ACCOUNT_INFO,
  ENDPOINT_USER_INFO,
  ENDPOINT_PROFILE,
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_USER_EDUCATION,
  ENDPOINT_USER_PROJECT,
  ENDPOINT_USER_WORK,
  ENDPOINT_COUNTRIES,
  ENDPOINT_COMPANY,
  ENDPOINT_NOTIFICATIONS,
  ENDPOINT_NOTIFICATION_LOG,
  ENDPOINT_VISITORS,
  composeFormData,
} from "./utils/api";

import * as AuthActions from "./AuthActions";
import { getUser } from "../components/utils/auth";

export const UPDATE_ACCOUNT_INFO_START = "UPDATE_ACCOUNT_INFO_START";
export const UPDATE_ACCOUNT_INFO_SUCCESS = "UPDATE_ACCOUNT_INFO_SUCCESS";
export const UPDATE_ACCOUNT_INFO_FAILED = "UPDATE_ACCOUNT_INFO_FAILED";
export const DEACTIVATE_ACCOUNT_START = "DEACTIVATE_ACCOUNT_START";
export const DEACTIVATE_ACCOUNT_SUCCESS = "DEACTIVATE_ACCOUNT_SUCCESS";
export const DEACTIVATE_ACCOUNT_FAILED = "DEACTIVATE_ACCOUNT_FAILED";
export const UPDATE_AUTH_USER_START = "UPDATE_AUTH_USER_START";
export const UPDATE_AUTH_USER_SUCCESS = "UPDATE_AUTH_USER_SUCCESS";
export const UPDATE_AUTH_USER_FAILED = "UPDATE_AUTH_USER_FAILED";
export const RETRIEVE_PROFILE_START = "RETRIEVE_PROFILE_START";
export const RETRIEVE_PROFILE_SUCCESS = "RETRIEVE_PROFILE_SUCCESS";
export const RETRIEVE_PROFILE_FAILED = "RETRIEVE_PROFILE_FAILED";
export const UPDATE_PROFILE_START = "UPDATE_PROFILE_START";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED";
export const UPDATE_PASSWORD_START = "UPDATE_PASSWORD_START";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED";
export const CREATE_WORK_START = "CREATE_WORK_START";
export const CREATE_WORK_SUCCESS = "CREATE_WORK_SUCCESS";
export const CREATE_WORK_FAILED = "CREATE_WORK_FAILED";
export const UPDATE_WORK_START = "UPDATE_WORK_START";
export const UPDATE_WORK_SUCCESS = "UPDATE_WORK_SUCCESS";
export const UPDATE_WORK_FAILED = "UPDATE_WORK_FAILED";
export const CREATE_EDUCATION_START = "CREATE_EDUCATION_START";
export const CREATE_EDUCATION_SUCCESS = "CREATE_EDUCATION_SUCCESS";
export const CREATE_EDUCATION_FAILED = "CREATE_EDUCATION_FAILED";
export const UPDATE_EDUCATION_START = "UPDATE_EDUCATION_START";
export const UPDATE_EDUCATION_SUCCESS = "UPDATE_EDUCATION_SUCCESS";
export const UPDATE_EDUCATION_FAILED = "UPDATE_EDUCATION_FAILED";
export const GET_COUNTRIES_START = "GET_COUNTRIES_START";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_FAILED = "GET_COUNTRIES_FAILED";
export const UPDATE_COMPANY_START = "UPDATE_COMPANY_START";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESS";
export const UPDATE_COMPANY_FAILED = "UPDATE_COMPANY_FAILED";
export const GET_NOTIFICATIONS_START = "GET_NOTIFICATIONS_START";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILED = "GET_NOTIFICATIONS_FAILED";
export const CREATE_NOTIFICATION_LOG_START = "CREATE_NOTIFICATION_LOG_START";
export const CREATE_NOTIFICATION_LOG_SUCCESS =
  "CREATE_NOTIFICATION_LOG_SUCCESS";
export const CREATE_NOTIFICATION_LOG_FAILED = "CREATE_NOTIFICATION_LOG_FAILED";

export const CLEAR_NOTIFICATIONS_START = "CLEAR_NOTIFICATIONS_START";
export const CLEAR_NOTIFICATIONS_SUCCESS = "CLEAR_NOTIFICATIONS_SUCCESS";
export const CLEAR_NOTIFICATIONS_FAILED = "CLEAR_NOTIFICATIONS_FAILED";

export const CREATE_VISITORS_START = "CREATE_VISITORS_START";
export const CREATE_VISITORS_SUCCESS = "CREATE_VISITORS_SUCCESS";
export const CREATE_VISITORS_FAILED = "CREATE_VISITORS_FAILED";

export const CREATE_PROJECTS_START = "CREATE_PROJECTS_START";
export const CREATE_PROJECTS_SUCCESS = "CREATE_PROJECTS_SUCCESS";
export const CREATE_PROJECTS_FAILED = "CREATE_PROJECTS_FAILED";
export const UPDATE_PROJECTS_START = "UPDATE_PROJECTS_START";
export const UPDATE_PROJECTS_SUCCESS = "UPDATE_PROJECTS_SUCCESS";
export const UPDATE_PROJECTS_FAILED = "UPDATE_PROJECTS_FAILED";

export const DELETE_EXPERIENCE_START = "DELETE_EXPERIENCE_START";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAILED = "DELETE_EXPERIENCE_FAILED";

export function updateAccountInfo(user) {
  // Requires password and limited to a few account fields
  return (dispatch) => {
    dispatch(updateAccountInfoStart());
    axios
      .patch(`${ENDPOINT_ACCOUNT_INFO}${getUser().id}/`, user)
      .then(function (response) {
        dispatch(updateAccountInfoSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          updateAccountInfoFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function updateAccountInfoStart() {
  return {
    type: UPDATE_ACCOUNT_INFO_START,
  };
}

export function updateAccountInfoSuccess(user) {
  return {
    type: UPDATE_ACCOUNT_INFO_SUCCESS,
    user,
  };
}

export function updateAccountInfoFailed(error) {
  return {
    type: UPDATE_ACCOUNT_INFO_FAILED,
    error,
  };
}

export function deactivateAccount() {
  return (dispatch) => {
    dispatch(deactivateAccountStart());
    axios
      .post(`${ENDPOINT_ACCOUNT_INFO}deactivate/`, {})
      .then(function (response) {
        dispatch(deactivateAccountSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          deactivateAccountFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function deactivateAccountStart() {
  return {
    type: DEACTIVATE_ACCOUNT_START,
  };
}

export function deactivateAccountSuccess(user) {
  return {
    type: DEACTIVATE_ACCOUNT_SUCCESS,
    user,
  };
}

export function deactivateAccountFailed(error) {
  return {
    type: DEACTIVATE_ACCOUNT_FAILED,
    error,
  };
}

export function updateAuthUser(user) {
  // No password required and can update all user fields
  return (dispatch) => {
    dispatch(updateAuthUserStart());

    var headers = {},
      data = user;
    if (user.image) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(user);
    }

    axios
      .patch(ENDPOINT_USER_INFO, data, { headers })
      .then(function (response) {
        dispatch(updateAuthUserSuccess(response.data));
        if (user.disagree_version) {
          dispatch(AuthActions.logout());
        }
      })
      .catch(function (error) {
        dispatch(
          updateAuthUserFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function updateAuthUserStart() {
  return {
    type: UPDATE_AUTH_USER_START,
  };
}

export function updateAuthUserSuccess(user) {
  return {
    type: UPDATE_AUTH_USER_SUCCESS,
    user,
  };
}

export function updateAuthUserFailed(error) {
  return {
    type: UPDATE_AUTH_USER_FAILED,
    error,
  };
}

export function retrieveProfile() {
  return (dispatch) => {
    dispatch(retrieveProfileStart());
    axios
      .get(ENDPOINT_USER_INFO)
      .then(function (response) {
        dispatch(retrieveProfileSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          retrieveProfileFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function retrieveProfileStart() {
  return {
    type: RETRIEVE_PROFILE_START,
  };
}

export function retrieveProfileSuccess(user) {
  return {
    type: RETRIEVE_PROFILE_SUCCESS,
    user: user,
    profile: user.profile,
    work: user.work,
    education: user.education,
  };
}

export function retrieveProfileFailed(error) {
  return {
    type: RETRIEVE_PROFILE_FAILED,
    error,
  };
}

export function updateProfile(id, profile, stage = null) {
  // Get an instance of `PhoneNumberUtil`.
  const phoneUtil =
    require("google-libphonenumber").PhoneNumberUtil.getInstance();

  return (dispatch) => {
    dispatch(updateProfileStart(id, profile));
    let request_method = id ? "patch" : "post";

    var headers = {},
      data = profile;
    if (
      profile &&
      (profile.id_document || (profile.user && profile.user.image))
    ) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(profile);
    }

    let requiredFields = {};
    if (profile.phone_number) {
      try {
        phoneUtil.parse(profile.phone_number);
      } catch (err) {
        requiredFields = {
          ...requiredFields,
          phone_number: err.message,
        };
      }
    }

    if (profile.postal_code && profile.postal_code.toString().length < 5) {
      requiredFields = {
        ...requiredFields,
        postal_code: "Zip code should not be less than 5 characters",
      };
    }

    if (profile.country && profile.country == "--") {
      requiredFields = {
        ...requiredFields,
        country: "Country is required",
      };
    }

    if (!Object.keys(requiredFields).length) {
      axios
        .request({
          url: ENDPOINT_PROFILE,
          method: request_method,
          data,
          headers,
        })
        .then(function (response) {
          dispatch(updateProfileSuccess(response.data, id, stage));
        })
        .catch(function (error) {
          dispatch(
            updateProfileFailed(
              error.response ? error.response.data : null,
              profile,
              id
            )
          );
        });
    } else {
      dispatch(updateProfileFailed(requiredFields, profile, id));
    }
  };
}

export function updateProfileStart(id, profile) {
  return {
    type: UPDATE_PROFILE_START,
    id,
    profile,
  };
}

export function updateProfileSuccess(profile, id, stage) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    id,
    profile,
    stage,
  };
}

export function updateProfileFailed(error, profile, id) {
  return {
    type: UPDATE_PROFILE_FAILED,
    error,
    profile,
    id,
  };
}

export function updatePassword(credentials) {
  return (dispatch) => {
    dispatch(updatePasswordStart());
    axios
      .post(ENDPOINT_CHANGE_PASSWORD, credentials)
      .then(function () {
        dispatch(updatePasswordSuccess());
      })
      .catch(function (error) {
        dispatch(
          updatePasswordFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function updatePasswordStart() {
  return {
    type: UPDATE_PASSWORD_START,
  };
}

export function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
}

export function updatePasswordFailed(error) {
  return {
    type: UPDATE_PASSWORD_FAILED,
    error,
  };
}

export function createWork(work) {
  return (dispatch) => {
    dispatch(createWorkStart(work));
    axios
      .post(ENDPOINT_USER_WORK, work)
      .then(function (response) {
        dispatch(createWorkSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(createWorkFailed(error.response ? error.response.data : null));
      });
  };
}

export function createWorkStart(work) {
  return {
    type: CREATE_WORK_START,
    work,
  };
}

export function createWorkSuccess(work) {
  return {
    type: CREATE_WORK_SUCCESS,
    work,
  };
}

export function createWorkFailed(error) {
  return {
    type: CREATE_WORK_FAILED,
    error,
  };
}

export function updateWork(id, data) {
  return (dispatch) => {
    dispatch(updateWorkStart(id));
    axios
      .patch(ENDPOINT_USER_WORK + id + "/", data)
      .then(function (response) {
        dispatch(updateWorkSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(updateWorkFailed(error.response ? error.response.data : null));
      });
  };
}

export function updateWorkStart(id) {
  return {
    type: UPDATE_WORK_START,
    id,
  };
}

export function updateWorkSuccess(work) {
  return {
    type: UPDATE_WORK_SUCCESS,
    work,
  };
}

export function updateWorkFailed(error) {
  return {
    type: UPDATE_WORK_FAILED,
    error,
  };
}

export function createEducation(education) {
  return (dispatch) => {
    dispatch(createEducationStart(education));
    axios
      .post(ENDPOINT_USER_EDUCATION, education)
      .then(function (response) {
        dispatch(createEducationSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          createEducationFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function createEducationStart(education) {
  return {
    type: CREATE_EDUCATION_START,
    education,
  };
}

export function createEducationSuccess(education) {
  return {
    type: CREATE_EDUCATION_SUCCESS,
    education,
  };
}

export function createEducationFailed(error) {
  return {
    type: CREATE_EDUCATION_FAILED,
    error,
  };
}

export function updateEducation(id, data) {
  return (dispatch) => {
    dispatch(updateEducationStart(id));
    axios
      .patch(ENDPOINT_USER_EDUCATION + id + "/", data)
      .then(function (response) {
        dispatch(updateEducationSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          updateEducationFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function updateEducationStart(id) {
  return {
    type: UPDATE_EDUCATION_START,
    id,
  };
}

export function updateEducationSuccess(education) {
  return {
    type: UPDATE_EDUCATION_SUCCESS,
    education,
  };
}

export function updateEducationFailed(error) {
  return {
    type: UPDATE_EDUCATION_FAILED,
    error,
  };
}

export function getCountries() {
  return (dispatch) => {
    dispatch(getCountriesStart());
    axios
      .get(ENDPOINT_COUNTRIES)
      .then(function (response) {
        dispatch(getCountriesSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          getCountriesFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function getCountriesStart() {
  return {
    type: GET_COUNTRIES_START,
  };
}

export function getCountriesSuccess(countries) {
  return {
    type: GET_COUNTRIES_SUCCESS,
    countries,
  };
}

export function getCountriesFailed(error) {
  return {
    type: GET_COUNTRIES_FAILED,
    error,
  };
}

export function updateCompany(id, company, stage = null) {
  return (dispatch) => {
    dispatch(updateCompanyStart(id, company));
    let request_method = id ? "patch" : "post";

    let headers = {},
      data = company;
    if (
      company &&
      company.user &&
      (company.user.image || company.user.id_document)
    ) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(company);
    }

    axios
      .request({
        url: ENDPOINT_COMPANY,
        method: request_method,
        data,
        headers,
      })
      .then(function (response) {
        dispatch(updateCompanySuccess(response.data, id, stage));
      })
      .catch(function (error) {
        dispatch(
          updateCompanyFailed(error.response ? error.response.data : null, id)
        );
      });
  };
}

export function updateCompanyStart(id, company) {
  return {
    type: UPDATE_COMPANY_START,
    id,
    company,
  };
}

export function updateCompanySuccess(company, id, stage) {
  return {
    type: UPDATE_COMPANY_SUCCESS,
    company,
    id,
    stage,
  };
}

export function updateCompanyFailed(error, id) {
  return {
    type: UPDATE_COMPANY_FAILED,
    error,
    id,
  };
}

export function getNotifications() {
  return (dispatch) => {
    dispatch(getNotificationsStart());
    axios
      .get(ENDPOINT_NOTIFICATIONS)
      .then(function (response) {
        dispatch(getNotificationsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          getNotificationsFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function getNotificationsStart() {
  return {
    type: GET_NOTIFICATIONS_START,
  };
}

export function getNotificationsSuccess(notifications) {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function getNotificationsFailed(error) {
  return {
    type: GET_NOTIFICATIONS_FAILED,
    error,
  };
}

export function createNotificationLog(notification_log) {
  return (dispatch) => {
    dispatch(createNotificationLogStart(notification_log));
    axios
      .post(ENDPOINT_NOTIFICATION_LOG, notification_log)
      .then(function (response) {
        dispatch(createNotificationLogSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          createNotificationLogFailed(
            error.response ? error.response.data : null
          )
        );
      });
  };
}

export function createNotificationLogStart(notification_log) {
  return {
    type: CREATE_NOTIFICATION_LOG_START,
    notification_log,
  };
}

export function createNotificationLogSuccess(notification_log) {
  return {
    type: CREATE_NOTIFICATION_LOG_SUCCESS,
    notification_log,
  };
}

export function createNotificationLogFailed(error) {
  return {
    type: CREATE_NOTIFICATION_LOG_FAILED,
    error,
  };
}

export function createVisitor(data) {
  return (dispatch) => {
    dispatch(createVisitorStart(data));
    axios
      .post(ENDPOINT_VISITORS, data)
      .then(function (response) {
        dispatch(createVisitorSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          createVisitorFailure(error.response ? error.response.data : null)
        );
      });
  };
}

export function createVisitorStart(data) {
  return {
    type: CREATE_VISITORS_START,
    data,
  };
}

export function createVisitorSuccess(data) {
  return {
    type: CREATE_VISITORS_SUCCESS,
    data,
  };
}

export function createVisitorFailure(error) {
  return {
    type: CREATE_VISITORS_FAILED,
    error,
  };
}

export function createProject(project) {
  return (dispatch) => {
    dispatch(createProjectStart(project));
    axios
      .post(ENDPOINT_USER_PROJECT, project)
      .then(function (response) {
        dispatch(createProjectSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          createProjectFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function createProjectStart(project) {
  return {
    type: CREATE_PROJECTS_START,
    project,
  };
}

export function createProjectSuccess(project) {
  return {
    type: CREATE_PROJECTS_SUCCESS,
    project,
  };
}

export function createProjectFailed(error) {
  return {
    type: CREATE_PROJECTS_FAILED,
    error,
  };
}

export function updateProject(id, data) {
  return (dispatch) => {
    dispatch(updateProjectStart(id));
    axios
      .patch(ENDPOINT_USER_PROJECT + id + "/", data)
      .then(function (response) {
        dispatch(updateProjectSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          updateProjectFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function updateProjectStart(id) {
  return {
    type: UPDATE_PROJECTS_START,
    id,
  };
}

export function updateProjectSuccess(project) {
  return {
    type: UPDATE_PROJECTS_SUCCESS,
    project,
  };
}

export function updateProjectFailed(error) {
  return {
    type: UPDATE_PROJECTS_FAILED,
    error,
  };
}

// Delete user experiences for projects, education and work
export function deleteExperience(id, type) {
  return (dispatch) => {
    dispatch(deleteExperienceStart(id));

    let url =
      type === "project"
        ? ENDPOINT_USER_PROJECT
        : type === "work"
        ? ENDPOINT_USER_WORK
        : type === "education"
        ? ENDPOINT_USER_EDUCATION
        : null;

    axios
      .delete(url + id + "/")
      .then(function () {
        dispatch(deleteExperienceSuccess(id, type));
      })
      .catch(function (error) {
        dispatch(
          deleteExperienceFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function deleteExperienceStart(id) {
  return {
    type: DELETE_EXPERIENCE_START,
    id,
  };
}

export function deleteExperienceSuccess(id, experienceType) {
  return {
    type: DELETE_EXPERIENCE_SUCCESS,
    experienceType,
    id,
  };
}

export function deleteExperienceFailed(error) {
  return {
    type: DELETE_EXPERIENCE_FAILED,
    error,
  };
}

export function clearNotification() {
  return (dispatch) => {
    dispatch(clearNotificationStart());
    axios
      .delete(ENDPOINT_NOTIFICATIONS)
      .then(function (response) {
        dispatch(clearNotificationSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          clearNotificationFailure(error.response ? error.response.data : null)
        );
      });
  };
}

export function clearNotificationStart() {
  return {
    type: CLEAR_NOTIFICATIONS_START,
  };
}

export function clearNotificationSuccess(data) {
  return {
    type: CLEAR_NOTIFICATIONS_SUCCESS,
    data,
  };
}

export function clearNotificationFailure(error) {
  return {
    type: CLEAR_NOTIFICATIONS_FAILED,
    error,
  };
}
