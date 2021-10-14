import React from "react";
import { cleanup, render } from "@testing-library/react";
import ModalContainer from "../ModalContainer";

afterEach(cleanup);

describe("ModalContainer layout test", () => {
  it("ModalContainer component snapshot", () => {
    const { asFragment } = render(<ModalContainer />);

    expect(asFragment(<ModalContainer />)).toMatchSnapshot();
  });
});
