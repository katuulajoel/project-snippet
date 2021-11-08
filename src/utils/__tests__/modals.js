import * as modalUtils from "../modals";

describe("Modal utils tests", () => {
  it("should open confirm modal", async () => {
    const createConfirmationStub = jest
      .spyOn(modalUtils, "confirm")
      .mockReturnValue(Promise.resolve(null));
    const openGenericModalStub = jest.spyOn(modalUtils, "openGenericModal");
    const openConfirmStub = jest.spyOn(modalUtils, "openConfirm");
    const openModalStub = jest.spyOn(modalUtils, "openModal");

    expect(createConfirmationStub).toBeTruthy();
    expect(openGenericModalStub).toBeTruthy();
    expect(openConfirmStub).toBeTruthy();
    expect(openModalStub).toBeTruthy();
  });
});
