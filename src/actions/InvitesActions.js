import axios from "axios";
import { ENDPOINT_INVITE } from "./utils/api";
import * as actions from "./utils/ActionTypes";

export function getPendingInvites(selection) {
  return function (dispatch) {
    dispatch(getPendingInvitesStart(selection));
    axios
      .get(ENDPOINT_INVITE, { params: { used: "False" } })
      .then(function (response) {
        dispatch(getPendingInvitesSuccess(response.data, selection));
      })
      .catch(function (error) {
        dispatch(
          getPendingInvitesFailed(
            error.response ? error.response.data : null,
            selection
          )
        );
      });
  };
}

export function getPendingInvitesStart(selection) {
  return {
    type: actions.GET_PENDING_INVITES_START,
    selection,
  };
}

export function getPendingInvitesSuccess(data) {
  console.log(data);
  return {
    type: actions.GET_PENDING_INVITES_SUCCESS,
    payload: data,
  };
}

export function getPendingInvitesFailed(error, selection) {
  return {
    type: actions.GET_PENDING_INVITES_FAILED,
    error,
    selection,
  };
}

export function getMorePendingInvites(selection, url) {
  return (dispatch) => {
    dispatch(getMorePendingInvitesStart(url, selection));
    axios
      .get(url)
      .then(function (response) {
        dispatch(getMorePendingInvitesSuccess(response.data, selection));
      })
      .catch(function (error) {
        dispatch(
          getMorePendingInvitesFailed(
            error.response ? error.response.data : null,
            selection
          )
        );
      });
  };
}

export function getMorePendingInvitesStart(url, selection) {
  return {
    type: actions.GET_MORE_PENDING_INVITES_START,
    url,
    selection,
  };
}

export function getMorePendingInvitesSuccess(response, selection) {
  return {
    type: actions.GET_MORE_PENDING_INVITES_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
  };
}

export function getMorePendingInvitesFailed(error) {
  return {
    type: actions.GET_MORE_PENDING_INVITES_FAILED,
    error,
  };
}

export function deleteInvite(id, selectionKey) {
  return (dispatch) => {
    dispatch(deleteInviteStart(id));
    axios
      .delete(`${ENDPOINT_INVITE}${id}/`, {})
      .then(function () {
        dispatch(getPendingInvites(selectionKey));
        dispatch(deleteInviteSuccess(id));
      })
      .catch(function (error) {
        dispatch(
          deleteInviteFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function invite(data, selectionKey, type = null) {
  return (dispatch) => {
    dispatch(inviteStart(data, selectionKey));
    let request_method = type ? "patch" : "post";
    axios
      .request({
        url: `${ENDPOINT_INVITE}${
          request_method === "patch" ? data.id + "/" : ""
        }`,
        method: request_method,
        data,
      })
      .then(function () {
        // dispatch(inviteSuccess(response.data, selectionKey));
      })
      .catch(function (error) {
        dispatch(
          inviteFailed(
            error.response ? error.response.data : null,
            selectionKey
          )
        );
      });
  };
}

export function inviteStart(details, selectionKey) {
  return {
    type: actions.INVITE_START,
    details,
    selectionKey,
  };
}

// export function inviteSuccess(invite, selectionKey) {
//   sendGAEvent(
//     GA_EVENT_CATEGORIES.AUTH,
//     GA_EVENT_ACTIONS.DEV_INVITE,
//     getGAUserType(getUser())
//   );
//   return {
//     type: actions.INVITE_SUCCESS,
//     invite,
//     selectionKey,
//   };
// }

export function inviteFailed(error, selectionKey) {
  return {
    type: actions.INVITE_FAILED,
    error,
    selectionKey,
  };
}

export function deleteInviteStart(id) {
  return {
    type: actions.DELETE_INVITE_START,
    id,
  };
}

export function deleteInviteSuccess(id) {
  return {
    type: actions.DELETE_INVITE_SUCCESS,
    id,
  };
}

export function deleteInviteFailed(error) {
  return {
    type: actions.DELETE_INVITE_FAILED,
    error,
  };
}
