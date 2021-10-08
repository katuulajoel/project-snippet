import React from "react";
import renderer from "react-test-renderer";
import SingleSkillSelector from "../SingleSkillSelector";

describe("SingleSkillSelector component test", () => {
  it("Snapshot test for SingleSkillSelector component", () => {
    const tree = renderer.create(<SingleSkillSelector />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
