import React from "react";
import renderer from "react-test-renderer";
import AlertDialogue from "../AlertDialogue";

describe("AlertDialogue test", () => {
  it("Snapshot test for AlertDialogue component", () => {
    const tree = renderer.create(<AlertDialogue />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
