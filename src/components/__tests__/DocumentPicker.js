import { mount } from "enzyme/build";
import React from "react";
import renderer from "react-test-renderer";
import DocumentPicker from "../DocumentPicker";
import * as modalActions from "../../utils/modals";
import { act } from "@testing-library/react";
// import { render, screen, fireEvent, act } from "@testing-library/react";

describe("Document picker test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<DocumentPicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should select document", () => {
    const onChangeSpy = jest.fn();
    jest.spyOn(modalActions, "openModal").mockReturnValue(Promise.resolve({}));
    act(() => {
      const wrapper = mount(<DocumentPicker onChange={onChangeSpy} />);
      wrapper.find("a").simulate("click");
      console.log(wrapper.debug());
    });

    /* act(() => {
      const { getByText } = render(<DocumentPicker onChange={onChangeSpy} />);
      const link = getByText("Add New");
      fireEvent.click(link);
    });
    screen.debug(); */
  });
});
