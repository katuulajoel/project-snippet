import React from "react";
import renderer from "react-test-renderer";
import DateRangeForm from "../DateRangeForm";
import mount from "enzyme/build/mount";

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer.create(<DateRangeForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should submit result", () => {
    const proceedMock = jest.fn();
    const wrapper = mount(
      <DateRangeForm
        id="testRange"
        proceed={proceedMock}
        defaultStart="2021-10-19T11:24:08.429Z"
        defaultEnd="2021-10-19T11:24:08.429Z"
      />
    );

    const startDateInput = wrapper.find("#start-date DatePickerInput input");
    const endDateInput = wrapper.find("#end-date DatePickerInput input");

    const date = new Date();
    startDateInput.simulate("change", {
      target: { value: date.toISOString() },
    });
    endDateInput.simulate("change", {
      target: { value: date.toISOString() },
    });
  });
});
