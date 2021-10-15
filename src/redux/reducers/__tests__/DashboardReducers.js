import reducer from "../DashboardReducer";
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  CREATE_NOTIFICATION_LOG_SUCCESS,
  CREATE_NOTIFICATION_LOG_FAILED,
  CREATE_NOTIFICATION_LOG_START,
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILED,
} from "../../../configs/constants/ActionTypes";

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
    expect(
      reducer(initialState, { type: DELETE_NOTIFICATIONS_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
    });
    expect(
      reducer(initialState, {
        type: CREATE_NOTIFICATION_LOG_SUCCESS,
        data: { type: "profile", notification_id: "completed" },
      })
    ).toEqual({
      ...initialState,
      notifications: {
        ...initialState.notifications,
        profile: {
          cleared: ["completed"],
          required: [],
          optional: [],
        },
      },
    });
    expect(
      reducer(
        {
          ...initialState,
          notifications: {
            ...initialState.notifications,
            activities: [{ id: 12 }],
          },
        },
        {
          type: CREATE_NOTIFICATION_LOG_SUCCESS,
          data: { type: "activity", notification_id: "12" },
        }
      )
    ).toEqual({
      ...initialState,
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: FETCH_NOTIFICATIONS_START })).toEqual({
      ...initialState,
      isMakingRequest: { notification: true },
    });
    expect(
      reducer(initialState, { type: CREATE_NOTIFICATION_LOG_START })
    ).toEqual({
      ...initialState,
      isMakingRequest: { notificationLog: true },
    });
    expect(reducer(initialState, { type: DELETE_NOTIFICATIONS_START })).toEqual(
      {
        ...initialState,
        isMakingRequest: { clearNofitication: true },
      }
    );
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
    expect(
      reducer(initialState, {
        type: CREATE_NOTIFICATION_LOG_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { notificationLog: "!error" },
    });
    expect(
      reducer(initialState, {
        type: DELETE_NOTIFICATIONS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { clearNofitication: "!error" },
    });
  });
});
