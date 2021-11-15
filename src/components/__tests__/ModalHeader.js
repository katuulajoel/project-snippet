import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import ModalHeader from "../ModalHeader";

describe("ModalHeader component test", () => {
  it("Snapshot test for ModalHeader component", () => {
    const tree = renderer
      .create(
        <Router>
          <ModalHeader />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
