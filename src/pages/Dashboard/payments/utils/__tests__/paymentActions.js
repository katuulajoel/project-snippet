import * as modalActions from "../../../../../components/utils/modals";
import * as invoiceAction from "../../../../../actions/InvoiceActions";
import {
  generateInvoice,
  markAsPaid,
  markAsArchived,
  approvePayout,
  downloadCsv,
  bulkArchiveInvoice,
  bulkDeleteInvoice,
  bulkGenerateInvoice,
  bulkMarkAsPaid,
  filterPaymentSummaries,
} from "../paymentActions";
import store from "../../../../../store";

jest.mock("../../../../../store", () => {
  return {
    dispatch: jest.fn(),
  };
});

describe("Payments actions", () => {
  beforeAll(() => {
    return jest
      .spyOn(modalActions, "openConfirm")
      .mockReturnValue(Promise.resolve());
  });

  it("should trigger generate invoice action", async () => {
    const generateInvoiceStub = jest.spyOn(invoiceAction, "generateInvoice");
    store.dispatch.mockReturnValue(generateInvoiceStub);

    await generateInvoice(123);

    expect(generateInvoiceStub).toHaveBeenCalled();
    expect(generateInvoiceStub).toBeCalledWith(123);
  });

  it("should trigger update invoice action", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await markAsPaid(123);

    expect(updateInvoiceStub).toHaveBeenCalled();
    expect(updateInvoiceStub).toBeCalledWith(123, { paid: true });
  });

  it("should trigger archive invoice action", async () => {
    const archiveInvoiceStub = jest.spyOn(invoiceAction, "archiveInvoice");
    store.dispatch.mockReturnValue(archiveInvoiceStub);

    await markAsArchived(123);

    expect(archiveInvoiceStub).toHaveBeenCalled();
    expect(archiveInvoiceStub).toBeCalledWith(123);
  });

  it("should trigger approve invoice action", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await approvePayout([{ id: 123 }]);

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

    await downloadCsv("all", "Payments");
    expect(downloadInoicesCsvStub).toHaveBeenCalled();
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
    });

    await downloadCsv("paid", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "True",
    });

    await downloadCsv("overdue", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "False",
      overdue: "True",
    });

    await downloadCsv("pending", "Payments");
    expect(downloadInoicesCsvStub).toBeCalledWith({
      start: "start",
      end: "end",
      type: "sale",
      archived: "False",
      paid: "False",
      overdue: "False",
    });

    await downloadCsv("archived", "Payments");
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
    await downloadCsv("archived", "Payments");
    expect(downloadInoicesCsvStub).not.toHaveBeenCalled();
  });

  it("should archive bulk invoices", async () => {
    const bulkActionStub = jest.spyOn(invoiceAction, "bulkAction");
    store.dispatch.mockReturnValue(bulkActionStub);

    await bulkArchiveInvoice([{ id: 123 }]);

    expect(bulkActionStub).toHaveBeenCalled();
    expect(bulkActionStub).toBeCalledWith([{ id: 123 }], "archive");
  });

  it("should delete bulk invoices", async () => {
    const bulkActionStub = jest.spyOn(invoiceAction, "bulkAction");
    store.dispatch.mockReturnValue(bulkActionStub);

    await bulkDeleteInvoice([{ id: 123 }]);

    expect(bulkActionStub).toHaveBeenCalled();
    expect(bulkActionStub).toBeCalledWith([{ id: 123 }], "delete");
  });

  it("should delete bulk invoices", async () => {
    const generateInvoiceStub = jest.spyOn(invoiceAction, "generateInvoice");
    store.dispatch.mockReturnValue(generateInvoiceStub);

    await bulkGenerateInvoice([{ id: 123 }, { id: 124 }, { id: 125 }]);

    expect(generateInvoiceStub).toBeCalledTimes(3);
    expect(generateInvoiceStub).toBeCalledWith(123);
    expect(generateInvoiceStub).toBeCalledWith(124);
    expect(generateInvoiceStub).toBeCalledWith(125);
  });

  it("should mark as paid bulk invoices", async () => {
    const updateInvoiceStub = jest.spyOn(invoiceAction, "updateInvoice");
    store.dispatch.mockReturnValue(updateInvoiceStub);

    await bulkMarkAsPaid([{ id: 123 }, { id: 124 }, { id: 125 }]);

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

    await filterPaymentSummaries(
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
});

function convertToDateString(date) {
  return `${date.getFullYear()}-${("0" + (date.getUTCMonth() + 1)).slice(
    -2
  )}-${("0" + date.getUTCDate()).slice(-2)}`;
}
