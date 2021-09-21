import React from "react";
import renderer from "react-test-renderer";
import LoadMore from "../LoadMore";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<LoadMore />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
