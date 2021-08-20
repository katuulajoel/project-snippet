import React from "react";
import renderer from "react-test-renderer";
import TitleBarSwitch from "../TitleBarSwitch";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<TitleBarSwitch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
