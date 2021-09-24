import React from "react";
import renderer from "react-test-renderer";
import Results from "../SearchBox/Results";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme/build";
import * as actions from "../../actions/InvoiceActions";

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    search: {
      data: [{ id: 123, project: { id: 1 } }],
      next: "https://example.com",
    },
    isMakingRequest: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("SearchBox Results test", () => {
  it("Snapshot test for search results component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <Router>
            <Results searchTerm="Hello" />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show list of results from search", () => {
    const listMoreInvoicesStub = jest.spyOn(actions, "listMoreInvoices");
    const wrapper = mount(
      <Provider store={mockAppStore()}>
        <Router>
          <Results searchTerm="Hello" />
        </Router>
      </Provider>
    );

    wrapper.find("LoadMore button").simulate("click");
    expect(listMoreInvoicesStub).toHaveBeenCalledWith(
      "https://example.com",
      true
    );
  });
});
