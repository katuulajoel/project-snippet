import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../AuthActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const username = "test@test.com";
const password = "password";

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
  };
});

describe("Authencation actions tests", () => {
  const data = { user: { id: 1, name: "John Smith" } };

  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("creates LOGIN_START and LOGIN_SUCCESS when login is successful", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: data }));
    const expectedActions = [
      { type: actions.LOGIN_START, credentials: { username, password } },
      {
        type: actions.LOGIN_SUCCESS,
        ...data,
      },
    ];

    await store.dispatch(
      actions.authenticate({
        username,
        password,
      })
    );
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("creates LOGIN_START and LOGIN_FAILED when login has failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      {
        type: actions.LOGIN_START,
        credentials: { username, password },
      },
      {
        type: actions.LOGIN_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(
      actions.authenticate({
        username,
        password,
      })
    );

    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should verify user correctly", async () => {
    axios.get.mockReturnValue(Promise.resolve({}));
    const expectedActions = [{ type: actions.VERIFY_START }];

    await store.dispatch(actions.verify());
    const storeActions = store.getActions();
    expect(storeActions[0]).toEqual(expectedActions[0]);
  });

  it("should logout user correctly", async () => {
    axios.post.mockReturnValue(Promise.resolve({}));
    const expectedActions = [
      { type: actions.LOGOUT_START },
      { type: actions.LOGOUT_SUCCESS },
    ];

    await store.dispatch(actions.logout());
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("creates LOGOUT_FAILED when logout has failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockReturnValue(Promise.reject(error));

    const expectedActions = [
      { type: actions.LOGOUT_START },
      {
        type: actions.LOGOUT_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.logout());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should register user correctly", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: data }));
    const expectedActions = [
      { type: actions.REGISTER_START, details: { name: "" } },
      { type: actions.REGISTER_SUCCESS, user: data.user },
    ];

    await store.dispatch(actions.register({ name: "" }));
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("creates REGISTER_FAILED when register has failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockReturnValue(Promise.reject(error));

    const expectedActions = [
      { type: actions.REGISTER_START, details: { name: "" } },
      {
        type: actions.REGISTER_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.register({ name: "" }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should reset user password correctly", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: "success" }));
    const expectedActions = [
      { type: actions.RESET_PASSWORD_START, email: "test@email.com" },
      { type: actions.RESET_PASSWORD_SUCCESS, response: "success" },
    ];

    await store.dispatch(actions.resetPassword("test@email.com"));
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("creates RESET_PASSWORD_FAILED when reset password has failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockReturnValue(Promise.reject(error));

    const expectedActions = [
      { type: actions.RESET_PASSWORD_START, email: "test@email.com" },
      {
        type: actions.RESET_PASSWORD_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.resetPassword("test@email.com"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should confirm reset password correctly", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: "success" }));
    const expectedActions = [
      {
        type: actions.RESET_PASSWORD_CONFIRM_START,
        credentials: { password: 123456 },
      },
      { type: actions.RESET_PASSWORD_CONFIRM_SUCCESS, response: "success" },
    ];

    await store.dispatch(actions.resetPasswordConfirm({ password: 123456 }));
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("creates RESET_PASSWORD_CONFIRM_FAILED when reset password confirmation has failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockReturnValue(Promise.reject(error));

    const expectedActions = [
      {
        type: actions.RESET_PASSWORD_CONFIRM_START,
        credentials: { password: 123456 },
      },
      {
        type: actions.RESET_PASSWORD_CONFIRM_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.resetPasswordConfirm({ password: 123456 }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should redirect correctly", () => {
    const expectedActions = [
      {
        type: actions.AUTH_REDIRECT,
        path: "/path",
      },
    ];

    store.dispatch(actions.authRedirect("/path"));
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
