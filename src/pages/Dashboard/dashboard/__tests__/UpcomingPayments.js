import React from "react";
import renderer from "react-test-renderer";
import UpcomingPayments from "../UpcomingPayments";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

const state = {
  Dashboard: {
    notifications: {
      invoices: [
        {
          due_at: "2020-09-22T23:59:59.999999",
          full_title: "Test project 2 (update): Milestone 3",
          id: 8,
          is_overdue: true,
          issued_at: "2020-09-08T18:21:05",
          title: "Milestone 3",
          project: { id: 123 },
        },
      ],
    },
    isMakingRequest: {},
  },
  Invoice: {
    search: {},
  },
};

describe("Latest reports test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(state)}>
            <UpcomingPayments />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
