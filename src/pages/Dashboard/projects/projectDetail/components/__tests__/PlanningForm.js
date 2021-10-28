import React from "react";
import renderer from "react-test-renderer";
import PlanningForm from "../PlanningForm";
import { mount } from "enzyme/build";

describe("Project Planning test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer.create(<PlanningForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should save form if all required fields are correct", () => {
    const proceedStub = jest.fn();
    const wrapper = mount(
      <PlanningForm plan={{ id: 123 }} proceed={proceedStub} />
    );

    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "url" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "title" } });
    wrapper
      .find("textarea")
      .simulate("change", { target: { value: "description" } });

    wrapper.find("form").simulate("submit");

    expect(proceedStub).toHaveBeenCalledWith({
      id: 123,
      reason: "description",
      url: "url",
      title: "title",
    });
  });
});
