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
    const wrapper = mount(<DateRangeForm proceed={() => {}} />);

    console.log(wrapper.debug());

    const startDateInput = wrapper.find("#start-date DatePickerInput input");
    console.log(startDateInput.debug());

    let date = new Date();
    startDateInput.simulate("change", {
      target: { value: date.toISOString() },
    });
  });
});
