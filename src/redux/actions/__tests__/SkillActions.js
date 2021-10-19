import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../SkillActions";
import {
  GET_SKILLS_START,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILED,
  INVALIDATE_SKILLS,
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

export const dummySkills = [
  {
    id: 5,
    name: "css",
    primary: true,
    slug: "css",
    type: "language",
  },
  {
    id: 4,
    name: "tailwindcss",
    primary: true,
    slug: "tailwindcss",
    type: "language",
  },
];

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

  it("should dispatch GET_SKILLS_SUCCESS", async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: dummySkills,
        },
      })
    );
    const expectedActions = [
      {
        type: GET_SKILLS_START,
        filter: { search: "css", type: undefined },
        prev_selection: null,
        selection: "6LMlpGnA",
      },
      {
        type: GET_SKILLS_SUCCESS,
        count: 2,
        items: dummySkills,
        next: null,
        prev_selection: null,
        previous: null,
        selection: "6LMlpGnA",
      },
    ];

    await store.dispatch(
      actions.getSkills({ search: "css", type: undefined }, "6LMlpGnA", null)
    );
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
        type: GET_SKILLS_START,
        prev_selection: undefined,
        selection: undefined,
      },
      {
        error: null,
        prev_selection: undefined,
        selection: undefined,
        type: GET_SKILLS_FAILED,
      },
    ];

    await store.dispatch(actions.getSkills());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch INVALIDATE_SKILLS", async () => {
    const expectedActions = [
      {
        type: INVALIDATE_SKILLS,
      },
    ];

    await store.dispatch(actions.invalidateSkills());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
