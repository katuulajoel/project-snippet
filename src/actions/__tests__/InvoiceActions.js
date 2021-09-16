import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../InvoiceActions";
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
  INVOICE_SUMMARY_START,
  INVOICE_SUMMARY_SUCCESS,
  INVOICE_SUMMARY_FAILED,
} from "../utils/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
});

describe("Invoice actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should create invoice", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: CREATE_INVOICE_START },
      {
        type: CREATE_INVOICE_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.createInvoice({ key: "" }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch right actions on invoice creation failed", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: CREATE_INVOICE_START },
      {
        type: CREATE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.createInvoice({ key: "" }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should CREATE_INVOICE_BATCH_SUCCESS", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: CREATE_INVOICE_BATCH_START },
      {
        type: CREATE_INVOICE_BATCH_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.createInvoiceBatch([{ key: "" }]));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
    // TODO: test that this function receives an array of data of type invoice
  });

  it("should dispatch CREATE_INVOICE_BATCH_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: CREATE_INVOICE_BATCH_START },
      {
        type: CREATE_INVOICE_BATCH_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.createInvoiceBatch([{ key: "" }]));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch DOWNLOAD_INVOICE_CSV_SUCCESS", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: DOWNLOAD_INVOICE_CSV_STARTED },
      {
        type: DOWNLOAD_INVOICE_CSV_SUCCESS,
      },
    ];

    await store.dispatch(
      actions.downloadInoicesCsv({ key: "" }, "type", "filter")
    );
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch DOWNLOAD_INVOICE_CSV_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: DOWNLOAD_INVOICE_CSV_STARTED },
      {
        type: DOWNLOAD_INVOICE_CSV_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(
      actions.downloadInoicesCsv({ key: "" }, "type", "filter")
    );
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch LIST_INVOICES_SUCCESS", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [{ id: 1234 }] }));
    const expectedActions = [
      { type: LIST_INVOICES_START },
      {
        type: LIST_INVOICES_SUCCESS,
        data: [{ id: 1234 }],
      },
    ];

    await store.dispatch(actions.listInvoices({ key: "" }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch LIST_INVOICES_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: LIST_INVOICES_START },
      {
        type: LIST_INVOICES_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.listInvoices({ key: "" }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch RETRIEVE_INVOICE_SUCCESS", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: RETRIEVE_INVOICE_START },
      {
        type: RETRIEVE_INVOICE_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.retrieveInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch RETRIEVE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: RETRIEVE_INVOICE_START },
      {
        type: RETRIEVE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.retrieveInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch UPDATE_INVOICE_SUCCESS", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: UPDATE_INVOICE_START },
      {
        type: UPDATE_INVOICE_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.updateInvoice("id", {}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch UPDATE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.patch.mockRejectedValue(error);

    const expectedActions = [
      { type: UPDATE_INVOICE_START },
      {
        type: UPDATE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.updateInvoice("id", {}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch LIST_MORE_INVOICES_SUCCESS", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [{ id: 1234 }] }));
    const expectedActions = [
      { type: LIST_MORE_INVOICES_START },
      {
        type: LIST_MORE_INVOICES_SUCCESS,
        data: [{ id: 1234 }],
      },
    ];

    await store.dispatch(actions.listMoreInvoices("url"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch LIST_MORE_INVOICES_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: LIST_MORE_INVOICES_START },
      {
        type: LIST_MORE_INVOICES_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.listMoreInvoices("url"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch DELETE_INVOICE_SUCCESS", async () => {
    axios.delete.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: DELETE_INVOICE_START },
      {
        type: DELETE_INVOICE_SUCCESS,
        data: { id: "id" },
      },
    ];

    await store.dispatch(actions.deleteInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch RETRIEVE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.delete.mockRejectedValue(error);

    const expectedActions = [
      { type: DELETE_INVOICE_START },
      {
        type: DELETE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.deleteInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch GENERATE_INVOICE_SUCCESS", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: { id: 1234 } }));
    const expectedActions = [
      { type: GENERATE_INVOICE_START },
      {
        type: GENERATE_INVOICE_SUCCESS,
        data: { id: 1234 },
      },
    ];

    await store.dispatch(actions.generateInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch GENERATE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: GENERATE_INVOICE_START },
      {
        type: GENERATE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.generateInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch ARCHIVE_INVOICE_SUCCESS", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      { type: ARCHIVE_INVOICE_START },
      {
        type: ARCHIVE_INVOICE_SUCCESS,
        data: { id: "id" },
      },
    ];

    await store.dispatch(actions.archiveInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch ARCHIVE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: ARCHIVE_INVOICE_START },
      {
        type: ARCHIVE_INVOICE_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.archiveInvoice("id"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch BULK_ACTION_SUCCESS", async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      { type: BULK_ACTION_START },
      {
        type: BULK_ACTION_SUCCESS,
        data: {},
      },
    ];

    await store.dispatch(actions.bulkAction([[{}], "action"]));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch BULK_ACTION_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.patch.mockRejectedValue(error);

    const expectedActions = [
      { type: BULK_ACTION_START },
      {
        type: BULK_ACTION_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.bulkAction([[{}], "action"]));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch INVOICE_SUMMARY_SUCCESS", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: {} }));
    const expectedActions = [
      { type: INVOICE_SUMMARY_START },
      {
        type: INVOICE_SUMMARY_SUCCESS,
        data: {},
      },
    ];

    await store.dispatch(actions.getInvoiceSummary({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch ARCHIVE_INVOICE_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: INVOICE_SUMMARY_START },
      {
        type: INVOICE_SUMMARY_FAILED,
        error: "Error!",
      },
    ];

    await store.dispatch(actions.getInvoiceSummary({}));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
