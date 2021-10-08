import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../UtilityActions";
import { TOGGLE_RIGHT_NAV } from "../utils/ActionTypes";

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

describe("Utility actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should dispatch TOGGLE_RIGHT_NAV", async () => {
    const expectedActions = [
      {
        type: TOGGLE_RIGHT_NAV,
        collapsed: true,
        contentType: "nav",
      },
    ];

    await store.dispatch(actions.toggleRightNav(true, "nav"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
