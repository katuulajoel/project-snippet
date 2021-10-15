import React from 'react';
import axios from 'axios';
import { ENDPOINT_TEST_RESULTS } from '../../utils/api';

import AlertDialogue from '../../components/AlertDialogue';
import { openAlert } from '../../utils/modals';
import {
  CREATE_RESULT_START,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILED,
  UPDATE_RESULT_START,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILED,
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
  DELETE_RESULT_START,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILED,
  SET_FILTERS,
} from '../../configs/constants/ActionTypes';

export const createResult = (data) => {
  return (dispatch) => {
    dispatch(createResultStart(data));
    axios
      .post(ENDPOINT_TEST_RESULTS, data)
      .then((response) => {
        dispatch(createResultSuccess(response.data));
      })
      .catch((error) => {
        dispatch(createResultFailed(error.response ? error.response.data : null));
      });
  };
};

export const createResultStart = (data) => {
  return {
    type: CREATE_RESULT_START,
    data,
  };
};

export const createResultSuccess = (result) => {
  return {
    type: CREATE_RESULT_SUCCESS,
    result,
  };
};

export const createResultFailed = (error) => {
  if (error) {
    openAlert(<AlertDialogue msg={error.message} />, false, {
      className: 'error-dailogue',
      hideActions: true,
      hideBackdrop: true,
    });
  }
  return {
    type: CREATE_RESULT_FAILED,
    error,
  };
};

export const deleteResult = (id) => {
  return (dispatch) => {
    dispatch(deleteResultStart(id));
    axios
      .delete(`${ENDPOINT_TEST_RESULTS}${id}/`, {})
      .then(() => {
        dispatch(deleteResultSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteResultFailed(error.response ? error.response.data : null));
      });
  };
};

export const deleteResultStart = (id) => {
  return {
    type: DELETE_RESULT_START,
    id,
  };
};

export const deleteResultSuccess = (id) => {
  return {
    type: DELETE_RESULT_SUCCESS,
    id,
  };
};

export const deleteResultFailed = (error) => {
  return {
    type: DELETE_RESULT_FAILED,
    error,
  };
};

export const fetchResults = (filter) => {
  return (dispatch) => {
    dispatch(fetchResultsStart());
    axios
      .get(ENDPOINT_TEST_RESULTS, { params: filter })
      .then((response) => {
        dispatch(fetchResultsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchResultsFailed(error.response ? error.response.data : null));
      });
  };
};

export const fetchResultsStart = () => {
  return {
    type: FETCH_RESULT_START,
  };
};

export const fetchResultsSuccess = (response) => {
  return {
    type: FETCH_RESULT_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
  };
};

export const fetchResultsFailed = (error) => {
  return {
    type: FETCH_RESULT_FAILED,
    error,
  };
};

export const updateResult = (id, result) => {
  return (dispatch) => {
    dispatch(updateResultStart(id, result));
    let headers = {};

    axios
      .patch(ENDPOINT_TEST_RESULTS + id + '/', result, {
        headers: { ...headers },
      })
      .then((response) => {
        dispatch(updateResultSuccess(response.data, id));
      })
      .catch((error) => {
        dispatch(updateResultFailed(error.response ? error.response.data : null, id, result));
      });
  };
};

export const updateResultStart = (id, result) => {
  return {
    type: UPDATE_RESULT_START,
    id,
    result,
  };
};

export const updateResultSuccess = (result, id) => {
  return {
    type: UPDATE_RESULT_SUCCESS,
    result,
    id,
  };
};

export const updateResultFailed = (error, id, result) => {
  return {
    type: UPDATE_RESULT_FAILED,
    error,
    result,
    id,
  };
};

export const setSelectedFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters,
  };
};
