import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../SkillActions";
import {
  GET_SKILLS_START,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILED,
  // INVALIDATE_SKILLS
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

describe("skill actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should fetch skills", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: GET_SKILLS_START, filter: "react", prev_selection: "", selection: "" },
      {
        type: GET_SKILLS_SUCCESS,
        count: undefined,
        items: undefined,
        next: undefined,
        prev_selection: "",
        previous: undefined,
        selection: "",
      },
    ];

    await store.dispatch(actions.getSkills("react", "", ""));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch GET_SKILLS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      {
        filter: "",
        prev_selection: undefined,
        selection: undefined,
        type: GET_SKILLS_START,
      },
      {
        error: null,
        prev_selection: undefined,
        selection: undefined,
        type: GET_SKILLS_FAILED,
      },
    ];

    await store.dispatch(actions.getSkills(""));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
