import reducer from "../AuthReducers";
import * as actions from "../../actions/AuthActions";

const initialState = {
  isMakingRequest: {},
  errors: {},
  user: {},
};

describe("Auth reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles login request", () => {
    expect(
      reducer(initialState, {
        type: actions.LOGIN_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { login: true },
    });
  });

  it("handles register request", () => {
    expect(reducer(initialState, { type: actions.REGISTER_START })).toEqual({
      ...initialState,
      isMakingRequest: { register: true },
    });
  });

  it("handles logout request", () => {
    expect(reducer(initialState, { type: actions.LOGOUT_START })).toEqual({
      ...initialState,
      isMakingRequest: { logout: true },
    });
  });

  it("handles verify user", () => {
    expect(reducer(initialState, { type: "@@INIT" })).toEqual({
      ...initialState,
      isMakingRequest: { verify: true },
    });
  });

  it("handles reset password", () => {
    expect(
      reducer(initialState, { type: actions.RESET_PASSWORD_START })
    ).toEqual({
      ...initialState,
      isMakingRequest: { resetPassword: true },
    });
  });

  it("handles confirm password", () => {
    expect(
      reducer(initialState, { type: actions.RESET_PASSWORD_CONFIRM_START })
    ).toEqual({
      ...initialState,
      isMakingRequest: { confirmPassword: true },
    });
  });

  it("handles logout failure", () => {
    expect(
      reducer(initialState, { type: actions.LOGOUT_FAILED, error: "!error" })
    ).toEqual({
      ...initialState,
      errors: { logout: "!error" },
    });
  });

  it("handles login failure", () => {
    expect(
      reducer(initialState, { type: actions.LOGIN_FAILED, error: "!error" })
    ).toEqual({
      ...initialState,
      errors: { login: "!error" },
    });
  });

  it("handles register failure", () => {
    expect(
      reducer(initialState, { type: actions.REGISTER_FAILED, error: "!error" })
    ).toEqual({
      ...initialState,
      errors: { register: "!error" },
    });
  });

  it("handles confirm password failure", () => {
    expect(
      reducer(initialState, {
        type: actions.RESET_PASSWORD_CONFIRM_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { confirmPassword: "!error" },
    });
  });

  it("handles reset password failure", () => {
    expect(
      reducer(initialState, {
        type: actions.RESET_PASSWORD_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { resetPassword: "!error" },
    });
  });

  it("handles login/verify/register/logout successfully", () => {
    const user = { uid: 123456, email: "katuula@gmail.com" };
    expect(
      reducer(initialState, { type: actions.LOGIN_SUCCESS, user })
    ).toEqual({
      ...initialState,
      user,
    });
    expect(
      reducer(initialState, { type: actions.VERIFY_SUCCESS, user })
    ).toEqual({
      ...initialState,
      user,
    });
    expect(
      reducer(initialState, { type: actions.REGISTER_SUCCESS, user })
    ).toEqual({
      ...initialState,
    });
    expect(reducer(initialState, { type: actions.LOGOUT_SUCCESS })).toEqual({
      ...initialState,
    });
  });
});
