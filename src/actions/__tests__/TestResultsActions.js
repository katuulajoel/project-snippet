import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../TestResultsActions";
import {
  CREATE_RESULT_START,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILED,
  UPDATE_RESULT_START,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILED,
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
  DELETE_RESULT_START,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILED,
  // LIST_MORE_RESULTS_START,
  // LIST_MORE_RESULTS_SUCCESS,
  // LIST_MORE_RESULTS_FAILED,
  // SET_FILTERS,
} from "../utils/ActionTypes";
import { dummyResult } from "../../pages/Dashboard/tests/__tests__/TestForm";
import { dummyResults } from "../../pages/Dashboard/tests/__tests__/Results";

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

  it("should dispatch CREATE_RESULT_SUCCESS", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: dummyResult }));
    const expectedActions = [
      { type: CREATE_RESULT_START, data: dummyResult, selectionKey: "6LMlpGnA" },
      {
        result: dummyResult,
        selectionKey: "6LMlpGnA",
        type: CREATE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.createResult(dummyResult, "6LMlpGnA"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch CREATE_RESULT_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: CREATE_RESULT_START, data: null, selectionKey: "6LMlpGnA" },
      {
        error: null,
        selectionKey: "6LMlpGnA",
        type: CREATE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.createResult(null, "6LMlpGnA"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
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
      { type: FETCH_RESULT_START, selection: "6LMlpGnA" },
      {
        count: 2,
        items: dummyResults,
        next: null,
        previous: null,
        selection: "6LMlpGnA",
        type: FETCH_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.fetchResults("6LMlpGnA", { page_size: 20 }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_RESULT_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_RESULT_START, selection: null },
      {
        error: null,
        selection: undefined,
        type: FETCH_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.fetchResults(null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it("should dispatch UPDATE_RESULT_SUCCESS", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: dummyResult }));
    const expectedActions = [
      { type: UPDATE_RESULT_START, id: 10, result: dummyResult, selectionKey: "6LMlpGnA" },
      {
        id: dummyResult.id,
        result: dummyResult,
        selectionKey: "6LMlpGnA",
        type: UPDATE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.updateResult(dummyResult.id, dummyResult, "6LMlpGnA"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch UPDATE_RESULT_FAILED", async () => {
    const error = {
      message: "Error!",
    };
    axios.patch.mockRejectedValue(error);
    const expectedActions = [
      { type: UPDATE_RESULT_START, id: 10, result: null, selectionKey: "6LMlpGnA" },
      {
        id: dummyResult.id,
        error: null,
        result: null,
        selectionKey: "6LMlpGnA",
        type: UPDATE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.updateResult(dummyResult.id, null, "6LMlpGnA"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it("should dispatch DELETE_RESULT_SUCCESS", async () => {
    axios.delete.mockReturnValue(
      Promise.resolve({
        data: {
          id: 123,
        },
      })
    );
    const expectedActions = [
      { type: DELETE_RESULT_START, id: 123 },
      {
        id: 123,
        type: DELETE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.deleteResult(123));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch DELETE_RESULT_FAILED", async () => {
    const error = {
      message: "Error!",
    };
    axios.delete.mockRejectedValue(error);
    const expectedActions = [
      { type: DELETE_RESULT_START, id: null },
      {
        error: null,
        type: DELETE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.deleteResult(null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
