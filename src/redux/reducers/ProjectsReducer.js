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
} from "../../configs/constants/ActionTypes";

function projectPMFilter(state = false, action) {
  switch (action.type) {
    case TOGGLE_PROJECT_FILTER:
      return action.data;
    default:
      return state;
  }
}

function project(state = null, action) {
  switch (action.type) {
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
});

export default Projects;
