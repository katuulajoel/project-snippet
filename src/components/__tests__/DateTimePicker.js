/* eslint-disable react/prop-types */
import React from "react";
import renderer from "react-test-renderer";
import DateTimePicker from "../DateTimePicker";
import mount from "enzyme/build/mount";

function mockComponent() {
  return (props) => {
    return (
      <>
        <button
          {...props}
          onClick={() => props.onToggle({ target: { tagName: "INPUT" } })}
        >
          Toggle DateTimePicker
        </button>
        <button
          {...props}
          onClick={() => props.onClick({ target: { tagName: "INPUT" } })}
        >
          Click DateTimePicker
        </button>
      </>
    );
  };
}

jest.mock("react-widgets", () => ({
  ...jest.requireActual("react-widgets"),
  DateTimePicker: mockComponent("DateTimePicker"),
}));

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer.create(<DateTimePicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should open date modal", () => {
    const toggleSpy = jest.fn();
    const onClickSpy = jest.fn();
    const wrapper = mount(
      <DateTimePicker
        proceed={() => {}}
        time={true}
        calendar={false}
        onToggle={toggleSpy}
        onClick={onClickSpy}
      />
    );

    wrapper.find("button").at(0).simulate("click");
    expect(toggleSpy).toHaveBeenCalledWith({ target: { tagName: "INPUT" } });
    wrapper.find("button").at(1).simulate("click");
    expect(onClickSpy).toHaveBeenCalledWith({ target: { tagName: "INPUT" } });
  });
});
