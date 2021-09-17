import { performAction } from "../utils";
import * as actions from "../paymentActions";
import * as types from "../constant";

describe("Payment utils tests", () => {
  it("should perform right action", () => {
    const generateInvoiceStub = jest.spyOn(actions, "generateInvoice");
    performAction(types.GENERATE_INVOICE_ACTION, { id: 123 });
    expect(generateInvoiceStub).toHaveBeenCalled();

    const markAsPaidStub = jest.spyOn(actions, "markAsPaid");
    performAction(types.MARK_AS_PAID_ACTION, { id: 123 });
    expect(markAsPaidStub).toHaveBeenCalled();

    const markAsArchivedStub = jest.spyOn(actions, "markAsArchived");
    performAction(types.ARCHIVE_ACTION, { id: 123 });
    expect(markAsArchivedStub).toHaveBeenCalled();

    const approvePayoutStub = jest.spyOn(actions, "approvePayout");
    performAction(types.APPROVE_BATCH_ACTION, { id: 123 });
    expect(approvePayoutStub).toHaveBeenCalled();
  });
});
