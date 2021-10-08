import React from "react";
import renderer from "react-test-renderer";
import Select from "../Select";

describe("Select component test", () => {
  it("Snapshot test for Select component", () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
