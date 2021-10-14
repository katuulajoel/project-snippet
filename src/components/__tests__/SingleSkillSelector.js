import React from "react";
import renderer from "react-test-renderer";
import SingleSkillSelector from "../SingleSkillSelector";
import { render } from '@testing-library/react';

describe("SingleSkillSelector component test", () => {
  it("Snapshot test for SingleSkillSelector component", () => {
    const tree = renderer.create(<SingleSkillSelector />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check inputs value change', () => {
    const { queryByTestId } = render(
      <SingleSkillSelector />
    );

    const skillDiv = queryByTestId('skill-input');
    expect(skillDiv).toBeDefined();
    });
});
