/* eslint-disable no-unused-vars */
import axios from "axios";

import {
  ENDPOINT_LOGIN,
  ENDPOINT_LOGOUT,
  ENDPOINT_VERIFY,
  ENDPOINT_REGISTER,
  ENDPOINT_RESET_PASSWORD,
  ENDPOINT_RESET_PASSWORD_CONFIRM,
} from "./utils/api";

import {
  sendGAEvent,
  sendTwitterSignUpEvent,
  GA_EVENT_CATEGORIES,
  GA_EVENT_ACTIONS,
  AUTH_METHODS,
  getGAUserType,
  getUserTypeTwitter,
} from "./utils/tracking";

/* import getUser from "../components/utils/auth"; */
const getUser = "lll";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const VERIFY_START = "VERIFY_START";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILED = "VERIFY_FAILED";
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_CONFIRM_START = "RESET_PASSWORD_CONFIRM_START";
export const RESET_PASSWORD_CONFIRM_SUCCESS = "RESET_PASSWORD_CONFIRM_SUCCESS";
export const RESET_PASSWORD_CONFIRM_FAILED = "RESET_PASSWORD_CONFIRM_FAILED";
export const AUTH_REDIRECT = "AUTH_REDIRECT";

const arr = [
  "Good to see you back!",
  "How are you doing today?",
  "Great to have you here!",
  "What’s cooking, chef?",
  "We’ve missed you!",
  "Have a great day!",
  "Hello, world!",
  "Press Any Key to Continue…",
  "Have you tried restarting?",
  "You light my Fire(wall)",
];

export function authenticate(credentials) {
  return (dispatch) => {
    dispatch(authStart(credentials));
    return axios
      .post(ENDPOINT_LOGIN, credentials)
      .then(function (response) {
        dispatch(authSuccess(response.data));
        return response.data;
      })
      .catch(function (error) {
        dispatch(authFailed(error.response ? error.response.data : null));
      });
  };
}

export function authStart(credentials) {
  return {
    type: LOGIN_START,
    credentials,
  };
}

export function authSuccess(data) {
  let index = Math.floor(Math.random() * arr.length);
  let user = Object.assign({}, data.user, { welcomeMessage: arr[index] });
  window.localStorage.setItem("welcomeMsg", arr[index]);

  sendGAEvent(
    GA_EVENT_CATEGORIES.AUTH,
    GA_EVENT_ACTIONS.SIGN_IN,
    getGAUserType(user)
  );
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function authFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function verify() {
  return (dispatch) => {
    dispatch(verifyStart());
    axios
      .get(ENDPOINT_VERIFY)
      .then(function (response) {
        dispatch(verifySuccess(response.data));
      })
      .catch(function () {
        //...
      });
  };
}

export function verifyStart() {
  return {
    type: VERIFY_START,
  };
}

export function verifySuccess(data) {
  let user = Object.assign({}, data, {
    welcomeMessage: window.localStorage.getItem("welcomeMsg"),
  });
  return {
    type: VERIFY_SUCCESS,
    user,
  };
}

export function verifyFailed(error) {
  return {
    type: VERIFY_FAILED,
    error,
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(logoutStart());
    axios
      .post(ENDPOINT_LOGOUT, {})
      .then(function () {
        dispatch(logoutSuccess());
      })
      .catch(function (error) {
        dispatch(logoutFailed(error.response ? error.response.data : null));
      });
  };
}

export function logoutStart() {
  return {
    type: LOGOUT_START,
  };
}

export function logoutSuccess() {
  window.localStorage.removeItem("welcomeMsg");
  sendGAEvent(
    GA_EVENT_CATEGORIES.AUTH,
    GA_EVENT_ACTIONS.LOG_OUT,
    getGAUserType(getUser())
  );
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailed(error) {
  return {
    type: LOGOUT_FAILED,
    error,
  };
}

export function register(details) {
  return (dispatch) => {
    dispatch(registerStart(details));
    axios
      .post(ENDPOINT_REGISTER, details)
      .then(function (response) {
        dispatch(registerSuccess(response.data));

        let user_type = getUserTypeTwitter(details.type),
          method = AUTH_METHODS.EMAIL;
        sendTwitterSignUpEvent({ user_type, method });
      })
      .catch(function (error) {
        dispatch(registerFailed(error.response ? error.response.data : null));
      });
  };
}

export function registerStart(details) {
  return {
    type: REGISTER_START,
    details,
  };
}

export function registerSuccess(data) {
  let user = data.user;
  sendGAEvent(
    GA_EVENT_CATEGORIES.REGISTRATION,
    GA_EVENT_ACTIONS.SIGN_UP,
    getGAUserType(user)
  );
  return {
    type: REGISTER_SUCCESS,
    user,
  };
}

export function registerFailed(error) {
  return {
    type: REGISTER_FAILED,
    error,
  };
}

export function resetPassword(email) {
  return (dispatch) => {
    dispatch(resetPasswordStart(email));
    axios
      .post(ENDPOINT_RESET_PASSWORD, email)
      .then(function (response) {
        dispatch(resetPasswordSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          resetPasswordFailed(error.response ? error.response.data : null)
        );
      });
  };
}

export function resetPasswordStart(email) {
  return {
    type: RESET_PASSWORD_START,
    email,
  };
}

export function resetPasswordSuccess(response) {
  sendGAEvent(GA_EVENT_CATEGORIES.AUTH, GA_EVENT_ACTIONS.RECOVER_PASSWORD);
  return {
    type: RESET_PASSWORD_SUCCESS,
    response,
  };
}

export function resetPasswordFailed(error) {
  return {
    type: RESET_PASSWORD_FAILED,
    error,
  };
}

export function resetPasswordConfirm(credentials) {
  return (dispatch) => {
    dispatch(resetPasswordConfirmStart(credentials));
    axios
      .post(ENDPOINT_RESET_PASSWORD_CONFIRM, credentials)
      .then(function (response) {
        dispatch(resetPasswordConfirmSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(
          resetPasswordConfirmFailed(
            error.response ? error.response.data : null
          )
        );
      });
  };
}

export function resetPasswordConfirmStart(credentials) {
  return {
    type: RESET_PASSWORD_CONFIRM_START,
    credentials,
  };
}

export function resetPasswordConfirmSuccess(response) {
  sendGAEvent(
    GA_EVENT_CATEGORIES.AUTH,
    GA_EVENT_ACTIONS.RECOVER_PASSWORD_CONFIRM
  );
  return {
    type: RESET_PASSWORD_CONFIRM_SUCCESS,
    response,
  };
}

export function resetPasswordConfirmFailed(error) {
  return {
    type: RESET_PASSWORD_CONFIRM_FAILED,
    error,
  };
}

export function authRedirect(path) {
  return {
    type: AUTH_REDIRECT,
    path,
  };
}
