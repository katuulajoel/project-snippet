/* eslint-disable no-unused-vars */
import * as reactConfirmUtils from "react-confirm";
import * as modalUtils from "../modals";

describe("Modal utils tests", () => {
  it("should open confirm modal", () => {
    const createConfirmationStub = jest.spyOn(
      reactConfirmUtils,
      "createConfirmation"
    );
  });
});
