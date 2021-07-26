import React from "react";
import renderer from "react-test-renderer";
import Icon from "../Icon";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<Icon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
