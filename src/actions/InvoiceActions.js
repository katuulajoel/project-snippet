import axios from "axios";
import { ENDPOINT_INVOICES, ENDPOINT_INVOICES_SUMMARY } from "./utils/api";
import * as types from "./utils/ActionTypes";
import { success, start, failed } from "./utils/actions";

export function createInvoice(invoice) {
  return (dispatch) => {
    dispatch(start(types.CREATE_INVOICE_START));
    axios
      .post(ENDPOINT_INVOICES, invoice)
      .then(function (response) {
        dispatch(success(types.CREATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.CREATE_INVOICE_FAILED, error));
      });
  };
}

export function createInvoiceBatch(invoices) {
  return (dispatch) => {
    dispatch(start(types.CREATE_INVOICE_BATCH_START));
    axios
      .post(`${ENDPOINT_INVOICES}bulk/`, invoices)
      .then(function (response) {
        dispatch(success(types.CREATE_INVOICE_BATCH_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.CREATE_INVOICE_BATCH_FAILED, error));
      });
  };
}

export function downloadInoicesCsv(invoiceSet) {
  return (dispatch) => {
    dispatch(start(types.DOWNLOAD_INVOICE_CSV_STARTED));
    axios
      .get(`${ENDPOINT_INVOICES}export/`, { params: invoiceSet })
      .then(function ({ data }) {
        dispatch(success(types.DOWNLOAD_INVOICE_CSV_SUCCESS, data));
      })
      .catch(function (error) {
        dispatch(failed(types.DOWNLOAD_INVOICE_CSV_FAILED, error));
      });
  };
}

export function listInvoices(filter, search = false) {
  return (dispatch) => {
    dispatch(
      start(search ? types.SEARCH_INVOICES_START : types.LIST_INVOICES_START)
    );
    // TODO: refactor even further
    axios
      .get(
        filter.archived == "True"
          ? ENDPOINT_INVOICES + "archived/"
          : ENDPOINT_INVOICES,
        { params: filter }
      )
      .then(function (response) {
        dispatch(
          success(
            search
              ? types.SEARCH_INVOICES_SUCCESS
              : types.LIST_INVOICES_SUCCESS,
            response.data
          )
        );
      })
      .catch(function (error) {
        dispatch(
          failed(
            search ? types.SEARCH_INVOICES_FAILED : types.LIST_INVOICES_FAILED,
            error
          )
        );
      });
  };
}

export function retrieveInvoice(id) {
  return (dispatch) => {
    dispatch(start(types.RETRIEVE_INVOICE_START));
    axios
      .get(ENDPOINT_INVOICES + id + "/")
      .then(function (response) {
        dispatch(success(types.RETRIEVE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.RETRIEVE_INVOICE_FAILED, error));
      });
  };
}

export function updateInvoice(id, invoice) {
  return (dispatch) => {
    dispatch(start(types.UPDATE_INVOICE_START));
    axios
      .patch(ENDPOINT_INVOICES + id + "/", invoice)
      .then(function (response) {
        dispatch(success(types.UPDATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.UPDATE_INVOICE_FAILED, error));
      });
  };
}

export function listMoreInvoices(url, search = false) {
  return (dispatch) => {
    dispatch(
      start(
        search
          ? types.SEARCH_MORE_INVOICES_START
          : types.LIST_MORE_INVOICES_START
      )
    );
    axios
      .get(url)
      .then(function (response) {
        dispatch(
          success(
            search
              ? types.SEARCH_MORE_INVOICES_SUCCESS
              : types.LIST_MORE_INVOICES_SUCCESS,
            response.data
          )
        );
      })
      .catch(function (error) {
        dispatch(
          failed(
            search
              ? types.SEARCH_MORE_INVOICES_FAILED
              : types.LIST_MORE_INVOICES_FAILED,
            error
          )
        );
      });
  };
}

export function deleteInvoice(id) {
  return (dispatch) => {
    dispatch(start(types.DELETE_INVOICE_START));
    axios
      .delete(ENDPOINT_INVOICES + id + "/")
      .then(function () {
        dispatch(success(types.DELETE_INVOICE_SUCCESS, { id }));
      })
      .catch(function (error) {
        dispatch(failed(types.DELETE_INVOICE_FAILED, error));
      });
  };
}

export function archiveInvoice(id) {
  return (dispatch) => {
    dispatch(start(types.ARCHIVE_INVOICE_START));
    axios
      .post(`${ENDPOINT_INVOICES}${id}/archive/`)
      .then(function () {
        dispatch(success(types.ARCHIVE_INVOICE_SUCCESS, { id }));
      })
      .catch(function (error) {
        dispatch(failed(types.ARCHIVE_INVOICE_FAILED, error));
      });
  };
}

export function generateInvoice(id) {
  return (dispatch) => {
    dispatch(start(types.GENERATE_INVOICE_START));
    axios
      .post(`${ENDPOINT_INVOICES}${id}/generate/`)
      .then(function (response) {
        dispatch(success(types.GENERATE_INVOICE_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.GENERATE_INVOICE_FAILED, error));
      });
  };
}

export function bulkAction(invoices, action) {
  return (dispatch) => {
    dispatch(start(types.BULK_ACTION_START));
    axios
      .patch(`${ENDPOINT_INVOICES}bulk/edit/`, { invoices, action })
      .then(function () {
        dispatch(success(types.BULK_ACTION_SUCCESS, {}));
      })
      .catch(function (error) {
        dispatch(failed(types.BULK_ACTION_FAILED, error));
      });
  };
}

export function getInvoiceSummary(params) {
  return (dispatch) => {
    dispatch(start(types.INVOICE_SUMMARY_START));
    axios
      .get(`${ENDPOINT_INVOICES_SUMMARY}`, { params: params })
      .then(function (response) {
        dispatch(success(types.INVOICE_SUMMARY_SUCCESS, response.data));
      })
      .catch(function (error) {
        dispatch(failed(types.INVOICE_SUMMARY_FAILED, error));
      });
  };
}
