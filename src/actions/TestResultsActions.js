import React from "react";
import axios from "axios";
import { ENDPOINT_TEST_RESULTS } from "./utils/api";

import AlertDialogue from "../components/AlertDialogue";
import { openAlert } from "../components/utils/modals";
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
  // LIST_MORE_RESULTS_START,
  // LIST_MORE_RESULTS_SUCCESS,
  // LIST_MORE_RESULTS_FAILED,
  SET_FILTERS,
} from "./utils/ActionTypes";

export const createResult = (data, selectionKey) => {
  console.log(data);
  return (dispatch) => {
    dispatch(createResultStart(data, selectionKey));
    axios
      .post(ENDPOINT_TEST_RESULTS, data)
      .then((response) => {
        console.log(response);
        dispatch(createResultSuccess(response.data, selectionKey));
      })
      .catch((error) => {
        console.log(error);
        dispatch(createResultFailed(error.response ? error.response.data : null, selectionKey));
      });
  };
};

export const createResultStart = (data, selectionKey) => {
  return {
    type: CREATE_RESULT_START,
    data,
    selectionKey,
  };
};

export const createResultSuccess = (result, selectionKey) => {
  return {
    type: CREATE_RESULT_SUCCESS,
    result,
    selectionKey,
  };
};

export const createResultFailed = (error, selectionKey) => {
  if (error) {
    openAlert(<AlertDialogue msg={error.message} />, false, {
      className: "error-dailogue",
      hideActions: true,
      hideBackdrop: true,
    });
  }
  return {
    type: CREATE_RESULT_FAILED,
    error,
    selectionKey,
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

export const fetchResults = (selection, filter) => {
  return (dispatch) => {
    dispatch(fetchResultsStart(selection));
    axios
      .get(ENDPOINT_TEST_RESULTS, { params: filter })
      .then((response) => {
        dispatch(fetchResultsSuccess(response.data, selection));
      })
      .catch((error) => {
        dispatch(fetchResultsFailed(error.response ? error.response.data : null));
      });
  };
};

export const fetchResultsStart = (selection) => {
  return {
    type: FETCH_RESULT_START,
    selection,
  };
};

export const fetchResultsSuccess = (response, selection) => {
  return {
    type: FETCH_RESULT_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
  };
};

export const fetchResultsFailed = (error, selection) => {
  return {
    type: FETCH_RESULT_FAILED,
    error,
    selection,
  };
};

export const updateResult = (id, result, selectionKey) => {
  return (dispatch) => {
    dispatch(updateResultStart(id, result, selectionKey));
    let headers = {};

    axios
      .patch(ENDPOINT_TEST_RESULTS + id + "/", result, {
        headers: { ...headers },
      })
      .then((response) => {
        dispatch(updateResultSuccess(response.data, id, selectionKey));
      })
      .catch((error) => {
        dispatch(updateResultFailed(error.response ? error.response.data : null, id, result, selectionKey));
      });
  };
};

export const updateResultStart = (id, result, selectionKey) => {
  return {
    type: UPDATE_RESULT_START,
    id,
    result,
    selectionKey,
  };
};

export const updateResultSuccess = (result, id, selectionKey) => {
  return {
    type: UPDATE_RESULT_SUCCESS,
    result,
    id,
    selectionKey,
  };
};

export const updateResultFailed = (error, id, result, selectionKey) => {
  return {
    type: UPDATE_RESULT_FAILED,
    error,
    result,
    id,
    selectionKey,
  };
};

export const setSelectedFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters,
  };
};
