import React from "react";
import renderer from "react-test-renderer";
import BootLogo from "../BootLogo";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<BootLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
