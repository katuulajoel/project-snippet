import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
jest.mock("axios");
import axios from "axios";

import * as actions from "../AuthActions";
import { ENDPOINT_LOGIN } from "../utils/api";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Authencation actions tests", () => {
  const username = "test@test.com";
  const password = "password";
  const data = { username, uid: "123456" };
  const store = mockStore({ Auth: {} });

  afterEach(() => {
    store.clearActions();
  });

  describe("Login Successful", () => {
    beforeEach(() => {
      axios.post.mockImplementation(() => Promise.resolve(data));
    });

    it("should call endpoint with given email & password", async () => {
      await store.dispatch(
        actions.authenticate({
          username,
          password,
        })
      );
      expect(axios.post).toBeCalledWith(ENDPOINT_LOGIN, { username, password });
    });

    it("creates LOGIN_START and LOGIN_SUCCESS when login is successful", async () => {
      const expectedActions = [
        { type: actions.LOGIN_START, credentials: { username, password } },
        {
          type: actions.LOGIN_SUCCESS,
          user: { username, uid: "123456" },
        },
      ];

      await store
        .dispatch(
          actions.authenticate({
            username,
            password,
          })
        )
        .then(() => {
          const storeActions = store.getActions();
          expect(storeActions).toEqual(expectedActions);
        });
    });
  });

  describe("Login failed", () => {
    beforeEach(() => {
      axios.post.mockImplementation(() =>
        Promise.reject(
          new Error({
            non_field_errors: ["Unable to log in with provided credentials."],
          })
        )
      );
    });

    it("creates LOGIN_START and LOGIN_FAILED when login has failed", async () => {
      const expectedActions = [
        {
          type: actions.LOGIN_START,
          credentials: { username: "joel@tunga.io", password: "123" },
        },
        {
          type: actions.LOGIN_FAILED,
          error: {
            non_field_errors: ["Unable to log in with provided credentials."],
          },
        },
      ];
      const store = mockStore({ Auth: {} });

      await store.dispatch(
        actions.authenticate({
          username: "joel@tunga.io",
          password: "123",
        })
      );

      const storeActions = store.getActions();
      expect(storeActions).toEqual(expectedActions);
    });
  });
});
