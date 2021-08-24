/* eslint-disable no-unused-vars */
import axios from "axios";
import { ENDPOINT_INVOICES, ENDPOINT_INVOICES_SUMMARY } from "./utils/api";

import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  CREATE_INVOICE_BATCH_START,
  CREATE_INVOICE_BATCH_SUCCESS,
  CREATE_INVOICE_BATCH_FAILED,
  DOWNLOAD_INVOICE_CSV_STARTED,
  DOWNLOAD_INVOICE_CSV_SUCCESS,
  DOWNLOAD_INVOICE_CSV_FAILED,
  LIST_INVOICES_START,
  LIST_INVOICES_SUCCESS,
  LIST_INVOICES_FAILED,
  RETRIEVE_INVOICE_START,
  RETRIEVE_INVOICE_SUCCESS,
  RETRIEVE_INVOICE_FAILED,
  UPDATE_INVOICE_START,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED,
  LIST_MORE_INVOICES_START,
  LIST_MORE_INVOICES_SUCCESS,
  LIST_MORE_INVOICES_FAILED,
  DELETE_INVOICE_START,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED,
  ARCHIVE_INVOICE_START,
  ARCHIVE_INVOICE_SUCCESS,
  ARCHIVE_INVOICE_FAILED,
  GENERATE_INVOICE_START,
  GENERATE_INVOICE_SUCCESS,
  GENERATE_INVOICE_FAILED,
  BULK_ACTION_START,
  BULK_ACTION_SUCCESS,
  BULK_ACTION_FAILED,
  PAY_INVOICE_START,
  PAY_INVOICE_SUCCESS,
  PAY_INVOICE_FAILED,
  INVOICE_SUMMARY_START,
  INVOICE_SUMMARY_SUCCESS,
  INVOICE_SUMMARY_FAILED,
} from "./utils/ActionTypes";
import { success, start, failed } from "./utils/actions";

var fileDownload = require("js-file-download");

export function createInvoice(invoice) {
  return (dispatch) => {
    dispatch(start(CREATE_INVOICE_START));
    axios
      .post(ENDPOINT_INVOICES, invoice)
      .then(function (response) {
        dispatch(success(CREATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_INVOICE_FAILED, error));
      });
  };
}

export function createInvoiceBatch(invoices) {
  return (dispatch) => {
    dispatch(start(CREATE_INVOICE_BATCH_START));
    axios
      .post(`${ENDPOINT_INVOICES}bulk/`, invoices)
      .then(function (response) {
        dispatch(success(CREATE_INVOICE_BATCH_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(CREATE_INVOICE_BATCH_FAILED, error));
      });
  };
}

export function downloadInoicesCsv(invoiceSet, type = "", filter = "") {
  return (dispatch) => {
    dispatch(start(DOWNLOAD_INVOICE_CSV_STARTED));
    axios
      .get(`${ENDPOINT_INVOICES}export/`, { params: invoiceSet })
      .then(function (response) {
        // TODO: this can be done in the component since you are sending the data to reducers
        /* fileDownload(
          response.data,
          `${filter.charAt(0).toUpperCase() + filter.slice(1)} ${type}.csv`
        ); */
        dispatch(success(DOWNLOAD_INVOICE_CSV_SUCCESS));
      })
      .catch(function (error) {
        dispatch(failed(DOWNLOAD_INVOICE_CSV_FAILED, error));
      });
  };
}

export function listInvoices(filter) {
  return (dispatch) => {
    dispatch(start(LIST_INVOICES_START));
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
        dispatch(success(LIST_INVOICES_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(LIST_INVOICES_FAILED, error));
      });
  };
}

export function retrieveInvoice(id) {
  return (dispatch) => {
    dispatch(start(RETRIEVE_INVOICE_START));
    axios
      .get(ENDPOINT_INVOICES + id + "/")
      .then(function (response) {
        dispatch(success(RETRIEVE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(RETRIEVE_INVOICE_FAILED, error));
      });
  };
}

export function updateInvoice(id, invoice) {
  return (dispatch) => {
    dispatch(start(UPDATE_INVOICE_START));
    axios
      .patch(ENDPOINT_INVOICES + id + "/", invoice)
      .then(function (response) {
        // TODO: this can be done from component
        /* if (invoice.successMsg) {
          openAlert(<AlertDialogue msg={invoice.successMsg} />, false, {
            className: "alert-dailogue",
            hideActions: true,
            hideBackdrop: true,
          });
        } */
        dispatch(success(UPDATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(UPDATE_INVOICE_FAILED, error));
      });
  };
}

export function listMoreInvoices(url) {
  return (dispatch) => {
    dispatch(start(LIST_MORE_INVOICES_START));
    axios
      .get(url)
      .then(function (response) {
        dispatch(success(LIST_MORE_INVOICES_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(LIST_MORE_INVOICES_FAILED, error));
      });
  };
}

export function deleteInvoice(id) {
  return (dispatch) => {
    dispatch(start(DELETE_INVOICE_START));
    axios
      .delete(ENDPOINT_INVOICES + id + "/")
      .then(function () {
        dispatch(success(DELETE_INVOICE_SUCCESS, { id }));
      })
      .catch(function (error) {
        dispatch(failed(DELETE_INVOICE_FAILED, error));
      });
  };
}

export function archiveInvoice(id) {
  return (dispatch) => {
    dispatch(start(ARCHIVE_INVOICE_START));
    axios
      .post(`${ENDPOINT_INVOICES}${id}/archive/`)
      .then(function () {
        // TODO: this can be done in compoent
        /* openAlert(<AlertDialogue />, false, {
          className: "alert-dailogue",
          hideActions: true,
          hideBackdrop: true,
        }); */
        dispatch(success(ARCHIVE_INVOICE_SUCCESS, { id }));
      })
      .catch(function (error) {
        dispatch(failed(ARCHIVE_INVOICE_FAILED, error));
      });
  };
}

export function generateInvoice(id) {
  return (dispatch) => {
    dispatch(start(GENERATE_INVOICE_START));
    axios
      .post(`${ENDPOINT_INVOICES}${id}/generate/`)
      .then(function (response) {
        dispatch(success(GENERATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(GENERATE_INVOICE_FAILED, error));
      });
  };
}

export function bulkAction(invoices, action) {
  return (dispatch) => {
    dispatch(start(BULK_ACTION_START));
    axios
      .patch(`${ENDPOINT_INVOICES}bulk/edit/`, { invoices, action })
      .then(function () {
        dispatch(success(BULK_ACTION_SUCCESS, {}));
      })
      .catch(function (error) {
        dispatch(failed(BULK_ACTION_FAILED, error));
      });
  };
}

//TODO: dont think function is need anymore
export function payInvoice(id, payment) {
  return (dispatch) => {
    dispatch(start(PAY_INVOICE_START));
    axios
      .post(
        `${ENDPOINT_INVOICES}${id}/pay${
          payment.object === "payment_intent" ? "-intent-complete" : ""
        }/`,
        payment
      )
      .then(function (response) {
        dispatch(success(PAY_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(PAY_INVOICE_FAILED, error));
      });
  };
}

export function getInvoiceSummary(params) {
  return (dispatch) => {
    dispatch(start(INVOICE_SUMMARY_START));
    axios
      .get(`${ENDPOINT_INVOICES_SUMMARY}`, { params: params })
      .then(function (response) {
        dispatch(success(INVOICE_SUMMARY_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(INVOICE_SUMMARY_FAILED, error));
      });
  };
}
