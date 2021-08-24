import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../DashboardActions";
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
} from "../utils/ActionTypes";

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
