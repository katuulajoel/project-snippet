import React from "react";
import renderer from "react-test-renderer";
import Upload from "../Upload";

jest.mock("react-dropzone", () => ({
  ...jest.requireActual("react-dropzone"), // use actual for all non-hook parts
  useDropzone: () => ({
    acceptedFiles: [{ filename: "" }],
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
  }),
}));

describe("Document picker test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer.create(<Upload />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
