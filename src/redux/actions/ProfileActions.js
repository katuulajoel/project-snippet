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
import Alert from "../../utils/alert";
import * as actionTypes from "../../configs/constants/ActionTypes";

// TODO:
// - Work error handling
// - Loading via button

export function updateAuthUser(user) {
  return (dispatch, sideEffect = null) => {
    var headers = {},
      data = user;
    // TODO: Will be used once i start implement profiles
    // if (user.image) {
    //   headers["Content-Type"] = "multipart/form-data";
    //   data = composeFormData(user);
    // }
    axios
      .patch(ENDPOINT_USER_INFO, data, { headers })
      .then(function () {
        Alert("Account Details Updated.");
        sideEffect && sideEffect();
        return dispatch(success(actionTypes.SET_BUTTON, false));
      })
      .catch(function (error) {
        if (error.response.data && error.response.data["email"]) {
          // Request made and server responded
          Alert(error.response.data["email"][0], false);
        }
        dispatch(success(actionTypes.SET_BUTTON, false));
      });
  };
}

export function updateAccountInfo(user) {
  // Requires password and limited to a few account fields
  return (dispatch, sideEffect = null) => {
    axios
      .patch(`${ENDPOINT_ACCOUNT_INFO}${getUser().id}/`, user)
      .then(function () {
        Alert("Account Email Updated.");
        sideEffect && sideEffect();
        return dispatch(success(actionTypes.SET_BUTTON, false));
      })
      .catch(function (error) {
        if (error.response.data && error.response.data["email"]) {
          // Request made and server responded
          Alert(error.response.data["email"][0], false);
        }
        dispatch(success(actionTypes.SET_BUTTON, false));
      });
  };
}

export function updatePassword(credentials) {
  return (dispatch, sideEffect = null) => {
    axios
      .post(ENDPOINT_CHANGE_PASSWORD, credentials)
      .then(function () {
        Alert("Account Password Updated.");
        sideEffect && sideEffect();
        return dispatch(success(actionTypes.SET_BUTTON, false));
      })
      .catch(function (error) {
        if (error.response.data && error.response.data["new_password2"]) {
          // Request made and server responded
          Alert(error.response.data["new_password2"][0], false);
        }
        dispatch(success(actionTypes.SET_BUTTON, false));
      });
  };
}

export function deactivateAccount() {
  return (dispatch) => {
    axios
      .post(`${ENDPOINT_ACCOUNT_INFO}deactivate/`, {})
      .then(function () {})
      .catch(function () {});
  };
}
