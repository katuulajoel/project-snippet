import { combineReducers } from "redux";
import * as AuthActions from "../actions/AuthActions";

function user(state = {}, action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.VERIFY_SUCCESS:
      return { ...state, ...action.user };
    case AuthActions.SET_USER_PROFILE:
      return { ...state, ...action.payload };
    case AuthActions.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function isMakingRequest(_, action) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return { login: true };
    case AuthActions.LOGOUT_START:
      return { logout: true };
    case AuthActions.REGISTER_START:
      return { register: true };
    case AuthActions.RESET_PASSWORD_START:
      return { resetPassword: true };
    case AuthActions.RESET_PASSWORD_CONFIRM_START:
      return { confirmPassword: true };
    case AuthActions.VERIFY_START:
      return { verify: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case AuthActions.LOGIN_FAILED:
      return { login: action.error };
    case AuthActions.LOGOUT_FAILED:
      return { logout: action.error };
    case AuthActions.REGISTER_FAILED:
      return { register: action.error };
    case AuthActions.RESET_PASSWORD_FAILED:
      return { resetPassword: action.error };
    case AuthActions.RESET_PASSWORD_CONFIRM_FAILED:
      return { confirmPassword: action.error };
    default:
      return state;
  }
}

const Auth = combineReducers({
  user,
  isMakingRequest,
  errors,
});

export default Auth;
