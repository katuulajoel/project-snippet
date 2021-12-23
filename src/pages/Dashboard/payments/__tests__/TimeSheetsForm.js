import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import TimeSheetsForm from "../TimeSheetsForm";
import { fireEvent, render, screen } from "@testing-library/react";

const mockAppState = {
  Projects: {
    isMakingRequest: {},
    project: { id: 123 },
    timesheets: {
      results: [
        {
          month: "12-12-12",
        },
      ],
    },
  },
};

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("TimeSheets Form tests", () => {
  it("TimeSheetsForm component snapshot", () => {
    const { asFragment } = render(
      <Provider store={mockAppStore()}>
        <TimeSheetsForm
          timeSheet={{
            data: {
              users: [
                {
                  hours: 23,
                  hours_per_week: 0,
                  user: { display_name: "John Doe" },
                },
              ],
            },
          }}
          project={{ participation: [] }}
        />
      </Provider>
    );
    expect(asFragment(<TimeSheetsForm />)).toMatchSnapshot();
  });

  it("should chnage users timesheet", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={mockAppStore()}>
        <TimeSheetsForm
          timeSheet={{
            data: {
              users: [
                {
                  hours: 23,
                  hours_per_week: 0,
                  user: { display_name: "John Doe" },
                },
              ],
            },
          }}
          project={{ participation: [] }}
          index={11}
          currentYear={2021}
        />
      </Provider>
    );
    fireEvent.change(getByPlaceholderText("Enter total hours worked"), {
      target: { value: 12 },
    });
    screen.debug();

    fireEvent.click(getByText("Save timesheet"));
  });
});
