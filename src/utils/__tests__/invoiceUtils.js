import * as types from "../../configs/constants/invoiceConstants";
import * as invoiceAction from "../../redux/actions/InvoiceActions";
import * as modalActions from "../modals";
import * as invoiceUtils from "../invoiceUtils";
import store from "../../redux/store";
import { convertToDateString } from "../dateUtil";

jest.mock("../../redux/store", () => {
  return {
    dispatch: jest.fn(),
  };
});

describe("Invoice utils tests", () => {
  beforeAll(() => {
    return jest
      .spyOn(modalActions, "openConfirm")
      .mockReturnValue(Promise.resolve());
  });

  it("should trigger generate invoice action", async () => {
    const generateInvoiceStub = jest.spyOn(invoiceAction, "generateInvoice");
    store.dispatch.mockReturnValue(generateInvoiceStub);

    await invoiceUtils.generateInvoice(123);

    expect(generateInvoiceStub).toHaveBeenCalled();
    expect(generateInvoiceStub).toBeCalledWith(123);
  });

  it("should trigger update invoice action", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await invoiceUtils.markAsPaid(123);

    expect(updateInvoiceStub).toHaveBeenCalled();
    expect(updateInvoiceStub).toBeCalledWith(123, { paid: true });
  });

  it("should trigger archive invoice action", async () => {
    const archiveInvoiceStub = jest.spyOn(invoiceAction, "archiveInvoice");
    store.dispatch.mockReturnValue(archiveInvoiceStub);

    await invoiceUtils.markAsArchived(123);

    expect(archiveInvoiceStub).toHaveBeenCalled();
    expect(archiveInvoiceStub).toBeCalledWith(123);
  });

  it("should trigger approve invoice action", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await invoiceUtils.approvePayout([{ id: 123 }]);

    expect(updateInvoiceStub).toHaveBeenCalled();
    expect(updateInvoiceStub).toBeCalledWith(123, { status: "approved" });
  });

  it("should trigger download csv action", async () => {
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve({ start: "start", end: "end" }));
    const downloadInoicesCsvStub = jest.spyOn(
      invoiceAction,
      "downloadInoicesCsv"
    );
    store.dispatch.mockReturnValue(downloadInoicesCsvStub);

    await invoiceUtils.downloadCsv("all", "Payments");
    expect(downloadInoicesCsvStub).toHaveBeenCalled();
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
    });

    await invoiceUtils.downloadCsv("paid", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "True",
    });

    await invoiceUtils.downloadCsv("overdue", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "False",
      overdue: "True",
    });

    await invoiceUtils.downloadCsv("pending", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "False",
      overdue: "False",
    });

    await invoiceUtils.downloadCsv("archived", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "True",
      paid: "False",
    });
  });

  it("should not trigger download csv action", async () => {
    jest.clearAllMocks();
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve(null));
    const downloadInoicesCsvStub = jest.spyOn(
      invoiceAction,
      "downloadInoicesCsv"
    );
    store.dispatch.mockReturnValue(downloadInoicesCsvStub);
    await invoiceUtils.downloadCsv("archived", "Payments");
    expect(downloadInoicesCsvStub).not.toHaveBeenCalled();
  });

  it("should archive bulk invoices", async () => {
    const bulkActionStub = jest.spyOn(invoiceAction, "bulkAction");
    store.dispatch.mockReturnValue(bulkActionStub);

    await invoiceUtils.bulkArchiveInvoice([{ id: 123 }]);

    expect(bulkActionStub).toHaveBeenCalled();
    expect(bulkActionStub).toBeCalledWith([{ id: 123 }], "archive");
  });

  it("should delete bulk invoices", async () => {
    const bulkActionStub = jest.spyOn(invoiceAction, "bulkAction");
    store.dispatch.mockReturnValue(bulkActionStub);

    await invoiceUtils.bulkDeleteInvoice([{ id: 123 }]);

    expect(bulkActionStub).toHaveBeenCalled();
    expect(bulkActionStub).toBeCalledWith([{ id: 123 }], "delete");
  });

  it("should delete bulk invoices", async () => {
    const generateInvoiceStub = jest.spyOn(invoiceAction, "generateInvoice");
    store.dispatch.mockReturnValue(generateInvoiceStub);

    await invoiceUtils.bulkGenerateInvoice([
      { id: 123 },
      { id: 124 },
      { id: 125 },
    ]);

    expect(generateInvoiceStub).toBeCalledTimes(3);
    expect(generateInvoiceStub).toBeCalledWith(123);
    expect(generateInvoiceStub).toBeCalledWith(124);
    expect(generateInvoiceStub).toBeCalledWith(125);
  });

  it("should mark as paid bulk invoices", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await invoiceUtils.bulkMarkAsPaid([{ id: 123 }, { id: 124 }, { id: 125 }]);

    expect(updateInvoiceStub).toBeCalledTimes(3);
    expect(updateInvoiceStub).toBeCalledWith(123, { paid: true });
    expect(updateInvoiceStub).toBeCalledWith(124, { paid: true });
    expect(updateInvoiceStub).toBeCalledWith(125, { paid: true });
  });

  it("should filter payment summaries", async () => {
    jest.spyOn(modalActions, "openModal").mockReturnValue(
      Promise.resolve({
        start: convertToDateString(new Date(1630539350000)), // Wednesday, 1 September 2021 23:35:50
        end: convertToDateString(new Date(1632353750000)), // Wednesday, 22 September 2021 23:35:50
      })
    );
    const getInvoiceSummaryStub = jest.spyOn(
      invoiceAction,
      "getInvoiceSummary"
    );
    store.dispatch.mockReturnValue(getInvoiceSummaryStub);
    const setSummariesRangeStub = jest.fn();
    const mockDate = new Date(1633131350000); // Friday, 1 October 2021 23:35:50
    const spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    await invoiceUtils.filterPaymentSummaries(
      { start: null, end: null },
      "Payments",
      setSummariesRangeStub
    );

    expect(setSummariesRangeStub).toHaveBeenCalled();
    expect(getInvoiceSummaryStub).toHaveBeenCalled();

    /* expect(getInvoiceSummaryStub).toBeCalledWith({
          min_date: "2021-09-01T00:00:00",
          max_date: "2021-09-22T23:59:59",
          type: "sale",
        }); */

    spy.mockRestore();
  });

  it("should perform right action", () => {
    const generateInvoiceStub = jest.spyOn(invoiceAction, "generateInvoice");
    store.dispatch.mockReturnValue(generateInvoiceStub);
    invoiceUtils.performAction(types.GENERATE_INVOICE_ACTION, { id: 123 });
    expect(generateInvoiceStub).toHaveBeenCalled();

    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);
    invoiceUtils.performAction(types.MARK_AS_PAID_ACTION, { id: 123 });
    expect(updateInvoiceStub).toHaveBeenCalled();

    /* const archiveInvoiceStub = jest.spyOn(invoiceAction, "archiveInvoice");
    store.dispatch.mockReturnValue(archiveInvoiceStub);
    invoiceUtils.performAction(types.ARCHIVE_ACTION, { id: 123 });
    expect(archiveInvoiceStub).toHaveBeenCalled(); */

    invoiceUtils.performAction(types.APPROVE_BATCH_ACTION, { id: 123 });
    expect(updateInvoiceStub).toHaveBeenCalled();
  });

  it("should generate right query params", () => {
    expect(invoiceUtils.getPaymentsFilters("paid")).toEqual({ paid: "True" });
    expect(invoiceUtils.getPaymentsFilters("pending")).toEqual({
      paid: "False",
      overdue: "False",
    });
    expect(invoiceUtils.getPaymentsFilters("overdue")).toEqual({
      overdue: "True",
      paid: "False",
    });
    expect(invoiceUtils.getPaymentsFilters("archived")).toEqual({
      archived: "True",
    });
  });
});
