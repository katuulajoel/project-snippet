import { combineReducers } from "redux";
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
  RETRIEVE_USER_START,
  RETRIEVE_USER_SUCCESS,
  RETRIEVE_USER_FAILED,
  // UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  // UPDATE_USER_FAILED,
  // LIST_MORE_USERS_START,
  LIST_MORE_USERS_SUCCESS,
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
} from "../actions/utils/ActionTypes";
import { getIds, reduceUser } from "./utils";

const ids = (state = {}, action) => {
  let selection_key = action.selection || "default";
  let new_state = {};
  switch (action.type) {
    case LIST_USERS_SUCCESS:
      new_state[selection_key] = getIds(action.items);
      return { ...state, ...new_state };
    case LIST_MORE_USERS_SUCCESS:
      new_state[selection_key] = [...state[selection_key], ...getIds(action.items)];
      return { ...state, ...new_state };
    case LIST_USERS_START:
      if (action.prev_selection && state[action.prev_selection]) {
        new_state[selection_key] = state[action.prev_selection];
        return { ...state, ...new_state };
      }
      return state;
    case LIST_USERS_FAILED:
      return state;
    default:
      return state;
  }
};

const users = (state = {}, action) => {
  switch (action.type) {
    case LIST_USERS_SUCCESS:
    case LIST_MORE_USERS_SUCCESS: {
      let all_users = {};
      action.items.forEach((user) => {
        all_users[user.id] = reduceUser(null, user);
      });
      return { ...state, ...all_users };
    }
    case RETRIEVE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS: {
      let new_user = {};
      new_user[action.user.id] = reduceUser(null, action.user);
      return { ...state, ...new_user };
    }
    default:
      return state;
  }
};

// const usernameToId = (state = {}, action) => {
//   switch (action.type) {
//     case LIST_USERS_SUCCESS:
//     case LIST_MORE_USERS_SUCCESS: {
//       let all_users = {};
//       action.items.forEach((user) => {
//         all_users[user.username] = user.id;
//       });
//       return { ...state, ...all_users };
//     }
//     case RETRIEVE_USER_SUCCESS:
//     case UPDATE_USER_SUCCESS: {
//       let new_user = {};
//       new_user[action.user.username] = action.user.id;
//       return { ...state, ...new_user };
//     }
//     default:
//       return state;
//   }
// };

// const invitation = (state = {}, action) => {
//   switch (action.type) {
//     case RETRIEVE_INVITE_SUCCESS:
//       return action.invite;
//     case RETRIEVE_INVITE_START:
//     case RETRIEVE_INVITE_FAILED:
//       return {};
//     default:
//       return state;
//   }
// };

// const isRetrievingInvitation = (state = false, action) => {
//   // TODO: this is just the same as isRetrieving
//   switch (action.type) {
//     case INVITE_START:
//       return true;
//     case INVITE_SUCCESS:
//     case INVITE_FAILED:
//       return false;
//     default:
//       return state;
//   }
// };

// const isInviting = (state = {}, action) => {
//   // TODO: this is just the same as isRetrieving
//   let selectionKey = action.selectionKey || "default";
//   let newState = {};
//   switch (action.type) {
//     case CREATE_USER_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case INVITE_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case CREATE_USER_SUCCESS:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case CREATE_USER_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case INVITE_SUCCESS:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case INVITE_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const hasInvited = (state = {}, action) => {
//   let selectionKey = action.selectionKey || "default";
//   let newState = {};
//   switch (action.type) {
//     case INVITE_SUCCESS:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case CREATE_USER_SUCCESS:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case CREATE_USER_FAILED:
//     case INVITE_START:
//     case INVITE_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

const isRetrieving = (state = {}, action) => {
  let targetKey = action.id || "default";
  let newState = {};
  switch (action.type) {
    case RETRIEVE_USER_START:
      newState[targetKey] = true;
      return { ...state, ...newState };
    case RETRIEVE_USER_SUCCESS:
    case RETRIEVE_USER_FAILED:
      newState[targetKey] = false;
      return { ...state, ...newState };
    default:
      return state;
  }
};

// const isFetching = (state = {}, action) => {
//   // TODO: this is just the same as isRetrieving
//   let selectionKey = action.selection || "default";
//   let newState = {};
//   switch (action.type) {
//     case LIST_USERS_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case LIST_USERS_SUCCESS:
//     case LIST_USERS_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const isFetchingMore = (state = {}, action) => {
//   let selectionKey = action.selection || "default";
//   let newState = {};
//   switch (action.type) {
//     case LIST_MORE_USERS_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case LIST_MORE_USERS_SUCCESS:
//     case LIST_MORE_USERS_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_START:
//       newState[selectionKey] = true;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_FAILED:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = false;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const next = (state = {}, action) => {
//   let selectionKey = action.selection || "default";
//   let newState = {};
//   switch (action.type) {
//     case LIST_USERS_SUCCESS:
//     case LIST_MORE_USERS_SUCCESS:
//       newState[selectionKey] = action.next;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.next;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.next;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const previous = (state = {}, action) => {
//   let selectionKey = action.selection || "default";
//   let newState = {};
//   switch (action.type) {
//     case LIST_USERS_SUCCESS:
//     case LIST_MORE_USERS_SUCCESS:
//       newState[selectionKey] = action.previous;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.previous;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.previous;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const count = (state = {}, action) => {
//   let selectionKey = action.selection || "default";
//   let newState = {};
//   switch (action.type) {
//     case LIST_USERS_SUCCESS:
//       newState[selectionKey] = action.count;
//       return { ...state, ...newState };
//     case LIST_USERS_START:
//     case LIST_USERS_FAILED:
//       newState[selectionKey] = 0;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.count;
//       return { ...state, ...newState };
//     case GET_MORE_PENDING_INVITES_SUCCESS:
//       newState[selectionKey] = action.count;
//       return { ...state, ...newState };
//     case GET_PENDING_INVITES_START:
//     case GET_PENDING_INVITES_FAILED:
//       newState[selectionKey] = 0;
//       return { ...state, ...newState };
//     default:
//       return state;
//   }
// };

// const errors = (state = {}, action) => {
//   switch (action.type) {
//     case CREATE_USER_FAILED:
//     case INVITE_FAILED:
//       return { ...state, invite: action.error };
//     case GET_PENDING_INVITES_FAILED:
//       return { ...state, invite: action.error };
//     case CREATE_USER_START:
//     case CREATE_USER_SUCCESS:
//     case INVITE_START:
//     case INVITE_SUCCESS:
//       return { ...state, invite: null };
//     case REQUEST_USER_FAILED:
//       return { ...state, request: action.error };
//     case REQUEST_USER_START:
//     case REQUEST_USER_SUCCESS:
//       return { ...state, request: null };
//     default:
//       return state;
//   }
// };

// const isRequesting = (state = false, action) => {
//   // TODO: this is just the same as isRetrieving
//   switch (action.type) {
//     case REQUEST_USER_START:
//       return true;
//     case REQUEST_USER_SUCCESS:
//     case REQUEST_USER_FAILED:
//       return false;
//     default:
//       return state;
//   }
// };

// const hasRequested = (state = false, action) => {
//   switch (action.type) {
//     case REQUEST_USER_SUCCESS:
//       return true;
//     case REQUEST_USER_START:
//     case REQUEST_USER_FAILED:
//       return false;
//     default:
//       return state;
//   }
// };

// const pendingInvites = (state = { invites: [] }, action) => {
//   switch (action.type) {
//     case GET_PENDING_INVITES_SUCCESS:
//       return { invites: action.items };
//     case GET_MORE_PENDING_INVITES_SUCCESS:
//       return { invites: [...state.invites, ...action.items] };
//     default:
//       return state;
//   }
// };

// const isDeleting = (state = { ids: [] }, action) => {
//   switch (action.type) {
//     case DELETE_INVITE_START:
//       return { ids: [...state.ids, action.id] };
//     case DELETE_INVITE_SUCCESS:
//       return { ...state };
//     case DELETE_INVITE_FAILED:
//     default:
//       return state;
//   }
// };

const User = combineReducers({
  ids,
  users,
  // usernameToId,
  // isInviting,
  // hasInvited,
  isRetrieving,
  // isFetching,
  // isFetchingMore,
  // isRequesting,
  // hasRequested,
  // next,
  // previous,
  // pendingInvites,
  // count,
  // errors,
  // isRetrievingInvitation,
  // invitation,
  // isDeleting,
});

export default User;
