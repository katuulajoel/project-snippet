import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer
      .create(
        <Router>
          <NavBar ref={{ current: "" }} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
