import reducer, { defaultState } from "../TestResultsReducers";
import {
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
} from "../../../configs/constants/ActionTypes";
import { dummyResults } from "../../../pages/Dashboard/tests/__tests__/Results";

const initialState = {
  isMakingRequest: false,
  data: defaultState,
};

describe("Test reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles FETCH_RESULT_START dispatches", () => {
    expect(reducer(initialState, { type: FETCH_RESULT_START })).toEqual({
      ...initialState,
      isMakingRequest: true,
    });
  });

  it("handles FETCH_RESULT_SUCCESS dispatches", () => {
    expect(
      reducer(initialState, { type: FETCH_RESULT_SUCCESS, items: dummyResults })
    ).toEqual({
      ...initialState,
      isMakingRequest: false,
      // data: {
      //   count: dummyResults.length,
      //   results: dummyResults,
      // },
    });
  });

  it("handles FETCH_RESULT_FAILED dispatches", () => {
    expect(reducer(initialState, { type: FETCH_RESULT_FAILED })).toEqual({
      ...initialState,
      isMakingRequest: false,
    });
  });
});
