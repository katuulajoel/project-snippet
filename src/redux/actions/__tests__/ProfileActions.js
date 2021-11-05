import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../ProfileActions";
import { SET_USER_SETTINGS } from "../../../configs/constants/ActionTypes";

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
        type: SET_USER_SETTINGS,
        data: {},
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
        type: SET_USER_SETTINGS,
        data: {},
      },
    ];

    await store.dispatch(actions.updateSettings());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update auth user settings", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [];

    await store.dispatch(actions.updateAuthUser());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update user password", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [];

    await store.dispatch(actions.updatePassword());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should update user account", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [];

    await store.dispatch(actions.updateAccountInfo());
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
