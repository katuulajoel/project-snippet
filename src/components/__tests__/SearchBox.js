import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, fireEvent } from "@testing-library/react";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Invoice: { search: {} },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <SearchBox />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should clear search input", () => {
    // jest.spyOn(actions, "listInvoices").mockReturnValue();
    jest.mock("../SearchBox/Results", () => {
      const Results = () => <div>Katuula joel</div>;
      return Results;
    });
    const utils = render(
      <Provider store={mockAppStore()}>
        <SearchBox />
      </Provider>
    );
    // eslint-disable-next-line no-unused-vars
    const searchInput = utils.getByPlaceholderText("Search....");
    // fireEvent.change(searchInput, { target: { value: "Hello" } });
  });
});
