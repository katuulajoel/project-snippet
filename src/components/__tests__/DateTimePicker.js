import React from "react";
import renderer from "react-test-renderer";
import DateTimePicker from "../DateTimePicker";
import mount from "enzyme/build/mount";

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer.create(<DateTimePicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.only("should open date modal", () => {
    const wrapper = mount(
      <DateTimePicker proceed={() => {}} time={true} calendar={false} />
    );
    const datePicker = wrapper.find("DatePicker input");
    datePicker.simulate("click");
    // eslint-disable-next-line no-unused-vars
    const datePickerPopup = wrapper.find("DatePicker Popup");
  });
});
