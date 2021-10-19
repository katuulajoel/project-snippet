import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../ProfileActions";

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
  };
});

describe("Profile actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should retrieve user settings", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      {
        type: "SET_USER_PROFILE",
        data: {
          settings: {},
        },
      },
    ];

    await store.dispatch(actions.getSettings());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update user settings", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      {
        type: "SET_USER_PROFILE",
        data: {
          settings: {},
        },
      },
    ];

    await store.dispatch(actions.updateSettings());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
