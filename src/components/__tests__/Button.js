import React from "react";
import renderer from "react-test-renderer";
import Button from "../Button";

describe("Button test", () => {
  it("Snapshot test for Button component", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
