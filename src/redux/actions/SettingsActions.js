/* eslint-disable no-unused-vars */
import axios from "axios";
import { SET_USER_SETTINGS } from "../../configs/constants/ActionTypes";
import { success } from "../../utils/actions";
import { ENDPOINT_ACCOUNT_SETTINGS } from "../../utils/api";
import { getUser } from "../../utils/auth";

// TODO:
// - Work error handling
// - Loading via button

export function getSettings() {
  return (dispatch) => {
    axios
      .get(ENDPOINT_ACCOUNT_SETTINGS)
      .then(function (res) {
        dispatch(success(SET_USER_SETTINGS, { ...res.data }));
      })
      .catch(function () {});
  };
}

export function updateSettings(data) {
  return (dispatch) => {
    axios
      .patch(ENDPOINT_ACCOUNT_SETTINGS, data)
      .then(function (res) {
        dispatch(success(SET_USER_SETTINGS, { ...res.data }));
      })
      .catch(function () {});
  };
}
