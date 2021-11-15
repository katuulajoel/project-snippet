import axios from "axios";
import * as actionTypes from "../../configs/constants/ActionTypes";
import { ENDPOINT_INVITE, ENDPOINT_USERS } from "../../utils/api";
import { success } from "../../utils/actions";
import Alert from "../../utils/alert";

// TODO:
// - Work error handling
// - Loading via button

export function createUser(data) {
  return (dispatch, sideEffect = null) =>
    axios
      .post(ENDPOINT_USERS, data)
      .then(function () {
        dispatch(success(actionTypes.SET_BUTTON, false));
        Alert("Client Successfully Created.");
        sideEffect && sideEffect();
      })
      .catch(function (error) {
        dispatch(success(actionTypes.SET_BUTTON, false));
        if (error.response.data && error.response.data["email"]) {
          Alert(error.response.data["email"][0], false);
        }
      });
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

export function invite(data, isPatch = null) {
  let request_method = isPatch ? "patch" : "post";

  return (dispatch, sideEffect = null) =>
    axios
      .request({
        url: `${ENDPOINT_INVITE}${
          request_method === "patch" ? data.id + "/" : ""
        }`,
        method: request_method,
        data,
      })
      .then(function () {
        Alert("Invitation Successfully Sent.");
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
}
