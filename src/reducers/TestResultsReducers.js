import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";
import {
  CREATE_RESULT_START,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILED,
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
  UPDATE_RESULT_START,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILED,
  LIST_MORE_RESULTS_SUCCESS,
  LIST_MORE_RESULTS_FAILED,
  DELETE_RESULT_START,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILED,
  SET_FILTERS,
} from "../actions/utils/ActionTypes";

const results = (state = [], action) => {
  let results = state || [];
  switch (action.type) {
    case FETCH_RESULT_SUCCESS:
      return [...action.items];
    case LIST_MORE_RESULTS_SUCCESS:
      action.items.forEach((result) => {
        results.push(result);
      });
      return { ...state, ...results };
    case DELETE_RESULT_SUCCESS: {
      const newResults = state.filter((item) => item.id !== action.id);
      return { ...newResults };
    }
    default:
      return state;
  }
};

const isSaved = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case CREATE_RESULT_START:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case CREATE_RESULT_SUCCESS:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case CREATE_RESULT_FAILED:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const isSaving = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case CREATE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case CREATE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case CREATE_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case UPDATE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case UPDATE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case UPDATE_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case DELETE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case DELETE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case DELETE_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const isFetching = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case FETCH_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case FETCH_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case FETCH_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const next = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case LIST_MORE_RESULTS_SUCCESS:
      newState[selectionKey] = action.next;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const previous = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case LIST_MORE_RESULTS_SUCCESS:
      newState[selectionKey] = action.previous;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const count = (state = {}, action) => {
  let selectionKey = action.selection || "default";
  let newState = {};
  switch (action.type) {
    case FETCH_RESULT_SUCCESS:
      newState[selectionKey] = action.count;
      return { ...state, ...newState };
    case LIST_MORE_RESULTS_FAILED:
      newState[selectionKey] = 0;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESULT_FAILED:
      return { ...state, create: action.error };
    case UPDATE_RESULT_FAILED:
      return { ...state, update: action.error };
    case FETCH_RESULT_FAILED:
      return { ...state, fetch: action.error };
    case DELETE_RESULT_FAILED:
      return { ...state, delete: action.error };
    case LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
};

const selectedFilters = (state = [], action) => {
  switch (action.type) {
    case SET_FILTERS:
      return action.filters;
    default:
      return state;
  }
};

const TestResults = combineReducers({
  results,
  isSaved,
  isSaving,
  isFetching,
  next,
  previous,
  count,
  errors,
  selectedFilters,
});

export default TestResults;
