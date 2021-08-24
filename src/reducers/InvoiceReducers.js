import { combineReducers } from "redux";

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
  BULK_ACTION_FAILED,
  PAY_INVOICE_START,
  PAY_INVOICE_SUCCESS,
  PAY_INVOICE_FAILED,
  INVOICE_SUMMARY_START,
  INVOICE_SUMMARY_SUCCESS,
  INVOICE_SUMMARY_FAILED,
} from "../actions/utils/ActionTypes";

// TODO: handle also BULK_ACTION_SUCCESS

/**
 * Updates state with the data to be downloaded in csv
 * @param {*} state
 * @param {*} action
 * @returns
 */
function csv(state = {}, action) {
  switch (action.type) {
    case DOWNLOAD_INVOICE_CSV_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

/**
 * Updates state with the totals of the different invoices states
 * @param {*} state
 * @param {*} action
 * @returns
 */
function summary(state = {}, action) {
  switch (action.type) {
    case INVOICE_SUMMARY_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function invoice(state = {}, action) {
  switch (action.type) {
    case RETRIEVE_INVOICE_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function list(state = { data: [], count: 0, next: "", previous: "" }, action) {
  switch (action.type) {
    case CREATE_INVOICE_SUCCESS:
      return { ...state, data: [action.data, ...state.data] };
    case CREATE_INVOICE_BATCH_SUCCESS:
      return { ...state, data: [...action.data, ...state.data] };
    case LIST_INVOICES_SUCCESS:
      return {
        data: action.data.results,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
      };
    case LIST_MORE_INVOICES_SUCCESS:
      return {
        data: [...state.data, ...action.data.results],
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
      };
    case DELETE_INVOICE_SUCCESS: {
      const newData = state.data.filter((value) => value.id !== action.data.id);
      return { ...state, data: [...newData] };
    }
    case PAY_INVOICE_SUCCESS:
    case GENERATE_INVOICE_SUCCESS:
    case ARCHIVE_INVOICE_SUCCESS:
    case UPDATE_INVOICE_SUCCESS: {
      const newData = state.data.map((item) => {
        if (item.id === action.data.id) {
          return {
            ...item,
            ...action.data,
          };
        }
        return item;
      });
      return { ...state, data: [...newData] };
    }
    default:
      return state;
  }
}

/**
 * Upates states when an asynchronous call is being made and whats making that call
 * @param {*} _
 * @param {*} action
 * @returns
 */
function isMakingRequest(_, action) {
  switch (action.type) {
    case CREATE_INVOICE_START:
      return { create: true };
    case CREATE_INVOICE_BATCH_START:
      return { createBatch: true };
    case DOWNLOAD_INVOICE_CSV_STARTED:
      return { download: true };
    case LIST_INVOICES_START:
      return { list: true };
    case RETRIEVE_INVOICE_START:
      return { fetch: true };
    case UPDATE_INVOICE_START:
      return { update: true };
    case LIST_MORE_INVOICES_START:
      return { more: true };
    case DELETE_INVOICE_START:
      return { delete: true };
    case ARCHIVE_INVOICE_START:
      return { archive: true };
    case GENERATE_INVOICE_START:
      return { generate: true };
    case BULK_ACTION_START:
      return { bulk: true };
    case PAY_INVOICE_START:
      return { pay: true };
    case INVOICE_SUMMARY_START:
      return { summary: true };
    default:
      return {};
  }
}

function errors(state = {}, action) {
  switch (action.type) {
    case CREATE_INVOICE_FAILED:
      return { create: action.error };
    case CREATE_INVOICE_BATCH_FAILED:
      return { createBatch: action.error };
    case DOWNLOAD_INVOICE_CSV_FAILED:
      return { download: action.error };
    case LIST_INVOICES_FAILED:
      return { list: action.error };
    case RETRIEVE_INVOICE_FAILED:
      return { fetch: action.error };
    case UPDATE_INVOICE_FAILED:
      return { update: action.error };
    case LIST_MORE_INVOICES_FAILED:
      return { more: action.error };
    case DELETE_INVOICE_FAILED:
      return { delete: action.error };
    case ARCHIVE_INVOICE_FAILED:
      return { archive: action.error };
    case GENERATE_INVOICE_FAILED:
      return { generate: action.error };
    case BULK_ACTION_FAILED:
      return { bulk: action.error };
    case PAY_INVOICE_FAILED:
      return { pay: action.error };
    case INVOICE_SUMMARY_FAILED:
      return { summary: action.error };
    default:
      return state;
  }
}

const Invoice = combineReducers({
  csv,
  invoice,
  list,
  summary,
  isMakingRequest,
  errors,
});

export default Invoice;
