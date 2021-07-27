import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import CompanyDetails from "../CompanyDetails";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <CompanyDetails />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
