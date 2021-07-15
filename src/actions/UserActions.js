import axios from "axios";
import { ENDPOINT_INVITE, ENDPOINT_USERS } from "./utils/api";
import {
  GA_EVENT_ACTIONS,
  GA_EVENT_CATEGORIES,
  getGAUserType,
  sendGAEvent,
} from "./utils/tracking";
import { getUser } from "../components/utils/auth";

export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const GET_PENDING_INVITES_START = "GET_PENDING_INVITES_START";
export const GET_PENDING_INVITES_SUCCESS = "GET_PENDING_INVITES_SUCCESS";
export const GET_PENDING_INVITES_FAILED = "GET_PENDING_INVITES_FAILED";
export const GET_MORE_PENDING_INVITES_START = "GET_MORE_PENDING_INVITES_START";
export const GET_MORE_PENDING_INVITES_SUCCESS =
  "GET_MORE_PENDING_INVITES_SUCCESS";
export const GET_MORE_PENDING_INVITES_FAILED =
  "GET_MORE_PENDING_INVITES_FAILED";
export const INVITE_START = "INVITE_START";
export const INVITE_SUCCESS = "INVITE_SUCCESS";
export const INVITE_FAILED = "INVITE_FAILED";
export const LIST_USERS_START = "LIST_USERS_START";
export const LIST_USERS_SUCCESS = "LIST_USERS_SUCCESS";
export const LIST_USERS_FAILED = "LIST_USERS_FAILED";
export const RETRIEVE_USER_START = "RETRIEVE_USER_START";
export const RETRIEVE_USER_SUCCESS = "RETRIEVE_USER_SUCCESS";
export const RETRIEVE_USER_FAILED = "RETRIEVE_USER_FAILED";
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const LIST_MORE_USERS_START = "LIST_MORE_USERS_START";
export const LIST_MORE_USERS_SUCCESS = "LIST_MORE_USERS_SUCCESS";
export const LIST_MORE_USERS_FAILED = "LIST_MORE_USERS_FAILED";
export const REQUEST_USER_START = "REQUEST_USER_START";
export const REQUEST_USER_SUCCESS = "REQUEST_USER_SUCCESS";
export const REQUEST_USER_FAILED = "REQUEST_USER_FAILED";
export const RETRIEVE_INVITE_START = "RETRIEVE_INVITE_START";
export const RETRIEVE_INVITE_SUCCESS = "RETRIEVE_INVITE_SUCCESS";
export const RETRIEVE_INVITE_FAILED = "RETRIEVE_INVITE_FAILED";
export const DELETE_INVITE_START = "DELETE_INVITE_START";
export const DELETE_INVITE_SUCCESS = "DELETE_INVITE_SUCCESS";
export const DELETE_INVITE_FAILED = "DELETE_INVITE_FAILED";

export function createUser(data, selectionKey) {
  return (dispatch) => {
    dispatch(createUserStart(data, selectionKey));
    axios
      .post(ENDPOINT_USERS, data)
      .then(function (response) {
        dispatch(createUserSuccess(response.data, selectionKey));
      })
      .catch(function (error) {
        dispatch(
          createUserFailed(
            error.response ? error.response.data : null,
            selectionKey
          )
        );
      });
  };
}

export function createUserStart(data, selectionKey) {
  return {
    type: CREATE_USER_START,
    data,
    selectionKey,
  };
}

export function createUserSuccess(user, selectionKey) {
  return {
    type: CREATE_USER_SUCCESS,
    user,
    selectionKey,
  };
}

export function createUserFailed(error, selectionKey) {
  return {
    type: CREATE_USER_FAILED,
    error,
    selectionKey,
  };
}

export function getPendingInvites(selection) {
  return (dispatch) => {
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
    type: GET_PENDING_INVITES_START,
    selection,
  };
}

export function getPendingInvitesSuccess(response, selection) {
  return {
    type: GET_PENDING_INVITES_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
  };
}

export function getPendingInvitesFailed(error, selection) {
  return {
    type: GET_PENDING_INVITES_FAILED,
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
    type: GET_MORE_PENDING_INVITES_START,
    url,
    selection,
  };
}

export function getMorePendingInvitesSuccess(response, selection) {
  return {
    type: GET_MORE_PENDING_INVITES_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
  };
}

export function getMorePendingInvitesFailed(error) {
  return {
    type: GET_MORE_PENDING_INVITES_FAILED,
    error,
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
      .then(function (response) {
        dispatch(inviteSuccess(response.data, selectionKey));
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
    type: INVITE_START,
    details,
    selectionKey,
  };
}

export function inviteSuccess(invite, selectionKey) {
  sendGAEvent(
    GA_EVENT_CATEGORIES.AUTH,
    GA_EVENT_ACTIONS.DEV_INVITE,
    getGAUserType(getUser())
  );
  return {
    type: INVITE_SUCCESS,
    invite,
    selectionKey,
  };
}

export function inviteFailed(error, selectionKey) {
  return {
    type: INVITE_FAILED,
    error,
    selectionKey,
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

export function deleteInviteStart(id) {
  return {
    type: DELETE_INVITE_START,
    id,
  };
}

export function deleteInviteSuccess(id) {
  return {
    type: DELETE_INVITE_SUCCESS,
    id,
  };
}

export function deleteInviteFailed(error) {
  return {
    type: DELETE_INVITE_FAILED,
    error,
  };
}

export function retrieveInvite(key) {
  return (dispatch) => {
    dispatch(retrieveInviteStart(key));
    axios
      .get(ENDPOINT_INVITE + "key/" + key + "/")
      .then(function (response) {
        dispatch(retrieveInviteSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          retrieveInviteFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function retrieveInviteStart(key) {
  return {
    type: RETRIEVE_INVITE_START,
    key,
  };
}

export function retrieveInviteSuccess(invite) {
  return {
    type: RETRIEVE_INVITE_SUCCESS,
    invite,
  };
}

export function retrieveInviteFailed(error) {
  return {
    type: RETRIEVE_INVITE_FAILED,
    error,
  };
}

export function listUsers(filter, selection, prev_selection) {
  return (dispatch) => {
    dispatch(listUsersStart(filter, selection, prev_selection));
    axios
      .get(ENDPOINT_USERS, { params: filter })
      .then(function (response) {
        dispatch(listUsersSuccess(response.data, filter, selection));
      })
      .catch(function (error) {
        dispatch(listUsersFailed(error.response ? error.response.data : null));
      });
  };
}

export function listUsersStart(filter, selection, prev_selection) {
  return {
    type: LIST_USERS_START,
    filter,
    selection,
    prev_selection,
  };
}

export function listUsersSuccess(response, filter, selection) {
  return {
    type: LIST_USERS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    filter,
    selection,
  };
}

export function listUsersFailed(error, selection) {
  return {
    type: LIST_USERS_FAILED,
    error,
    selection,
  };
}

export function retrieveUser(id) {
  return (dispatch) => {
    dispatch(retrieveUserStart(id));
    axios
      .get(ENDPOINT_USERS + id + "/")
      .then(function (response) {
        dispatch(retrieveUserSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          retrieveUserFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function retrieveUserStart(id) {
  return {
    type: RETRIEVE_USER_START,
    id,
  };
}

export function retrieveUserSuccess(user) {
  return {
    type: RETRIEVE_USER_SUCCESS,
    user,
  };
}

export function retrieveUserFailed(error) {
  return {
    type: RETRIEVE_USER_FAILED,
    error,
  };
}

export function updateUser(id, data) {
  return (dispatch) => {
    dispatch(updateUserStart(id));
    axios
      .patch(ENDPOINT_USERS + id + "/", data)
      .then(function (response) {
        dispatch(updateUserSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(updateUserFailed(error.response ? error.response.data : null));
      });
  };
}

export function updateUserStart(id) {
  return {
    type: UPDATE_USER_START,
    id,
  };
}

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
}

export function updateUserFailed(error) {
  return {
    type: UPDATE_USER_FAILED,
    error,
  };
}

export function listMoreUsers(url, selection) {
  return (dispatch) => {
    dispatch(listMoreUsersStart(url, selection));
    axios
      .get(url)
      .then(function (response) {
        dispatch(listMoreUsersSuccess(response.data, selection));
      })
      .catch(function (error) {
        dispatch(
          listMoreUsersFailed(
            error.response ? error.response.data : null,
            selection
          )
        );
      });
  };
}

export function listMoreUsersStart(url, selection) {
  return {
    type: LIST_MORE_USERS_START,
    url,
    selection,
  };
}

export function listMoreUsersSuccess(response, selection) {
  return {
    type: LIST_MORE_USERS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
  };
}

export function listMoreUsersFailed(error) {
  return {
    type: LIST_MORE_USERS_FAILED,
    error,
  };
}

export function requestUser(id) {
  return (dispatch) => {
    dispatch(requestUserStart(id));

    axios
      .post(`${ENDPOINT_USERS}${id}/request/`, {})
      .then(function (response) {
        dispatch(requestUserSuccess(response.data, id));
      })
      .catch(function (error) {
        dispatch(
          requestUserFailed(error.response ? error.response.data : null, id)
        );
      });
  };
}

export function requestUserStart(id) {
  return {
    type: REQUEST_USER_START,
    id,
  };
}

export function requestUserSuccess(data, id) {
  return {
    type: REQUEST_USER_SUCCESS,
    data,
    id,
  };
}

export function requestUserFailed(error, id) {
  return {
    type: REQUEST_USER_FAILED,
    id,
    error,
  };
}
