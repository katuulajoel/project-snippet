import * as modalUtils from "../modals";
import store from "../../redux/store";
import * as testResultAction from "../../redux/actions/TestResultsActions";

describe("Modal utils tests", () => {
  it("should open confirm modal", async () => {
    const createConfirmationStub = jest
      .spyOn(modalUtils, "confirm")
      .mockReturnValue(Promise.resolve(null));
    const openGenericModalStub = jest.spyOn(modalUtils, "openGenericModal");
    const openConfirmStub = jest.spyOn(modalUtils, "openConfirm");
    const openModalStub = jest.spyOn(modalUtils, "openModal");
    const openAlertStub = jest.spyOn(modalUtils, "openAlert");

    expect(createConfirmationStub).toBeTruthy();
    expect(openGenericModalStub).toBeTruthy();
    expect(openConfirmStub).toBeTruthy();
    expect(openModalStub).toBeTruthy();
    expect(openAlertStub).toBeTruthy();
  });

  it("should trigger open alert action", async () => {
    jest.clearAllMocks();
    const createResultFailedStub = jest.spyOn(
      testResultAction,
      "createResultFailed"
    );
    store.dispatch(createResultFailedStub);
    expect(createResultFailedStub).toHaveBeenCalled();
  });
});
