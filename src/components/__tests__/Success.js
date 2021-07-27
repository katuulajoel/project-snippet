import React from "react";
import renderer from "react-test-renderer";
import Success from "../Success";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<Success />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
