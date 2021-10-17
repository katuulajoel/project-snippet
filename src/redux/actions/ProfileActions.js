/* eslint-disable no-unused-vars */
import axios from "axios";
import { SET_USER_PROFILE } from "../../configs/constants/ActionTypes";
import { ENDPOINT_USER_INFO } from "../../utils/api";

export function getSettings() {
  return (dispatch) => {
    axios
      .get(ENDPOINT_USER_INFO)
      .then(function (res) {
        dispatch(setUserProfile({ settings: { ...res.data } }));
      })
      .catch(function () {});
  };
}

export function setUserProfile(data) {
  return {
    type: SET_USER_PROFILE,
    payload: data,
  };
}

export function updateSettings() {
  return (dispatch) => {
    axios
      .patch(ENDPOINT_USER_INFO)
      .then(function (res) {
        dispatch(setUserProfile({ settings: { ...res.data } }));
      })
      .catch(function () {});
  };
}
