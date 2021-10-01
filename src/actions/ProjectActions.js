/* eslint-disable no-unused-vars */
import axios from "axios";
import { ENDPOINT_PROJECTS } from "./utils/api";

import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
} from "./utils/ActionTypes";
import { success, start, failed } from "./utils/actions";

export function fetchProject(id) {
  return (dispatch) => {
    dispatch(start(FETCH_PROJECT_START));
    axios
      .get(ENDPOINT_PROJECTS + id + "/")
      .then(function (response) {
        dispatch(success(FETCH_PROJECT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(FETCH_PROJECT_FAILED, error));
      });
  };
}
