import React from "react";
import { cleanup, render } from "@testing-library/react";
import Label from "../Label";

afterEach(cleanup);

describe("Label test", () => {
  it("Snapshot test for Label component", () => {
    const { asFragment } = render(<Label />);

    expect(asFragment(<Label />)).toMatchSnapshot();
  });

  it("Check Label renders correctly", () => {
    const { queryByLabelText } = render(<Label />);

    expect(queryByLabelText("label")).toBeTruthy();
  });

  it("Label renders correct label text", () => {
    const { queryByText } = render(<Label name="Email" />);

    expect(queryByText("Email")).toBeTruthy();
  });

  it("Label renders children", () => {
    const { getByLabelText } = render(
      <Label name="Email">
        <input name="email" aria-label="email" />
      </Label>
    );

    expect(getByLabelText("email")).toBeTruthy();
  });
});
