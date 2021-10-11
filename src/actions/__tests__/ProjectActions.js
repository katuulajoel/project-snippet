import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../ProjectActions";
import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  FETCH_MORE_PROJECTS_START,
  FETCH_MORE_PROJECTS_SUCCESS,
  FETCH_MORE_PROJECTS_FAILED,
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

  it("should fetch project", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: FETCH_PROJECT_START },
      {
        type: FETCH_PROJECT_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.fetchProject(123));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_PROJECT_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_PROJECT_START },
      {
        type: FETCH_PROJECT_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.fetchProject(123));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should fetch projects", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [{ id: 1234 }] }));
    const expectedActions = [
      { type: FETCH_PROJECTS_START },
      {
        type: FETCH_PROJECTS_SUCCESS,
        data: [{ id: 1234 }],
      },
    ];

    await store.dispatch(actions.fetchProjects({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_PROJECTS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_PROJECTS_START },
      {
        type: FETCH_PROJECTS_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.fetchProjects({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should fetch more projects", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [{ id: 1234 }] }));
    const expectedActions = [
      { type: FETCH_MORE_PROJECTS_START },
      {
        type: FETCH_MORE_PROJECTS_SUCCESS,
        data: [{ id: 1234 }],
      },
    ];

    await store.dispatch(actions.fetchMoreProjects({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch FETCH_MORE_PROJECTS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_MORE_PROJECTS_START },
      {
        type: FETCH_MORE_PROJECTS_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.fetchMoreProjects({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
