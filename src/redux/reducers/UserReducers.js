import { combineReducers } from "redux";
import {
  LIST_USERS_START,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAILED,
  RETRIEVE_USER_START,
  RETRIEVE_USER_SUCCESS,
  RETRIEVE_USER_FAILED,
} from "../../configs/constants/ActionTypes";
import { getIds, reduceUser } from "./utils";

const ids = (state = {}, action) => {
  let selection_key = action.selection || "default";
  let new_state = {};
  switch (action.type) {
    case LIST_USERS_SUCCESS:
      new_state[selection_key] = getIds(action.items);
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
    case LIST_USERS_SUCCESS: {
      let all_users = {};
      action.items.forEach((user) => {
        all_users[user.id] = reduceUser(null, user);
      });
      return { ...state, ...all_users };
    }
    case RETRIEVE_USER_SUCCESS: {
      let new_user = {};
      new_user[action.user.id] = reduceUser(null, action.user);
      return { ...state, ...new_user };
    }
    default:
      return state;
  }
};

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

const User = combineReducers({
  ids,
  users,
  isRetrieving,
});

export default User;
