/* eslint-disable no-unused-vars */
import axios from "axios";
import { ENDPOINT_NOTIFICATIONS } from "./utils/api";

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
} from "./utils/ActionTypes";
import { success, start, failed } from "./utils/actions";

export function getNotifications() {
  return (dispatch) => {
    dispatch(start(FETCH_NOTIFICATIONS_START));
    axios
      .get(ENDPOINT_NOTIFICATIONS)
      .then(function (response) {
        dispatch(success(FETCH_NOTIFICATIONS_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(FETCH_NOTIFICATIONS_FAILED, error));
      });
  };
}
