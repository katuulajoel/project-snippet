/* eslint-disable react/prop-types */
import React from "react";
// TODO: import renderer from "react-test-renderer";
import MilestoneForm from "../MilestoneForm";
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

describe("Project milestone test", () => {
  beforeAll(() => {
    Date.now = jest.fn(() =>
      new Date(Date.UTC(2017, 1, 14, 0, 0, 0)).valueOf()
    );
  });
  /* TODO: fix test
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(<MilestoneForm milestone={{ id: 123, due_at: null }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  }); */

  it("should save form if all required fields are correct", () => {
    const proceedStub = jest.fn();
    const wrapper = mount(
      <MilestoneForm
        milestone={{ id: 123, due_at: null }}
        proceed={proceedStub}
      />
    );

    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "2020-03-28T10:12:33.220000" } });
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { value: "title" } });
    wrapper
      .find("textarea")
      .simulate("change", { target: { value: "description" } });

    wrapper.find("form").simulate("submit");

    expect(proceedStub).toHaveBeenCalledWith({
      due_at: "2020-03-28T10:12:33Z",
      id: 123,
      reason: "description",
      title: "title",
    });

    wrapper
      .find("input")
      .at(1)
      .simulate("change", { target: { value: "invalid date" } });

    wrapper.find("form").simulate("submit");

    expect(wrapper.find("FieldError").props().message).toBe(
      "Deadline is required"
    );
  });
});
