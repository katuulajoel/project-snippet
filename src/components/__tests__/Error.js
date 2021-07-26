import React from "react";
import renderer from "react-test-renderer";
import Error from "../Error";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<Error />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
