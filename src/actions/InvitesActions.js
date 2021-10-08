import axios from "axios";
import { ENDPOINT_INVITE } from "./utils/api";
import * as actionTypes from "./utils/ActionTypes";

export function getPendingInvites() {
  return function (dispatch) {
    axios
      .get(ENDPOINT_INVITE, { params: { used: "False" } })
      .then(function (response) {
        dispatch(setPendingInvites(response.data));
      })
      .catch(function (err) {
        console.log(err);
      });
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
      .catch(function (err) {
        console.log(err);
      });
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
      .catch(function (err) {
        console.log(err);
      });
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
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}
