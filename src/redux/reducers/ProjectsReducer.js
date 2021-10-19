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
} from "../../configs/constants/ActionTypes";
import { reducerUpdate } from "../../utils/reducers";

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
    case CREATE_DOCUMENT_SUCCESS:
      return [action.data, ...state];
    case UPDATE_DOCUMENT_SUCCESS:
      return reducerUpdate(state, action);
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
});

export default Projects;
