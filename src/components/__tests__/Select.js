import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import Select from "../Select";

afterEach(cleanup);

describe("Select component test", () => {
  const mockedOptions = [
    {
      name: "Very good",
      value: "very_good",
    },
    {
      name: "Good",
      value: "good",
    },
    {
      name: "Pass",
      value: "pass",
    },
    {
      name: "Bad",
      value: "poor",
    },
  ];

  it("Snapshot test for Select component", () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render without errors", async () => {
    const mockedOnChange = jest.fn();
    const { getByText } = render(
      <Select options={mockedOptions} onChange={mockedOnChange} />
    );
    const text = getByText("Very good");
    expect(text).toBeTruthy();
  });

  it("should call onChange when the first option is selected", async () => {
    const mockedOnChange = jest.fn();
    const { getByText, queryByTestId } = render(
      <Select
        options={mockedOptions}
        onChange={(value) => mockedOnChange("comms_check", value)}
        data-testid="select"
      />
    );

    const selectComponent = queryByTestId("select");

    expect(selectComponent).toBeDefined();
    expect(selectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(selectComponent.firstChild, { key: "ArrowDown" });
    await waitFor(() => {
      expect(getByText("Very good")).toBeInTheDocument();
      expect(getByText("Good")).toBeInTheDocument();
      expect(getByText("Pass")).toBeInTheDocument();
      expect(getByText("Bad")).toBeInTheDocument();
    });
  });

  it("should call onChange when the first option is selected then second option then the 9th one", async () => {
    const mockedOnChange = jest.fn();
    const { queryByTestId } = render(
      <Select
        options={mockedOptions}
        onChange={mockedOnChange}
        data-testid="select-commms"
      />
    );

    const selectComponent = queryByTestId("select-commms");

    expect(selectComponent).toBeDefined();
    expect(selectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);
  });

  it("CountrySelector component snapshot", () => {
    const { asFragment } = render(<Select />);
    expect(asFragment(<Select />)).toMatchSnapshot();
  });
});
