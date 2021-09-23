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
  SEARCH_INVOICES_START,
  SEARCH_INVOICES_SUCCESS,
  SEARCH_INVOICES_FAILED,
  RETRIEVE_INVOICE_START,
  RETRIEVE_INVOICE_SUCCESS,
  RETRIEVE_INVOICE_FAILED,
  UPDATE_INVOICE_START,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED,
  LIST_MORE_INVOICES_START,
  LIST_MORE_INVOICES_SUCCESS,
  LIST_MORE_INVOICES_FAILED,
  SEARCH_MORE_INVOICES_START,
  SEARCH_MORE_INVOICES_SUCCESS,
  SEARCH_MORE_INVOICES_FAILED,
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
function csv(state = null, action) {
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

function search(
  state = { data: [], count: 0, next: "", previous: "" },
  action
) {
  switch (action.type) {
    case SEARCH_INVOICES_SUCCESS:
      return {
        data: action.data.results,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
      };
    case SEARCH_MORE_INVOICES_SUCCESS:
      return {
        data: [...state.data, ...action.data.results],
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
      };
    default:
      return state;
  }
}

function list(state = { data: [], count: 0, next: "", previous: "" }, action) {
  switch (action.type) {
    case CREATE_INVOICE_SUCCESS:
      return { ...state, data: [action.data, ...state.data] };
    case CREATE_INVOICE_BATCH_SUCCESS:
      return { ...state, data: [action.data, ...state.data] };
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
function isMakingRequest(state = {}, action) {
  switch (action.type) {
    case CREATE_INVOICE_START:
      return { ...state, create: true };
    case CREATE_INVOICE_BATCH_START:
      return { ...state, createBatch: true };
    case DOWNLOAD_INVOICE_CSV_STARTED:
      return { ...state, download: true };
    case LIST_INVOICES_START:
      return { ...state, list: true };
    case SEARCH_INVOICES_START:
      return { ...state, search: true };
    case RETRIEVE_INVOICE_START:
      return { ...state, fetch: true };
    case UPDATE_INVOICE_START:
      return { ...state, update: true };
    case LIST_MORE_INVOICES_START:
      return { ...state, more: true };
    case SEARCH_MORE_INVOICES_START:
      return { ...state, searchMore: true };
    case DELETE_INVOICE_START:
      return { ...state, delete: true };
    case ARCHIVE_INVOICE_START:
      return { ...state, archive: true };
    case GENERATE_INVOICE_START:
      return { ...state, generate: true };
    case BULK_ACTION_START:
      return { ...state, bulk: true };
    case INVOICE_SUMMARY_START:
      return { ...state, summary: true };
    default: {
      let newState = state;
      if (action.type === INVOICE_SUMMARY_SUCCESS) {
        delete newState.summary;
      } else if (action.type === LIST_MORE_INVOICES_SUCCESS) {
        delete newState.more;
      } else if (action.type === LIST_INVOICES_SUCCESS) {
        delete newState.list;
      } else {
        const stateKeys = Object.keys(state);
        stateKeys.forEach((elem) => {
          if (!["summary", "more", "list"].includes(elem)) {
            delete newState[elem];
          }
        });
      }
      return newState;
    }
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
    case SEARCH_INVOICES_FAILED:
      return { search: action.error };
    case RETRIEVE_INVOICE_FAILED:
      return { fetch: action.error };
    case UPDATE_INVOICE_FAILED:
      return { update: action.error };
    case LIST_MORE_INVOICES_FAILED:
      return { more: action.error };
    case SEARCH_MORE_INVOICES_FAILED:
      return { searchMore: action.error };
    case DELETE_INVOICE_FAILED:
      return { delete: action.error };
    case ARCHIVE_INVOICE_FAILED:
      return { archive: action.error };
    case GENERATE_INVOICE_FAILED:
      return { generate: action.error };
    case BULK_ACTION_FAILED:
      return { bulk: action.error };
    case INVOICE_SUMMARY_FAILED:
      return { summary: action.error };
    default:
      return state;
  }
}

const Invoice = combineReducers({
  csv,
  invoice,
  search,
  list,
  summary,
  isMakingRequest,
  errors,
});

export default Invoice;
