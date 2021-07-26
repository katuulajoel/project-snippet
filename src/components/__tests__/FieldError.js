import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import FieldError from "../FieldError";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <FieldError message="Error Message" />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
