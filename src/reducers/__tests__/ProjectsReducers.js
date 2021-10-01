import reducer from "../ProjectsReducer";
import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
} from "../../actions/utils/ActionTypes";

const initialState = {
  isMakingRequest: {},
  errors: {},
  project: null,
};

describe("Auth reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, { type: FETCH_PROJECT_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
      project: {
        project: {},
      },
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: FETCH_PROJECT_START })).toEqual({
      ...initialState,
      isMakingRequest: { fetch: true },
    });
  });

  it("handles failure", () => {
    expect(
      reducer(initialState, {
        type: FETCH_PROJECT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { fetch: "!error" },
    });
  });
});
