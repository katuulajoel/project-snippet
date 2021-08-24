import { combineReducers } from "redux";

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
} from "../actions/utils/ActionTypes";

const defaultNotifications = {
  profile: { required: [], optional: [] },
  projects: [],
  invoices: [],
  events: [],
  reports: [],
  activities: [],
};

function notifications(state = defaultNotifications, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return { ...defaultNotifications, ...action.data };
    default:
      return state;
  }
}

function isMakingRequest(_, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return { notification: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_FAILED:
      return { notification: action.error };
    default:
      return state;
  }
}

const Dashboard = combineReducers({
  notifications,
  isMakingRequest,
  errors,
});

export default Dashboard;
