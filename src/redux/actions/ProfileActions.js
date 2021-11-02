/* eslint-disable no-unused-vars */
import axios from "axios";
import { SET_USER_SETTINGS } from "../../configs/constants/ActionTypes";
import { success } from "../../utils/actions";
import {
  ENDPOINT_ACCOUNT_INFO,
  ENDPOINT_CHANGE_PASSWORD,
  ENDPOINT_USER_INFO,
} from "../../utils/api";
import { getUser } from "../../utils/auth";

// TODO:
// - Work error handling
// - Loading via button

export function getSettings() {
  return (dispatch) => {
    axios
      .get(ENDPOINT_USER_INFO)
      .then(function (res) {
        dispatch(success(SET_USER_SETTINGS, { ...res.data }));
      })
      .catch(function () {});
  };
}

export function updateSettings(data) {
  return (dispatch) => {
    axios
      .patch(ENDPOINT_USER_INFO, data)
      .then(function (res) {
        dispatch(success(SET_USER_SETTINGS, { ...res.data }));
      })
      .catch(function () {});
  };
}

export function updateAuthUser(user) {
  return (dispatch) => {
    var headers = {},
      data = user;
    // TODO: Will be used once i start implement profiles
    // if (user.image) {
    //   headers["Content-Type"] = "multipart/form-data";
    //   data = composeFormData(user);
    // }
    axios
      .patch(ENDPOINT_USER_INFO, data, { headers })
      .then(function (response) {
        console.log(response);
      })
      .catch(function () {});
  };
}

export function updateAccountInfo(user) {
  // Requires password and limited to a few account fields
  return (dispatch) => {
    axios
      .patch(`${ENDPOINT_ACCOUNT_INFO}${getUser().id}/`, user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function () {});
  };
}

export function updatePassword(credentials) {
  return (dispatch) => {
    axios
      .post(ENDPOINT_CHANGE_PASSWORD, credentials)
      .then(function (response) {
        console.log(response);
      })
      .catch(function () {});
  };
}

export function deactivateAccount() {
  return (dispatch) => {
    axios
      .post(`${ENDPOINT_ACCOUNT_INFO}deactivate/`, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function () {});
  };
}
