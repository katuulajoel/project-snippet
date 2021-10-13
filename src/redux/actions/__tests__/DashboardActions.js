import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../DashboardActions";
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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
});

describe("Invoice actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should fetch notifications", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: FETCH_NOTIFICATIONS_START },
      {
        type: FETCH_NOTIFICATIONS_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.getNotifications());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should create notifications log", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: CREATE_NOTIFICATION_LOG_START },
      {
        type: CREATE_NOTIFICATION_LOG_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.createNotificationLog());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should clear notifications", async () => {
    axios.delete.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      { type: DELETE_NOTIFICATIONS_START },
      {
        type: DELETE_NOTIFICATIONS_SUCCESS,
        data: {},
      },
    ];

    await store.dispatch(actions.clearNotification());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch CREATE_NOTIFICATION_LOG_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: CREATE_NOTIFICATION_LOG_START },
      {
        type: CREATE_NOTIFICATION_LOG_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.createNotificationLog());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch DELETE_NOTIFICATIONS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.delete.mockRejectedValue(error);

    const expectedActions = [
      { type: DELETE_NOTIFICATIONS_START },
      {
        type: DELETE_NOTIFICATIONS_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.clearNotification());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_NOTIFICATIONS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_NOTIFICATIONS_START },
      {
        type: FETCH_NOTIFICATIONS_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.getNotifications());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
