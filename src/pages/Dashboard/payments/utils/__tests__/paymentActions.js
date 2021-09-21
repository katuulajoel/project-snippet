import * as modalActions from "../../../../../components/utils/modals";
import * as invoiceAction from "../../../../../actions/InvoiceActions";
import {
  generateInvoice,
  markAsPaid,
  markAsArchived,
  approvePayout,
  downloadCsv,
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
});
