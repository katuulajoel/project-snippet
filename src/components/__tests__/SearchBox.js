import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer.create(<SearchBox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
