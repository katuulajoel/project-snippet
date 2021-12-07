/* eslint-disable react/prop-types */
import React from "react";
import renderer from "react-test-renderer";
import DocumentForm from "../DocumentForm";
import { shallow } from "enzyme";

jest.mock("../Upload", () => ({
  __esModule: true,
  default: ({ children, onChange }) => (
    <>
      {children}
      <button
        type="button"
        className="mocked-upload-change"
        onClick={() => onChange(["uploaded file"])}
      >
        upload
      </button>
    </>
  ),
}));

jest.mock("../../utils/styles", () => {
  const styles = jest.requireActual("../../utils/styles");
  const StyledForm = ({ children, onSubmit }) => (
    <>
      {children}
      <button
        type="button"
        className="mocked-submit"
        onClick={() => onSubmit({ preventDefault: () => {} })}
      >
        submit
      </button>
    </>
  );
  return {
    ...styles,
    StyledForm,
  };
});

describe("Document form test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<DocumentForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show validation errors", () => {
    const wrapper = shallow(<DocumentForm />);
    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find(".mocked-submit")
      .simulate("click");
    expect(
      wrapper.dive().find("StyledForm").dive().find("FieldError").at(0).props()
        .message
    ).toEqual("Add a url");
    expect(
      wrapper.dive().find("StyledForm").dive().find("FieldError").at(1).props()
        .message
    ).toEqual("Select a file");
  });

  it("should save form if valid", () => {
    const proceedSpy = jest.fn();
    const wrapper = shallow(<DocumentForm proceed={proceedSpy} />);

    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find("ForwardRef")
      .at(0)
      .dive()
      .find("input")
      .simulate("change", { target: { value: "document name" } });

    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find("ForwardRef")
      .at(1)
      .dive()
      .find("input")
      .simulate("change", {
        target: { name: "url", value: "https://example.com" },
      });

    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find(".mocked-submit")
      .simulate("click");

    expect(proceedSpy).toHaveBeenCalledWith({
      description: "",
      file: null,
      title: "document name",
      url: "https://example.com",
    });

    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find("default")
      .dive()
      .find("button")
      .simulate("click");

    wrapper
      .dive()
      .find("StyledForm")
      .dive()
      .find(".mocked-submit")
      .simulate("click");

    expect(proceedSpy).toHaveBeenCalledWith({
      description: "",
      file: null,
      title: "document name",
      url: "https://example.com",
    });
  });
});
