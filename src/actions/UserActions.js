import axios from "axios";
import {
  // ENDPOINT_INVITE,
  ENDPOINT_USERS,
} from "./utils/api";
// import { GA_EVENT_ACTIONS, GA_EVENT_CATEGORIES, getGAUserType, sendGAEvent } from "./utils/tracking";
// import { getUser } from "../components/utils/auth";
import {
  // CREATE_USER_START,
  // CREATE_USER_SUCCESS,
  // CREATE_USER_FAILED,
  // GET_PENDING_INVITES_START,
  // GET_PENDING_INVITES_SUCCESS,
  // GET_PENDING_INVITES_FAILED,
  // GET_MORE_PENDING_INVITES_START,
  // GET_MORE_PENDING_INVITES_SUCCESS,
  // GET_MORE_PENDING_INVITES_FAILED,
  // INVITE_START,
  // INVITE_SUCCESS,
  // INVITE_FAILED,
  LIST_USERS_START,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAILED,
  // RETRIEVE_USER_START,
  // RETRIEVE_USER_SUCCESS,
  // RETRIEVE_USER_FAILED,
  // UPDATE_USER_START,
  // UPDATE_USER_SUCCESS,
  // UPDATE_USER_FAILED,
  // LIST_MORE_USERS_START,
  // LIST_MORE_USERS_SUCCESS,
  // LIST_MORE_USERS_FAILED,
  // REQUEST_USER_START,
  // REQUEST_USER_SUCCESS,
  // REQUEST_USER_FAILED,
  // RETRIEVE_INVITE_START,
  // RETRIEVE_INVITE_SUCCESS,
  // RETRIEVE_INVITE_FAILED,
  // DELETE_INVITE_START,
  // DELETE_INVITE_SUCCESS,
  // DELETE_INVITE_FAILED,
} from "./utils/ActionTypes";

// export const createUser = (data, selectionKey) => {
//   return (dispatch) => {
//     dispatch(createUserStart(data, selectionKey));
//     axios
//       .post(ENDPOINT_USERS, data)
//       .then((response) => {
//         dispatch(createUserSuccess(response.data, selectionKey));
//       })
//       .catch((error) => {
//         dispatch(createUserFailed(error.response ? error.response.data : null, selectionKey));
//       });
//   };
// };

// export const createUserStart = (data, selectionKey) => {
//   return {
//     type: CREATE_USER_START,
//     data,
//     selectionKey,
//   };
// };

// export const createUserSuccess = (user, selectionKey) => {
//   return {
//     type: CREATE_USER_SUCCESS,
//     user,
//     selectionKey,
//   };
// };

// export const createUserFailed = (error, selectionKey) => {
//   return {
//     type: CREATE_USER_FAILED,
//     error,
//     selectionKey,
//   };
// };

// export const getPendingInvites = (selection) => {
//   return (dispatch) => {
//     dispatch(getPendingInvitesStart(selection));
//     axios
//       .get(ENDPOINT_INVITE, { params: { used: "False" } })
//       .then((response) => {
//         dispatch(getPendingInvitesSuccess(response.data, selection));
//       })
//       .catch((error) => {
//         dispatch(getPendingInvitesFailed(error.response ? error.response.data : null, selection));
//       });
//   };
// };

// export const getPendingInvitesStart = (selection) => {
//   return {
//     type: GET_PENDING_INVITES_START,
//     selection,
//   };
// };

// export const getPendingInvitesSuccess = (response, selection) => {
//   return {
//     type: GET_PENDING_INVITES_SUCCESS,
//     items: response.results,
//     previous: response.previous,
//     next: response.next,
//     count: response.count,
//     selection,
//   };
// };

// export const getPendingInvitesFailed = (error, selection) => {
//   return {
//     type: GET_PENDING_INVITES_FAILED,
//     error,
//     selection,
//   };
// };

// export const getMorePendingInvites = (selection, url) => {
//   return (dispatch) => {
//     dispatch(getMorePendingInvitesStart(url, selection));
//     axios
//       .get(url)
//       .then(function (response) {
//         dispatch(getMorePendingInvitesSuccess(response.data, selection));
//       })
//       .catch(function (error) {
//         dispatch(getMorePendingInvitesFailed(error.response ? error.response.data : null, selection));
//       });
//   };
// };

// export const getMorePendingInvitesStart = (url, selection) => {
//   return {
//     type: GET_MORE_PENDING_INVITES_START,
//     url,
//     selection,
//   };
// };

// export const getMorePendingInvitesSuccess = (response, selection) => {
//   return {
//     type: GET_MORE_PENDING_INVITES_SUCCESS,
//     items: response.results,
//     previous: response.previous,
//     next: response.next,
//     count: response.count,
//     selection,
//   };
// };

// export const getMorePendingInvitesFailed = (error) => {
//   return {
//     type: GET_MORE_PENDING_INVITES_FAILED,
//     error,
//   };
// };

// export const invite = (data, selectionKey, type = null) => {
//   return (dispatch) => {
//     dispatch(inviteStart(data, selectionKey));
//     let request_method = type ? "patch" : "post";
//     axios
//       .request({
//         url: `${ENDPOINT_INVITE}${request_method === "patch" ? data.id + "/" : ""}`,
//         method: request_method,
//         data,
//       })
//       .then(function (response) {
//         dispatch(inviteSuccess(response.data, selectionKey));
//       })
//       .catch(function (error) {
//         dispatch(inviteFailed(error.response ? error.response.data : null, selectionKey));
//       });
//   };
// };

// export const inviteStart = (details, selectionKey) => {
//   return {
//     type: INVITE_START,
//     details,
//     selectionKey,
//   };
// };

// export const inviteSuccess = (invite, selectionKey) => {
//   sendGAEvent(GA_EVENT_CATEGORIES.AUTH, GA_EVENT_ACTIONS.DEV_INVITE, getGAUserType(getUser()));
//   return {
//     type: INVITE_SUCCESS,
//     invite,
//     selectionKey,
//   };
// };

// export const inviteFailed = (error, selectionKey) => {
//   return {
//     type: INVITE_FAILED,
//     error,
//     selectionKey,
//   };
// };

// export const deleteInvite = (id, selectionKey) => {
//   return (dispatch) => {
//     dispatch(deleteInviteStart(id));
//     axios
//       .delete(`${ENDPOINT_INVITE}${id}/`, {})
//       .then(() => {
//         dispatch(getPendingInvites(selectionKey));
//         dispatch(deleteInviteSuccess(id));
//       })
//       .catch((error) => {
//         dispatch(deleteInviteFailed(error.response ? error.response.data : null));
//       });
//   };
// };

// export const deleteInviteStart = (id) => {
//   return {
//     type: DELETE_INVITE_START,
//     id,
//   };
// };

// export const deleteInviteSuccess = (id) => {
//   return {
//     type: DELETE_INVITE_SUCCESS,
//     id,
//   };
// };

// export const deleteInviteFailed = (error) => {
//   return {
//     type: DELETE_INVITE_FAILED,
//     error,
//   };
// };

// export const retrieveInvite = (key) => {
//   return (dispatch) => {
//     dispatch(retrieveInviteStart(key));
//     axios
//       .get(ENDPOINT_INVITE + "key/" + key + "/")
//       .then((response) => {
//         dispatch(retrieveInviteSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(retrieveInviteFailed(error.response ? error.response.data : null));
//       });
//   };
// };

// export const retrieveInviteStart = (key) => {
//   return {
//     type: RETRIEVE_INVITE_START,
//     key,
//   };
// };

// export const retrieveInviteSuccess = (invite) => {
//   return {
//     type: RETRIEVE_INVITE_SUCCESS,
//     invite,
//   };
// };

// export const retrieveInviteFailed = (error) => {
//   return {
//     type: RETRIEVE_INVITE_FAILED,
//     error,
//   };
// };

export const listUsers = (filter, selection, prev_selection) => {
  return (dispatch) => {
    dispatch(listUsersStart(filter, selection, prev_selection));
    axios
      .get(ENDPOINT_USERS, { params: filter })
      .then((response) => {
        dispatch(listUsersSuccess(response.data, filter, selection));
      })
      .catch((error) => {
        dispatch(listUsersFailed(error.response ? error.response.data : null));
      });
  };
};

export const listUsersStart = (filter, selection, prev_selection) => {
  return {
    type: LIST_USERS_START,
    filter,
    selection,
    prev_selection,
  };
};

export const listUsersSuccess = (response, filter, selection) => {
  return {
    type: LIST_USERS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    filter,
    selection,
  };
};

export const listUsersFailed = (error, selection) => {
  return {
    type: LIST_USERS_FAILED,
    error,
    selection,
  };
};

// export const retrieveUser = (id) => {
//   return (dispatch) => {
//     dispatch(retrieveUserStart(id));
//     axios
//       .get(ENDPOINT_USERS + id + "/")
//       .then((response) => {
//         dispatch(retrieveUserSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(retrieveUserFailed(error.response ? error.response.data : null));
//       });
//   };
// };

// export const retrieveUserStart = (id) => {
//   return {
//     type: RETRIEVE_USER_START,
//     id,
//   };
// };

// export const retrieveUserSuccess = (user) => {
//   return {
//     type: RETRIEVE_USER_SUCCESS,
//     user,
//   };
// };

// export const retrieveUserFailed = (error) => {
//   return {
//     type: RETRIEVE_USER_FAILED,
//     error,
//   };
// };

// export const updateUser = (id, data) => {
//   return (dispatch) => {
//     dispatch(updateUserStart(id));
//     axios
//       .patch(ENDPOINT_USERS + id + "/", data)
//       .then((response) => {
//         dispatch(updateUserSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(updateUserFailed(error.response ? error.response.data : null));
//       });
//   };
// };

// export const updateUserStart = (id) => {
//   return {
//     type: UPDATE_USER_START,
//     id,
//   };
// };

// export const updateUserSuccess = (user) => {
//   return {
//     type: UPDATE_USER_SUCCESS,
//     user,
//   };
// };

// export const updateUserFailed = (error) => {
//   return {
//     type: UPDATE_USER_FAILED,
//     error,
//   };
// };

// export const listMoreUsers = (url, selection) => {
//   return (dispatch) => {
//     dispatch(listMoreUsersStart(url, selection));
//     axios
//       .get(url)
//       .then((response) => {
//         dispatch(listMoreUsersSuccess(response.data, selection));
//       })
//       .catch((error) => {
//         dispatch(listMoreUsersFailed(error.response ? error.response.data : null, selection));
//       });
//   };
// };

// export const listMoreUsersStart = (url, selection) => {
//   return {
//     type: LIST_MORE_USERS_START,
//     url,
//     selection,
//   };
// };

// export const listMoreUsersSuccess = (response, selection) => {
//   return {
//     type: LIST_MORE_USERS_SUCCESS,
//     items: response.results,
//     previous: response.previous,
//     next: response.next,
//     count: response.count,
//     selection,
//   };
// };

// export const listMoreUsersFailed = (error) => {
//   return {
//     type: LIST_MORE_USERS_FAILED,
//     error,
//   };
// };

// export const requestUser = (id) => {
//   return (dispatch) => {
//     dispatch(requestUserStart(id));

//     axios
//       .post(`${ENDPOINT_USERS}${id}/request/`, {})
//       .then((response) => {
//         dispatch(requestUserSuccess(response.data, id));
//       })
//       .catch((error) => {
//         dispatch(requestUserFailed(error.response ? error.response.data : null, id));
//       });
//   };
// };

// export const requestUserStart = (id) => {
//   return {
//     type: REQUEST_USER_START,
//     id,
//   };
// };

// export const requestUserSuccess = (data, id) => {
//   return {
//     type: REQUEST_USER_SUCCESS,
//     data,
//     id,
//   };
// };

// export const requestUserFailed = (error, id) => {
//   return {
//     type: REQUEST_USER_FAILED,
//     id,
//     error,
//   };
// };
