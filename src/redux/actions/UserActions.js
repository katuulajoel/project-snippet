import axios from 'axios';
import { ENDPOINT_USERS } from '../../utils/api';
import { LIST_USERS_START, LIST_USERS_SUCCESS, LIST_USERS_FAILED } from '../../configs/constants/ActionTypes';

export const listUsers = (filter, selection, prev_selection) => {
  return (dispatch) => {
    dispatch(listUsersStart(filter, selection, prev_selection));
    axios
      .get(ENDPOINT_USERS, { params: filter })
      .then((response) => {
        dispatch(listUsersSuccess(response.data, filter, selection));
      })
      .catch((error) => {
        dispatch(listUsersFailed(error.response ? error.response.data : null));
      });
  };
};

export const listUsersStart = (filter, selection, prev_selection) => {
  return {
    type: LIST_USERS_START,
    filter,
    selection,
    prev_selection,
  };
};

export const listUsersSuccess = (response, filter, selection) => {
  return {
    type: LIST_USERS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    filter,
    selection,
  };
};

export const listUsersFailed = (error, selection) => {
  return {
    type: LIST_USERS_FAILED,
    error,
    selection,
  };
};
