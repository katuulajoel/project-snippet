import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import CreateLayout from "../CreateLayout";

describe("CreateLayout test, renders without crashing", () => {
  it("Snapshot test for CreateLayout component", () => {
    const tree = renderer
      .create(
        <Router>
          <CreateLayout />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
