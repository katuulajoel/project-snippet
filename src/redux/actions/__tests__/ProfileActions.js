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

  it("should update auth user settings", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      {
        data: false,
        type: "SET_BUTTON",
      },
    ];

    await actions.updateAuthUser()(store.dispatch);
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update user password", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      {
        data: false,
        type: "SET_BUTTON",
      },
    ];

    await actions.updatePassword()(store.dispatch);
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update user account", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      {
        data: false,
        type: "SET_BUTTON",
      },
    ];

    await actions.updateAccountInfo()(store.dispatch);
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should delete user account", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [];

    await store.dispatch(actions.deactivateAccount());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
