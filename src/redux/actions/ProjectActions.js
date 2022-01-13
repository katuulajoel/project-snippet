/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  composeFormData,
  ENDPOINT_PROJECTS,
  ENDPOINT_PROGRESS_EVENTS,
  ENDPOINT_DOCUMENTS,
  ENDPOINT_ACTIVITIES,
} from "../../utils/api";

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
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,
  CREATE_PROGRESS_EVENT_START,
  CREATE_PROGRESS_EVENT_SUCCESS,
  CREATE_PROGRESS_EVENT_FAILED,
  UPDATE_PROGRESS_EVENT_START,
  UPDATE_PROGRESS_EVENT_SUCCESS,
  UPDATE_PROGRESS_EVENT_FAILED,
  CREATE_DOCUMENT_START,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILED,
  UPDATE_DOCUMENT_START,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILED,
  DELETE_DOCUMENT_START,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILED,
  LIST_TIMESHEETS_START,
  LIST_TIMESHEETS_SUCCESS,
  LIST_TIMESHEETS_FAILED,
  CREATE_TIMESHEET_START,
  CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_FAILED,
  LIST_ACTIVITIES_START,
  LIST_ACTIVITIES_SUCCESS,
  LIST_ACTIVITIES_FAILED,
  LIST_MORE_ACTIVITIES_START,
  LIST_MORE_ACTIVITIES_SUCCESS,
  LIST_MORE_ACTIVITIES_FAILED,
} from "../../configs/constants/ActionTypes";
import { success, start, failed } from "../../utils/actions";

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

export function updateProject(id, project) {
  return (dispatch) => {
    dispatch(start(UPDATE_PROJECT_START));

    let headers = {},
      data = project;
    if (project.documents && project.documents.length) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(project);
    }

    axios
      .patch(`${ENDPOINT_PROJECTS}${id}/`, data, {
        headers: { ...headers },
      })
      .then(function (response) {
        dispatch(success(UPDATE_PROJECT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(UPDATE_PROJECT_FAILED, error));
      });
  };
}

export function createProgressEvent(progress_event) {
  return (dispatch) => {
    dispatch(start(CREATE_PROGRESS_EVENT_START));
    axios
      .post(ENDPOINT_PROGRESS_EVENTS, progress_event)
      .then(function (response) {
        dispatch(success(CREATE_PROGRESS_EVENT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_PROGRESS_EVENT_FAILED, error));
      });
  };
}

export function updateProgressEvent(id, progress_event) {
  return (dispatch) => {
    dispatch(start(UPDATE_PROGRESS_EVENT_START));
    axios
      .patch(ENDPOINT_PROGRESS_EVENTS + id + "/", progress_event)
      .then(function (response) {
        dispatch(success(UPDATE_PROGRESS_EVENT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(UPDATE_PROGRESS_EVENT_FAILED, error));
      });
  };
}

export function createDocument(document) {
  return (dispatch) => {
    dispatch(start(CREATE_DOCUMENT_START));

    let headers = {},
      data = document;

    if (document.file) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(document);
    }

    axios
      .post(ENDPOINT_DOCUMENTS, data, { headers })
      .then(function (response) {
        dispatch(success(CREATE_DOCUMENT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_DOCUMENT_FAILED, error));
      });
  };
}

export function updateDocument(id, document) {
  return (dispatch) => {
    dispatch(start(UPDATE_DOCUMENT_START));

    let headers = {},
      data = document;
    if (document.file) {
      headers["Content-Type"] = "multipart/form-data";
      data = composeFormData(document);
    }

    axios
      .patch(ENDPOINT_DOCUMENTS + id + "/", data, {
        headers: { ...headers },
      })
      .then(function (response) {
        dispatch(success(UPDATE_DOCUMENT_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(UPDATE_DOCUMENT_FAILED, error));
      });
  };
}

export function deleteDocument(id) {
  return (dispatch) => {
    dispatch(start(DELETE_DOCUMENT_START));
    axios
      .delete(ENDPOINT_DOCUMENTS + id + "/")
      .then(function () {
        dispatch(success(DELETE_DOCUMENT_SUCCESS, id));
      })
      .catch(function (error) {
        dispatch(failed(DELETE_DOCUMENT_FAILED, error));
      });
  };
}

export function listTimesheets(id, year) {
  return (dispatch) => {
    dispatch(start(LIST_TIMESHEETS_START));
    axios
      .get(`${ENDPOINT_PROJECTS}${id}/timesheets/?year=${year}`)
      .then((response) => {
        dispatch(success(LIST_TIMESHEETS_SUCCESS, response.data));
      })
      .catch((error) => {
        dispatch(failed(LIST_TIMESHEETS_FAILED, error));
      });
  };
}

export function createTimesheet(timesheet, id) {
  return (dispatch) => {
    dispatch(start(CREATE_TIMESHEET_START));
    axios
      .post(`${ENDPOINT_PROJECTS}${id}/timesheet/`, timesheet)
      .then(function (response) {
        dispatch(success(CREATE_TIMESHEET_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_TIMESHEET_FAILED, error));
      });
  };
}

export function listActivities(filter) {
  return (dispatch) => {
    dispatch(start(LIST_ACTIVITIES_START));
    axios
      .get(ENDPOINT_ACTIVITIES, { params: filter })
      .then(function (response) {
        dispatch(success(LIST_ACTIVITIES_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(LIST_ACTIVITIES_FAILED, error));
      });
  };
}

export function listMoreActivities(url) {
  return (dispatch) => {
    dispatch(start(LIST_MORE_ACTIVITIES_START));
    axios
      .get(url)
      .then(function (response) {
        dispatch(success(LIST_MORE_ACTIVITIES_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(LIST_MORE_ACTIVITIES_FAILED, error));
      });
  };
}
