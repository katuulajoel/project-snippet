import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";

import * as TestResultsActions from "../actions/TestResultsActions";

const results = (state = [], action) => {
  let results = state || [];
  switch (action.type) {
    case TestResultsActions.FETCH_RESULT_SUCCESS:
      return [...action.items];
    case TestResultsActions.LIST_MORE_RESULTS_SUCCESS:
      action.items.forEach((result) => {
        results.push(result);
      });
      return { ...state, ...results };
    case TestResultsActions.DELETE_RESULT_SUCCESS: {
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
    case TestResultsActions.CREATE_RESULT_START:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.CREATE_RESULT_SUCCESS:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case TestResultsActions.CREATE_RESULT_FAILED:
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
    case TestResultsActions.CREATE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case TestResultsActions.CREATE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.CREATE_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.UPDATE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case TestResultsActions.UPDATE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.UPDATE_RESULT_FAILED:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.DELETE_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case TestResultsActions.DELETE_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.DELETE_RESULT_FAILED:
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
    case TestResultsActions.FETCH_RESULT_START:
      newState[selectionKey] = true;
      return { ...state, ...newState };
    case TestResultsActions.FETCH_RESULT_SUCCESS:
      newState[selectionKey] = false;
      return { ...state, ...newState };
    case TestResultsActions.FETCH_RESULT_FAILED:
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
    case TestResultsActions.LIST_MORE_RESULTS_SUCCESS:
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
    case TestResultsActions.LIST_MORE_RESULTS_SUCCESS:
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
    case TestResultsActions.FETCH_RESULT_SUCCESS:
      newState[selectionKey] = action.count;
      return { ...state, ...newState };
    case TestResultsActions.LIST_MORE_RESULTS_FAILED:
      newState[selectionKey] = 0;
      return { ...state, ...newState };
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case TestResultsActions.CREATE_RESULT_FAILED:
      return { ...state, create: action.error };
    case TestResultsActions.UPDATE_RESULT_FAILED:
      return { ...state, update: action.error };
    case TestResultsActions.FETCH_RESULT_FAILED:
      return { ...state, fetch: action.error };
    case TestResultsActions.DELETE_RESULT_FAILED:
      return { ...state, delete: action.error };
    case LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
};

const selectedFilters = (state = [], action) => {
  switch (action.type) {
    case TestResultsActions.SET_FILTERS:
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
