import axios from "axios";
import {
  composeFormData,
  ENDPOINT_INVITE_REQUEST,
  ENDPOINT_CONTACT_REQUEST,
  ENDPOINT_MEDIUM,
  ENDPOINT_MIGRATE,
} from "./utils/api";
import {
  CLEAR_VALIDATIONS,
  SEND_CONTACT_REQUEST_START,
  SEND_CONTACT_REQUEST_SUCCESS,
  SEND_CONTACT_REQUEST_FAILED,
  SEND_INVITE_REQUEST_START,
  SEND_INVITE_REQUEST_SUCCESS,
  SEND_INVITE_REQUEST_FAILED,
  GET_MEDIUM_POSTS_START,
  GET_MEDIUM_POSTS_SUCCESS,
  GET_MEDIUM_POSTS_FAILED,
  FIND_REPLACEMENT_START,
  FIND_REPLACEMENT_SUCCESS,
  FIND_REPLACEMENT_FAILED,
  TOGGLE_RIGHT_NAV,
} from "./utils/ActionTypes";

export const clearValidations = () => {
  return {
    type: CLEAR_VALIDATIONS,
  };
};

export const sendContactRequest = (data) => {
  return (dispatch) => {
    dispatch(sendContactRequestStart(data));
    axios
      .post(ENDPOINT_CONTACT_REQUEST, data)
      .then((response) => {
        dispatch(sendContactRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(sendContactRequestFailed(error.response ? error.response.data : null));
      });
  };
};

export const sendContactRequestStart = (data) => {
  return {
    type: SEND_CONTACT_REQUEST_START,
    data,
  };
};

export const sendContactRequestSuccess = (data) => {
  return {
    type: SEND_CONTACT_REQUEST_SUCCESS,
    data,
  };
};

export const sendContactRequestFailed = (error) => {
  return {
    type: SEND_CONTACT_REQUEST_FAILED,
    error,
  };
};

export const sendInviteRequest = (data) => {
  return (dispatch) => {
    dispatch(sendInviteRequestStart(data));

    let headers = {};

    if (data.cv) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(data);
    }

    axios
      .post(ENDPOINT_INVITE_REQUEST, data, { headers })
      .then((response) => {
        dispatch(sendInviteRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(sendInviteRequestFailed(error.response ? error.response.data : null));
      });
  };
};

export const sendInviteRequestStart = (data) => {
  return {
    type: SEND_INVITE_REQUEST_START,
    data,
  };
};

export const sendInviteRequestSuccess = (data) => {
  return {
    type: SEND_INVITE_REQUEST_SUCCESS,
    data,
  };
};

export const sendInviteRequestFailed = (error) => {
  return {
    type: SEND_INVITE_REQUEST_FAILED,
    error,
  };
};

export const getMediumPosts = () => {
  return (dispatch) => {
    dispatch(getMediumPostsStart());
    axios
      .get(ENDPOINT_MEDIUM)
      .then((response) => {
        dispatch(getMediumPostsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getMediumPostsFailed(error.response ? error.response.data : null));
      });
  };
};

export const getMediumPostsStart = () => {
  return {
    type: GET_MEDIUM_POSTS_START,
  };
};

export const getMediumPostsSuccess = (posts) => {
  return {
    type: GET_MEDIUM_POSTS_SUCCESS,
    posts,
  };
};

export const getMediumPostsFailed = (error) => {
  return {
    type: GET_MEDIUM_POSTS_FAILED,
    error,
  };
};

export const findReplacement = (model, id) => {
  return (dispatch) => {
    dispatch(findReplacementStart(model, id));
    axios
      .get(ENDPOINT_MIGRATE + `${model}/${id}/`)
      .then((response) => {
        dispatch(findReplacementSuccess(response.data, model, id));
      })
      .catch((error) => {
        dispatch(findReplacementFailed(error.response ? error.response.data : null, model, id));
      });
  };
};

export const findReplacementStart = (model, id) => {
  return {
    type: FIND_REPLACEMENT_START,
    model,
    id,
  };
};

export const findReplacementSuccess = (replacement, model, id) => {
  return {
    type: FIND_REPLACEMENT_SUCCESS,
    replacement,
    model,
    id,
  };
};

export const findReplacementFailed = (error, model, id) => {
  return {
    type: FIND_REPLACEMENT_FAILED,
    error,
    model,
    id,
  };
};

export const toggleRightNav = (collapsed, contentType) => {
  return {
    type: TOGGLE_RIGHT_NAV,
    collapsed,
    contentType,
  };
};
