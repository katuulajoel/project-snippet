import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../TestResultsActions";
import {
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
} from "../../../configs/constants/ActionTypes";
import { dummyResults } from "../../../pages/Dashboard/tests/__tests__/Results";

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
    post: jest.fn().mockImplementation(() => Promise.resolve()),
    get: jest.fn(),
    patch: jest.fn().mockImplementation(() => Promise.resolve()),
    delete: jest.fn(),
  };
});

describe("test actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should dispatch FETCH_RESULT_SUCCESS", async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: dummyResults,
        },
      })
    );
    const expectedActions = [
      { type: FETCH_RESULT_START },
      {
        data: {
          count: 2,
          results: dummyResults,
          next: null,
          previous: null,
        },
        type: FETCH_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.fetchResults({ page_size: 20 }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_RESULT_FAILED with error", async () => {
    const error = {
      message: "Could not fetch results",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_RESULT_START },
      {
        error: "Could not fetch results",
        type: FETCH_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.fetchResults(null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
