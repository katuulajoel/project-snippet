import React from "react";
import renderer from "react-test-renderer";
import Avatar from "../Avatar";

describe("Avatar test", () => {
  it("Snapshot test for Avatar component", () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
