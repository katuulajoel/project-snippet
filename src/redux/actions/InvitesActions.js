import axios from "axios";
import * as actionTypes from "../../configs/constants/ActionTypes";
import { ENDPOINT_INVITE, ENDPOINT_USERS } from "../../utils/api";
import { success } from "../../utils/actions";

// TODO:
// - Work error handling
// - Loading via button

export function createUser(data) {
  return axios.post(ENDPOINT_USERS, data);
}

export function getPendingInvites() {
  return function (dispatch) {
    axios
      .get(ENDPOINT_INVITE, { params: { used: "False" } })
      .then(function (response) {
        dispatch(success(actionTypes.SET_PENDING_INVITES, response.data));
      })
      .catch(function () {});
  };
}

export function getMorePendingInvites(url) {
  return (dispatch) => {
    axios
      .get(url)
      .then(function (response) {
        dispatch(success(actionTypes.SET_MORE_PENDING_INVITES, response.data));
      })
      .catch(function () {});
  };
}

export function deleteInvite(id) {
  return (dispatch) => {
    dispatch(success(actionTypes.DELETE_PENDING_INVITE, id));
    axios
      .delete(`${ENDPOINT_INVITE}${id}/`, {})
      .then(function () {
        dispatch(getPendingInvites());
      })
      .catch(function () {});
  };
}

export function invite(data, type = null) {
  let request_method = type ? "patch" : "post";

  return axios.request({
    url: `${ENDPOINT_INVITE}${request_method === "patch" ? data.id + "/" : ""}`,
    method: request_method,
    data,
  });
}
