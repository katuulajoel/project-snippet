import React from "react";
import renderer from "react-test-renderer";
import FieldError from "../FieldError";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(<FieldError message="Error Message" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
