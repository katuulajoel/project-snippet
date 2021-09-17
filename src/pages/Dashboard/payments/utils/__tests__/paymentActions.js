import * as modalActions from "../../../../../components/utils/modals";
import * as invoiceAction from "../../../../../actions/InvoiceActions";
import {
  generateInvoice,
  markAsPaid,
  markAsArchived,
  approvePayout,
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
});
