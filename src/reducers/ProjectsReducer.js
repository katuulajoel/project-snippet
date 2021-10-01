import { combineReducers } from "redux";

import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
} from "../actions/utils/ActionTypes";

const initState = {
  project: {},
};

function project(state = null, action) {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return { ...initState, project: action.data };
    default:
      return state;
  }
}

function isMakingRequest(_, action) {
  switch (action.type) {
    case FETCH_PROJECT_START:
      return { fetch: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT_FAILED:
      return { fetch: action.error };
    default:
      return state;
  }
}

const Projects = combineReducers({
  project,
  isMakingRequest,
  errors,
});

export default Projects;
