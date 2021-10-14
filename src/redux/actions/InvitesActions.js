import axios from "axios";
import * as actionTypes from "../../configs/constants/ActionTypes";
import { ENDPOINT_INVITE, ENDPOINT_USERS } from "./utils/api";

export function createUser(data) {
  return () => {
    axios
      .post(ENDPOINT_USERS, data)
      .then(function () {})
      .catch(function () {});
  };
}

export function getPendingInvites() {
  return function (dispatch) {
    axios
      .get(ENDPOINT_INVITE, { params: { used: "False" } })
      .then(function (response) {
        dispatch(setPendingInvites(response.data));
      })
      .catch(function () {});
  };
}

export function setPendingInvites(data, append = false) {
  if (append) {
    return {
      type: actionTypes.SET_MORE_PENDING_INVITES,
      payload: data,
    };
  } else {
    return {
      type: actionTypes.SET_PENDING_INVITES,
      payload: data,
    };
  }
}

export function getMorePendingInvites(url) {
  return (dispatch) => {
    axios
      .get(url)
      .then(function (response) {
        dispatch(setPendingInvites(response.data, true));
      })
      .catch(function () {});
  };
}

export function deleteInvite(id) {
  return (dispatch) => {
    dispatch(removeInvite(id));
    axios
      .delete(`${ENDPOINT_INVITE}${id}/`, {})
      .then(function () {
        dispatch(getPendingInvites());
      })
      .catch(function () {});
  };
}

export function removeInvite(id) {
  return {
    type: actionTypes.DELETE_PENDING_INVITE,
    id,
  };
}

export function invite(data, type = null) {
  return () => {
    let request_method = type ? "patch" : "post";
    axios
      .request({
        url: `${ENDPOINT_INVITE}${
          request_method === "patch" ? data.id + "/" : ""
        }`,
        method: request_method,
        data,
      })
      .then(function () {})
      .catch(function () {});
  };
}
