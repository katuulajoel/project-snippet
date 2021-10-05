import { combineReducers } from "redux";

import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
} from "../actions/utils/ActionTypes";

function project(state = null, action) {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function projects(state = [], action) {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return action.data;
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
    default:
      return state;
  }
}

const Projects = combineReducers({
  project,
  projects,
  isMakingRequest,
  errors,
});

export default Projects;
