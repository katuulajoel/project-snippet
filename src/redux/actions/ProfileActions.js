/* eslint-disable no-unused-vars */
import axios from "axios";
import { SET_USER_PROFILE } from "../../configs/constants/ActionTypes";
import { ENDPOINT_USER_INFO } from "../../utils/api";
import { success } from "../../utils/actions";

// TODO:
// - Work error handling
// - Loading via button

export function getSettings() {
  return (dispatch) => {
    axios
      .get(ENDPOINT_USER_INFO)
      .then(function (res) {
        dispatch(success(SET_USER_PROFILE, { settings: { ...res.data } }));
      })
      .catch(function () {});
  };
}

export function updateSettings() {
  return (dispatch) => {
    axios
      .patch(ENDPOINT_USER_INFO)
      .then(function (res) {
        dispatch(success(SET_USER_PROFILE, { settings: { ...res.data } }));
      })
      .catch(function () {});
  };
}
