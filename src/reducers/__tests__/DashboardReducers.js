import reducer from "../DashboardReducer";
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
} from "../../actions/utils/ActionTypes";

const initialState = {
  isMakingRequest: {},
  errors: {},
  notifications: {
    profile: { cleared: [], required: [], optional: [] },
    projects: [],
    invoices: [],
    events: [],
    reports: [],
    activities: [],
  },
};

describe("Auth reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, { type: FETCH_NOTIFICATIONS_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: FETCH_NOTIFICATIONS_START })).toEqual({
      ...initialState,
      isMakingRequest: { notification: true },
    });
  });

  it("handles failure", () => {
    expect(
      reducer(initialState, {
        type: FETCH_NOTIFICATIONS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { notification: "!error" },
    });
  });
});
