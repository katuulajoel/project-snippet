import reducer from "../ProjectsReducer";
import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
} from "../../actions/utils/ActionTypes";

const initialState = {
  isMakingRequest: {},
  errors: {},
  project: null,
  projects: [],
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
      project: {},
    });
    expect(
      reducer(initialState, {
        type: FETCH_PROJECTS_SUCCESS,
        data: [{ id: 123 }],
      })
    ).toEqual({
      ...initialState,
      projects: [{ id: 123 }],
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: FETCH_PROJECT_START })).toEqual({
      ...initialState,
      isMakingRequest: { fetch: true },
    });
    expect(reducer(initialState, { type: FETCH_PROJECTS_START })).toEqual({
      ...initialState,
      isMakingRequest: { list: true },
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
    expect(
      reducer(initialState, {
        type: FETCH_PROJECTS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { list: "!error" },
    });
  });
});
