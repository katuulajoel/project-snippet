import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";

describe("Dashboard test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
