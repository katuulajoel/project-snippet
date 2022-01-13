import { combineReducers } from "redux";

import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  TOGGLE_PROJECT_FILTER,
  FETCH_MORE_PROJECTS_START,
  FETCH_MORE_PROJECTS_SUCCESS,
  FETCH_MORE_PROJECTS_FAILED,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,
  CREATE_PROGRESS_EVENT_START,
  CREATE_PROGRESS_EVENT_SUCCESS,
  CREATE_PROGRESS_EVENT_FAILED,
  UPDATE_PROGRESS_EVENT_START,
  UPDATE_PROGRESS_EVENT_SUCCESS,
  UPDATE_PROGRESS_EVENT_FAILED,
  UPDATE_DOCUMENT_START,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILED,
  CREATE_DOCUMENT_START,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILED,
  DELETE_DOCUMENT_SUCCESS,
  LIST_TIMESHEETS_SUCCESS,
  LIST_TIMESHEETS_FAILED,
  LIST_TIMESHEETS_START,
  CREATE_TIMESHEET_START,
  // CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_FAILED,
  LIST_ACTIVITIES_START,
  LIST_ACTIVITIES_SUCCESS,
  LIST_ACTIVITIES_FAILED,
  LIST_MORE_ACTIVITIES_START,
  LIST_MORE_ACTIVITIES_SUCCESS,
  LIST_MORE_ACTIVITIES_FAILED,
} from "../../configs/constants/ActionTypes";
import { reducerUpdate } from "../../utils/reducers";

function activities(
  state = { data: [], next: null, previous: null, count: 0 },
  action
) {
  switch (action.type) {
    case LIST_ACTIVITIES_SUCCESS:
      return {
        data: action.data.results,
        next: action.data.next,
        previous: action.data.previous,
        count: action.data.count,
      };
    case LIST_MORE_ACTIVITIES_SUCCESS:
      return {
        data: [...state.data, ...action.data.results],
        next: action.data.next,
        previous: action.data.previous,
        count: action.data.count,
      };
    default:
      return state;
  }
}

function projectPMFilter(state = false, action) {
  switch (action.type) {
    case TOGGLE_PROJECT_FILTER:
      return action.data;
    default:
      return state;
  }
}

function documents(state = [], action) {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return [...(action.data?.documents || [])];
    case CREATE_DOCUMENT_SUCCESS:
      return [action.data, ...state];
    case UPDATE_DOCUMENT_SUCCESS:
      return reducerUpdate(state, action);
    case DELETE_DOCUMENT_SUCCESS:
      return [...state.filter((item) => item.id !== action.data)];
    default:
      return state;
  }
}

function timesheets(state = { results: [] }, action) {
  switch (action.type) {
    case LIST_TIMESHEETS_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function progressEvents(state = [], action) {
  switch (action.type) {
    case CREATE_PROGRESS_EVENT_SUCCESS:
      return [action.data, ...state];
    case UPDATE_PROGRESS_EVENT_SUCCESS:
      return reducerUpdate(state, action);
    default:
      return state;
  }
}

function project(state = null, action) {
  switch (action.type) {
    case UPDATE_PROJECT_SUCCESS:
      return reducerUpdate(state, action);
    case FETCH_PROJECT_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function projects(state = { results: [], next: null }, action) {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return action.data;
    case FETCH_MORE_PROJECTS_SUCCESS:
      return {
        ...action.data,
        results: [...state.results, ...action.data.results],
      };
    default:
      return state;
  }
}

function isMakingRequest(_, action) {
  switch (action.type) {
    case FETCH_PROJECT_START:
      return { fetch: true };
    case FETCH_PROJECTS_START:
      return { list: true };
    case FETCH_MORE_PROJECTS_START:
      return { fetchMore: true };
    case UPDATE_PROJECT_START:
      return { update: true };
    case CREATE_PROGRESS_EVENT_START:
      return { createEvent: true };
    case UPDATE_PROGRESS_EVENT_START:
      return { updateEvent: true };
    case UPDATE_DOCUMENT_START:
      return { updateDocument: true };
    case CREATE_DOCUMENT_START:
      return { createDocument: true };
    case LIST_TIMESHEETS_START:
      return { listTimeSheets: true };
    case CREATE_TIMESHEET_START:
      return { createTimeSheet: true };
    case LIST_ACTIVITIES_START:
      return { listActivities: true };
    case LIST_MORE_ACTIVITIES_START:
      return { listMoreActivities: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT_FAILED:
      return { fetch: action.error };
    case FETCH_PROJECTS_FAILED:
      return { list: action.error };
    case FETCH_MORE_PROJECTS_FAILED:
      return { fetchMore: action.error };
    case UPDATE_PROJECT_FAILED:
      return { update: action.error };
    case CREATE_PROGRESS_EVENT_FAILED:
      return { createEvent: action.error };
    case UPDATE_PROGRESS_EVENT_FAILED:
      return { updateEvent: action.error };
    case UPDATE_DOCUMENT_FAILED:
      return { updateDocument: action.error };
    case CREATE_DOCUMENT_FAILED:
      return { createDocument: action.error };
    case LIST_TIMESHEETS_FAILED:
      return { listTimeSheets: action.error };
    case CREATE_TIMESHEET_FAILED:
      return { createTimeSheet: action.error };
    case LIST_ACTIVITIES_FAILED:
      return { listActivities: action.error };
    case LIST_MORE_ACTIVITIES_FAILED:
      return { listMoreActivities: action.error };
    default:
      return state;
  }
}

const Projects = combineReducers({
  projectPMFilter,
  project,
  projects,
  isMakingRequest,
  errors,
  progressEvents,
  documents,
  timesheets,
  activities,
});

export default Projects;
