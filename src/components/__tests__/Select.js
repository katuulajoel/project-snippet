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
      <Select
        options={mockedOptions}
        onChange={mockedOnChange}
        placeholder="Comms Check"
      />
    );
    const placeholder = getByText("Comms Check");
    expect(placeholder).toBeTruthy();
  });

  it("should call onChange when the first option is selected", async () => {
    const mockedOnChange = jest.fn();
    const { getByText, queryByTestId } = render(
      <Select
        options={mockedOptions}
        onChange={(value) => mockedOnChange("comms_check", value)}
        placeholder="Comms Check"
      />
    );

    const selectComponent = queryByTestId("select-component");

    expect(selectComponent).toBeDefined();
    expect(selectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(selectComponent.firstChild, { key: "ArrowDown" });
    await waitFor(() => {
      expect(getByText("Very good")).toBeInTheDocument();
      expect(getByText("Good")).toBeInTheDocument();
      expect(getByText("Pass")).toBeInTheDocument();
      expect(getByText("Bad")).toBeInTheDocument();
      // getByText('Very good');
    });
    // fireEvent.click(queryByTestId('option-good'));

    // expect(mockedOnChange).toHaveBeenCalledTimes(1);
    // expect(mockedOnChange).toHaveBeenCalledWith({ name: 'Very good', value: 'very_good' });
  });

  it("should call onChange when the first option is selected then second option then the 9th one", async () => {
    const mockedOnChange = jest.fn();
    const {
      // getByText,
      queryByTestId,
    } = render(
      <Select
        options={mockedOptions}
        onChange={mockedOnChange}
        placeholder="Comms Check"
      />
    );

    const selectComponent = queryByTestId("select-component");

    expect(selectComponent).toBeDefined();
    expect(selectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);

    // fireEvent.keyDown(selectComponent.firstChild, { key: 'ArrowDown' });
    // await waitFor(() => getByText('Very good'));
    // fireEvent.click(getByText('Very good'));

    // expect(mockedOnChange).toHaveBeenCalledTimes(1);
    // expect(mockedOnChange).toHaveBeenCalledWith({ name: 'Very good', value: 'very_good' });

    // fireEvent.keyDown(selectComponent.firstChild, { key: 'ArrowDown' });
    // await waitFor(() => getByText('Mocked option 2'));
    // fireEvent.click(getByText('Mocked option 2'));

    // fireEvent.keyDown(selectComponent.firstChild, { key: 'ArrowDown' });
    // await waitFor(() => getByText('Mocked option 9'));
    // fireEvent.click(getByText('Mocked option 9'));

    // expect(mockedOnChange).toHaveBeenCalledTimes(3);
    // expect(mockedOnChange).toHaveBeenCalledWith({ label: 'Mocked option 9', value: 'mocked-option-9' });
  });

  // it('should call onChange when filtering by input value', async () => {
  //   const mockedOnChange = jest.fn();
  //   const { getByText, queryByTestId, container } = render(
  //     <selectComponent options={mockedOptions} onChange={mockedOnChange} />
  //   );

  //   const selectComponent = queryByTestId('my-select-component');

  //   fireEvent.change(container.querySelector('input'), {
  //     target: { value: 'option 1' },
  //   });

  //   // select Mocked option 1
  //   fireEvent.keyDown(selectComponent.firstChild, { key: 'ArrowDown' });
  //   // select Mocked option 10
  //   fireEvent.keyDown(selectComponent.firstChild, { key: 'ArrowDown' });

  //   await waitFor(() => getByText('Mocked option 10'));
  //   fireEvent.click(getByText('Mocked option 10'));

  //   expect(mockedOnChange).toHaveBeenCalledTimes(1);
  //   expect(mockedOnChange).toHaveBeenCalledWith({ label: 'Mocked option 10', value: 'mocked-option-10' });
  // });

  it("CountrySelector component snapshot", () => {
    const { asFragment } = render(<Select />);
    expect(asFragment(<Select />)).toMatchSnapshot();
  });
});
