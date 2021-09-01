import { combineReducers } from "redux";

import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  CREATE_NOTIFICATION_LOG_SUCCESS,
  CREATE_NOTIFICATION_LOG_FAILED,
  CREATE_NOTIFICATION_LOG_START,
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILED,
} from "../actions/utils/ActionTypes";

const defaultNotifications = {
  profile: { cleared: [], required: [], optional: [] },
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
    case CREATE_NOTIFICATION_LOG_SUCCESS:
      if (action.data.type === "profile") {
        return {
          ...state,
          profile: {
            ...state.profile,
            cleared: [...state.profile.cleared, action.data.notification_id],
          },
        };
      } else {
        let newActivites = state.activities.filter(
          (item) => item.id != action.data.notification_id
        );
        console.log(newActivites);
        return {
          ...state,
          activities: newActivites,
        };
      }
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        activities: [],
      };
    default:
      return state;
  }
}

function isMakingRequest(_, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return { notification: true };
    case CREATE_NOTIFICATION_LOG_START:
      return { notificationLog: true };
    case DELETE_NOTIFICATIONS_START:
      return { clearNofitication: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_FAILED:
      return { notification: action.error };
    case CREATE_NOTIFICATION_LOG_FAILED:
      return { notificationLog: action.error };
    case DELETE_NOTIFICATIONS_FAILED:
      return { clearNofitication: action.error };
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
