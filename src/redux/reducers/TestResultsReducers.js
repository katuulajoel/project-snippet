import { combineReducers } from "redux";
import {
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
} from "../../configs/constants/ActionTypes";

export const defaultState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

const data = (state = defaultState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_RESULT_SUCCESS:
      return {
        ...state,
        ...data,
      };
    case FETCH_RESULT_FAILED:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};

const isMakingRequest = (state = false, action) => {
  switch (action.type) {
    case FETCH_RESULT_START:
      return true;
    case FETCH_RESULT_SUCCESS:
      return false;
    case FETCH_RESULT_FAILED:
      return false;
    default:
      return state;
  }
};

const TestResults = combineReducers({
  data,
  isMakingRequest,
});

export default TestResults;
