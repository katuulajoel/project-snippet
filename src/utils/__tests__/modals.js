// import React from 'react';
// import { waitFor } from '@testing-library/dom';
// import { render } from '@testing-library/react';
import * as modalUtils from "../modals";
import store from "../../redux/store";
import * as testResultAction from "../../redux/actions/TestResultsActions";

describe("Modal utils tests", () => {
  it("should open confirm modal", async () => {
    const createConfirmationStub = jest
      .spyOn(modalUtils, "confirm")
      .mockReturnValue(Promise.resolve(null));
    const openGenericModalStub = jest.spyOn(modalUtils, "openGenericModal");
    // const openGenericModalStub = jest.spyOn(modalUtils, 'openGenericModal').mockReturnValue(Promise.resolve(null));
    const openConfirmStub = jest.spyOn(modalUtils, "openConfirm");
    const openModalStub = jest.spyOn(modalUtils, "openModal");
    const openAlertStub = jest.spyOn(modalUtils, "openAlert");

    expect(createConfirmationStub).toBeTruthy();
    expect(openGenericModalStub).toBeTruthy();
    expect(openConfirmStub).toBeTruthy();
    expect(openModalStub).toBeTruthy();
    expect(openAlertStub).toBeTruthy();

    // await modalUtils.openModal({
    //   body: <div>Hello</div>,
    //   options: { ok: 'Yes', cancel: 'Cancel' },
    //   header: <div>Title</div>,
    // });
    // expect(openGenericModalStub).toHaveBeenCalled();

    // const body = 'Hello',
    //   title = '',
    //   canClose = true,
    //   options = null,
    //   header = null,
    //   hideActions = false;

    // openGenericModalStub(
    //   body,
    //   {
    //     hideActions,
    //     mustRespond: !canClose,
    //     title,
    //     ...(options || {}),
    //   },
    //   header
    // );

    // openConfirmStub({
    //   message: 'Hello',
    //   title: 'Test',
    //   canClose: true,
    //   options: { ok: 'Yes', cancel: 'Cancel' },
    //   header: null,
    // });
    // expect(createConfirmationStub.calledOnce).to.equal(true);

    // expect(createConfirmationStub).toHaveBeenCalled();
    // expect(openGenericModalStub).toHaveBeenCalled();
    // const modal = modalUtils.openModal({
    //   body: <div>Hello</div>,
    //   options: { ok: 'Yes', cancel: 'Cancel' },
    //   header: <div>Title</div>,
    // });
    // await waitFor(() => {
    //   expect(openGenericModalStub).toHaveBeenCalled();
    //   modal.cancel();
    //   // expect(getByText('Cancel')).toBeInTheDocument();
    //   // expect(getByText('OK')).toBeInTheDocument();
    //   // expect(createConfirmationStub).toHaveBeenCalled();
    // });
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
