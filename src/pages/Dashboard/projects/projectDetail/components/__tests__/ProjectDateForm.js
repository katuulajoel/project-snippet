/* eslint-disable react/prop-types */
import React from "react";
import renderer from "react-test-renderer";
import ProjectDateForm from "../ProjectDateForm";
import { mount } from "enzyme/build";

function mockComponent(componentName) {
  return (props) => {
    return (
      <input
        originalComponent={componentName}
        {...props}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    );
  };
}

jest.mock("../../../../../../components/DateTimePicker", () => {
  return mockComponent("DateTimePicker");
});

describe("Project Planning test", () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 1, 14)).valueOf());
  });
  it("Should match snapshot test", () => {
    const tree = renderer.create(<ProjectDateForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should save form if all required fields are correct", () => {
    const proceedStub = jest.fn();
    const wrapper = mount(
      <ProjectDateForm project={{ id: 123 }} proceed={proceedStub} />
    );

    wrapper.find("form").simulate("submit");

    expect(wrapper.find("FieldError").props().message).toBe(
      "End date is required"
    );

    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "2020-03-29T10:12:33.220000" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "2020-03-28T10:12:33.220000" } });

    wrapper.find("form").simulate("submit");

    expect(wrapper.find("FieldError").props().message).toBe(
      "Start date is greater than end date"
    );

    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "2020-03-28T10:12:33.220000" } });
    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "2020-03-29T10:12:33.220000" } });
    wrapper
      .find("textarea")
      .simulate("change", { target: { value: "description" } });

    wrapper.find("form").simulate("submit");

    expect(proceedStub).toHaveBeenCalledWith({
      start_date: "2020-03-28T10:12:33Z",
      deadline: "2020-03-29T10:12:33Z",
      id: 123,
      reason: "description",
    });
  });
});
