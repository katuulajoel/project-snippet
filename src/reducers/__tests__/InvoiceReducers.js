import reducer from "../InvoiceReducers";
import {
  CREATE_INVOICE_START,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  CREATE_INVOICE_BATCH_START,
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
  INVOICE_SUMMARY_START,
  INVOICE_SUMMARY_SUCCESS,
  INVOICE_SUMMARY_FAILED,
  SEARCH_INVOICES_FAILED,
  SEARCH_MORE_INVOICES_FAILED,
  SEARCH_INVOICES_START,
  SEARCH_MORE_INVOICES_START,
  SEARCH_INVOICES_SUCCESS,
  SEARCH_MORE_INVOICES_SUCCESS,
  CREATE_INVOICE_BATCH_SUCCESS,
} from "../../actions/utils/ActionTypes";

const initialState = {
  isMakingRequest: {},
  errors: {},
  summary: {},
  search: { data: [], count: 0, next: "", previous: "" },
  list: { data: [], count: 0, next: "", previous: "" },
  invoice: {},
  csv: {},
};

describe("Auth reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles successful search", () => {
    expect(
      reducer(initialState, {
        type: SEARCH_INVOICES_SUCCESS,
        data: { results: [], count: 0, next: "", previous: "" },
      })
    ).toEqual({
      ...initialState,
    });
    expect(
      reducer(initialState, {
        type: SEARCH_MORE_INVOICES_SUCCESS,
        data: { results: [], count: 0, next: "", previous: "" },
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, { type: CREATE_INVOICE_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
      list: {
        ...initialState.list,
        data: [{}],
      },
    });
    expect(
      reducer(initialState, {
        type: LIST_INVOICES_SUCCESS,
        data: { results: [], count: 0, next: "", previous: "" },
      })
    ).toEqual({
      ...initialState,
    });
    expect(
      reducer(initialState, {
        type: LIST_MORE_INVOICES_SUCCESS,
        data: { results: [], count: 0, next: "", previous: "" },
      })
    ).toEqual({
      ...initialState,
    });
    expect(
      reducer(
        {
          ...initialState,
          list: { ...initialState.list, data: [{ id: 123, updated: false }] },
        },
        { type: UPDATE_INVOICE_SUCCESS, data: { id: 123, updated: true } }
      )
    ).toEqual({
      ...initialState,
      list: { ...initialState.list, data: [{ id: 123, updated: true }] },
    });
    expect(
      reducer(
        {
          ...initialState,
          list: { ...initialState.list, data: [{ id: 123, invoice: false }] },
        },
        { type: GENERATE_INVOICE_SUCCESS, data: { id: 123, invoice: true } }
      )
    ).toEqual({
      ...initialState,
      list: { ...initialState.list, data: [{ id: 123, invoice: true }] },
    });
    expect(
      reducer(
        {
          ...initialState,
          list: { ...initialState.list, data: [{ id: 123, archived: false }] },
        },
        { type: ARCHIVE_INVOICE_SUCCESS, data: { id: 123, archived: true } }
      )
    ).toEqual({
      ...initialState,
      list: { ...initialState.list, data: [{ id: 123, archived: true }] },
    });
    expect(
      reducer(initialState, { type: CREATE_INVOICE_BATCH_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
      list: {
        ...initialState.list,
        data: [{}],
      },
    });
    expect(
      reducer(
        {
          ...initialState,
          list: { ...initialState.list, data: [{ id: 123, updated: false }] },
        },
        { type: UPDATE_INVOICE_SUCCESS, data: { id: 124, updated: true } }
      )
    ).toEqual({
      ...initialState,
      list: { ...initialState.list, data: [{ id: 123, updated: false }] },
    });
    expect(
      reducer(
        {
          ...initialState,
          list: { ...initialState.list, data: [{ id: 123 }] },
        },
        { type: DELETE_INVOICE_SUCCESS, data: { id: 123 } }
      )
    ).toEqual({
      ...initialState,
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: CREATE_INVOICE_START })).toEqual({
      ...initialState,
      isMakingRequest: { create: true },
    });
    expect(
      reducer(initialState, {
        type: CREATE_INVOICE_BATCH_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { createBatch: true },
    });
    expect(
      reducer(initialState, {
        type: DOWNLOAD_INVOICE_CSV_STARTED,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { download: true },
    });
    expect(
      reducer(initialState, {
        type: LIST_INVOICES_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { list: true },
    });
    expect(
      reducer(initialState, {
        type: RETRIEVE_INVOICE_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { fetch: true },
    });
    expect(
      reducer(initialState, {
        type: UPDATE_INVOICE_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { update: true },
    });
    expect(
      reducer(initialState, {
        type: LIST_MORE_INVOICES_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { more: true },
    });
    expect(
      reducer(initialState, {
        type: DELETE_INVOICE_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { delete: true },
    });
    expect(
      reducer(initialState, {
        type: ARCHIVE_INVOICE_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { archive: true },
    });
    expect(
      reducer(initialState, {
        type: GENERATE_INVOICE_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { generate: true },
    });
    expect(
      reducer(initialState, {
        type: BULK_ACTION_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { bulk: true },
    });
    expect(
      reducer(initialState, {
        type: INVOICE_SUMMARY_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { summary: true },
    });
    expect(
      reducer(initialState, {
        type: SEARCH_INVOICES_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { search: true },
    });
    expect(
      reducer(initialState, {
        type: SEARCH_MORE_INVOICES_START,
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: { searchMore: true },
    });
  });

  it("handles failure", () => {
    expect(
      reducer(initialState, {
        type: CREATE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { create: "!error" },
    });
    expect(
      reducer(initialState, {
        type: CREATE_INVOICE_BATCH_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { createBatch: "!error" },
    });
    expect(
      reducer(initialState, {
        type: DOWNLOAD_INVOICE_CSV_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { download: "!error" },
    });
    expect(
      reducer(initialState, {
        type: LIST_INVOICES_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { list: "!error" },
    });
    expect(
      reducer(initialState, {
        type: RETRIEVE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { fetch: "!error" },
    });
    expect(
      reducer(initialState, {
        type: UPDATE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { update: "!error" },
    });
    expect(
      reducer(initialState, {
        type: LIST_MORE_INVOICES_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { more: "!error" },
    });
    expect(
      reducer(initialState, {
        type: DELETE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { delete: "!error" },
    });
    expect(
      reducer(initialState, {
        type: ARCHIVE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { archive: "!error" },
    });
    expect(
      reducer(initialState, {
        type: GENERATE_INVOICE_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { generate: "!error" },
    });
    expect(
      reducer(initialState, {
        type: BULK_ACTION_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { bulk: "!error" },
    });
    expect(
      reducer(initialState, {
        type: INVOICE_SUMMARY_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { summary: "!error" },
    });
    expect(
      reducer(initialState, {
        type: SEARCH_INVOICES_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { search: "!error" },
    });
    expect(
      reducer(initialState, {
        type: SEARCH_MORE_INVOICES_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { searchMore: "!error" },
    });
  });

  it("should update state with csv data", () => {
    expect(
      reducer(initialState, {
        type: DOWNLOAD_INVOICE_CSV_SUCCESS,
        data: { list: [] },
      })
    ).toEqual({
      ...initialState,
      csv: { list: [] },
    });
  });

  it("should update state with summary data", () => {
    expect(
      reducer(initialState, {
        type: INVOICE_SUMMARY_SUCCESS,
        data: { total: 0 },
      })
    ).toEqual({
      ...initialState,
      summary: { total: 0 },
    });
  });

  it("should update state with csv data", () => {
    expect(
      reducer(initialState, {
        type: RETRIEVE_INVOICE_SUCCESS,
        data: { id: 123 },
      })
    ).toEqual({
      ...initialState,
      invoice: { id: 123 },
    });
  });
});
