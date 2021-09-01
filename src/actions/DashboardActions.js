/* eslint-disable no-unused-vars */
import axios from "axios";
import { ENDPOINT_NOTIFICATIONS, ENDPOINT_NOTIFICATION_LOG } from "./utils/api";

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILED,
  CREATE_NOTIFICATION_LOG_START,
  CREATE_NOTIFICATION_LOG_SUCCESS,
  CREATE_NOTIFICATION_LOG_FAILED,
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

export function createNotificationLog(notification_log) {
  return (dispatch) => {
    dispatch(start(CREATE_NOTIFICATION_LOG_START));
    axios
      .post(ENDPOINT_NOTIFICATION_LOG, notification_log)
      .then(function (response) {
        dispatch(success(CREATE_NOTIFICATION_LOG_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_NOTIFICATION_LOG_FAILED, error));
      });
  };
}

export function clearNotification() {
  return (dispatch) => {
    dispatch(start(DELETE_NOTIFICATIONS_START));
    axios
      .delete(ENDPOINT_NOTIFICATIONS)
      .then(function (response) {
        dispatch(success(DELETE_NOTIFICATIONS_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(DELETE_NOTIFICATIONS_FAILED, error));
      });
  };
}
