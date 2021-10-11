/* eslint-disable no-unused-vars */
import axios from "axios";
import { ENDPOINT_PROJECTS } from "./utils/api";

import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  FETCH_MORE_PROJECTS_START,
  FETCH_MORE_PROJECTS_SUCCESS,
  FETCH_MORE_PROJECTS_FAILED,
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

export function fetchProjects(filter) {
  return (dispatch) => {
    dispatch(start(FETCH_PROJECTS_START));
    axios
      .get(
        Object.prototype.hasOwnProperty.call(filter, "archived_type")
          ? ENDPOINT_PROJECTS + "archived/"
          : ENDPOINT_PROJECTS,
        { params: filter }
      )
      .then(function (response) {
        dispatch(success(FETCH_PROJECTS_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(FETCH_PROJECTS_FAILED, error));
      });
  };
}

export function fetchMoreProjects(nextUrl) {
  return (dispatch) => {
    dispatch(start(FETCH_MORE_PROJECTS_START));
    axios
      .get(nextUrl)
      .then(function (response) {
        dispatch(success(FETCH_MORE_PROJECTS_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(FETCH_MORE_PROJECTS_FAILED, error));
      });
  };
}
