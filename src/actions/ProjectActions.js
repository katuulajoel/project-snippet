/* eslint-disable no-unused-vars */
/* import axios from "axios";
import { ENDPOINT_PROJECTS } from "./utils/api";

import {
  LIST_PROJECTS_START,
  LIST_PROJECTS_SUCCESS,
  LIST_PROJECTS_FAILED,
  LIST_MORE_PROJECTS_START,
  LIST_MORE_PROJECTS_SUCCESS,
  LIST_MORE_PROJECTS_FAILED,
  SEARCH_PROJECTS_START,
  SEARCH_PROJECTS_SUCCESS,
  SEARCH_PROJECTS_FAILED,
  SEARCH_MORE_PROJECTS_START,
  SEARCH_MORE_PROJECTS_SUCCESS,
  SEARCH_MORE_PROJECTS_FAILED,
} from "./utils/ActionTypes";
import { success, start, failed } from "./utils/actions";

export function listInvoices(filter, search = false) {
  return (dispatch) => {
    dispatch(start(search ? SEARCH_INVOICES_START : LIST_INVOICES_START));
    // TODO: refactor even further
    axios
      .get(
        filter.archived == "True"
          ? ENDPOINT_INVOICES + "archived/"
          : ENDPOINT_INVOICES,
        filter.archived == "True"
          ? filter.project
            ? { params: { ...filter, project: filter.project } }
            : { params: filter }
          : { params: filter }
      )
      .then(function (response) {
        dispatch(
          success(
            search ? SEARCH_INVOICES_SUCCESS : LIST_INVOICES_SUCCESS,
            response.data
          )
        );
      })
      .catch(function (error) {
        dispatch(
          failed(search ? SEARCH_INVOICES_FAILED : LIST_INVOICES_FAILED, error)
        );
      });
  };
}

export function listMoreInvoices(url, search = false) {
  return (dispatch) => {
    dispatch(
      start(search ? SEARCH_MORE_INVOICES_START : LIST_MORE_INVOICES_START)
    );
    axios
      .get(url)
      .then(function (response) {
        dispatch(
          success(
            search ? SEARCH_MORE_INVOICES_SUCCESS : LIST_MORE_INVOICES_SUCCESS,
            response.data
          )
        );
      })
      .catch(function (error) {
        dispatch(
          failed(
            search ? SEARCH_MORE_INVOICES_FAILED : LIST_MORE_INVOICES_FAILED,
            error
          )
        );
      });
  };
}
 */
