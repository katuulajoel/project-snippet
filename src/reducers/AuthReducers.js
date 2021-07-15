import { combineReducers } from "redux";
import * as AuthActions from "../actions/AuthActions";

const defaultUser = {
  profile: {},
  company: {},
  settings: { visibility: {}, switches: {} },
};

function user(state = defaultUser, action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return reduceUser(state, action.user);
    case AuthActions.VERIFY_SUCCESS: {
      let user = action.user;
      return reduceUser(state, user);
    }
    case AuthActions.LOGOUT_SUCCESS:
      return defaultUser;
    default:
      return state;
  }
}

const defaultAuthenticating = {
  isLoginFail: false,
  loginError: null,
  isLoginStart: false,
  loginCredentials: null,
};

export function isAuthenticating(state = defaultAuthenticating, action) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        loginCredentials: action.credentials,
        isLoginStart: action.credentials ? true : false,
      };
    case AuthActions.LOGOUT_START:
      return true;
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.LOGOUT_SUCCESS:
    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.error,
        isLoginFail: action.error ? true : false,
        isLoginStart: false,
      };
    case AuthActions.LOGOUT_FAILED:
      return false;
    default:
      return state;
  }
}

function isVerifying(state = false, action) {
  switch (action.type) {
    case AuthActions.VERIFY_START:
      return true;
    case AuthActions.VERIFY_SUCCESS:
    case AuthActions.VERIFY_FAILED:
      return false;
    default:
      return state;
  }
}

function isAuthenticated(state = false, action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.VERIFY_SUCCESS:
      return true;
    case AuthActions.LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
}

function isRegistering(state = false, action) {
  switch (action.type) {
    case AuthActions.REGISTER_START:
      return true;
    case AuthActions.REGISTER_SUCCESS:
    case AuthActions.REGISTER_FAILED:
      return false;
    default:
      return state;
  }
}

function isRegistered(state = false, action) {
  switch (action.type) {
    case AuthActions.REGISTER_SUCCESS:
      return true;
    case AuthActions.REGISTER_START:
    case AuthActions.REGISTER_FAILED:
      return false;
    default:
      return state;
  }
}

function isResetting(state = false, action) {
  switch (action.type) {
    case AuthActions.RESET_PASSWORD_START:
      return true;
    case AuthActions.RESET_PASSWORD_SUCCESS:
    case AuthActions.RESET_PASSWORD_FAILED:
      return false;
    default:
      return state;
  }
}

function isReset(state = false, action) {
  switch (action.type) {
    case AuthActions.RESET_PASSWORD_SUCCESS:
    case AuthActions.RESET_PASSWORD_CONFIRM_SUCCESS:
      return true;
    case AuthActions.RESET_PASSWORD_START:
    case AuthActions.RESET_PASSWORD_FAILED:
    case AuthActions.RESET_PASSWORD_CONFIRM_START:
    case AuthActions.RESET_PASSWORD_CONFIRM_FAILED:
      return false;
    default:
      return state;
  }
}

function error(state = {}, action) {
  switch (action.type) {
    case AuthActions.LOGIN_FAILED:
      var error = action.error;
      if (
        error &&
        error.non_field_errors === "Unable to log in with provided credentials."
      ) {
        error.non_field_errors = "Wrong username or password";
      }
      return { ...state, auth: error };
    case AuthActions.LOGIN_START:
    case AuthActions.LOGIN_SUCCESS:
      return { ...state, auth: null };
    case AuthActions.REGISTER_FAILED:
      return { ...state, register: action.error };
    case AuthActions.REGISTER_START:
    case AuthActions.REGISTER_SUCCESS:
      return { ...state, register: null };
    case AuthActions.RESET_PASSWORD_FAILED:
      return { ...state, reset: action.error };
    case AuthActions.RESET_PASSWORD_START:
    case AuthActions.RESET_PASSWORD_SUCCESS:
      return { ...state, reset: null };
    case AuthActions.RESET_PASSWORD_CONFIRM_FAILED:
      return { ...state, reset_confirm: action.error };
    case AuthActions.RESET_PASSWORD_CONFIRM_START:
    case AuthActions.RESET_PASSWORD_CONFIRM_SUCCESS:
      return { ...state, reset_confirm: null };
    default:
      return state;
  }
}

function next(state = null, action) {
  switch (action.type) {
    case AuthActions.AUTH_REDIRECT:
      return action.path;
    case AuthActions.LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}
function reduceUser(state, user, profile, company) {
  state = state || {};
  user = user || {};
  profile = { ...state.profile, ...user.profile, ...profile };
  company = { ...state.company, ...user.company, ...company };
  [
    ["name", "company"],
    ["bio", "company_bio"],
    ["website", "website"],
    ["vat_number", "vat_number"],
    ["reg_no", "company_reg_no"],
    ["ref_no", "reference_number"],
    ["skills", "skills"],
    ["country", "country"],
    ["city", "city"],
    ["street", "street"],
    ["plot_number", "plot_number"],
    ["postal_code", "postal_code"],
    ["postal_address", "postal_address"],
    ["tel_number", "phone_number"],
  ].forEach((item) => {
    let companyField = item[0],
      profileField = item[1];
    company[companyField] = company[companyField] || profile[profileField];
  });
  return { ...state, ...user, profile, company };
}

const Auth = combineReducers({
  user,
  isAuthenticating,
  isVerifying,
  isAuthenticated,
  isRegistering,
  isRegistered,
  isResetting,
  isReset,
  error,
  errors: error,
  next,
});

export default Auth;
