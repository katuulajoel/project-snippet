/* eslint-disable react/prop-types */
import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount } from "enzyme/build";
import * as actions from "../../redux/actions/InvoiceActions";
import * as sinon from "sinon";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Invoice: { search: {} },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

function mockComponent(componentName) {
  return (props) => {
    return (
      <mocked originalComponent={componentName} {...props}>
        {props.children}
        <button onClick={() => props.clearSearch()}>clear search</button>
      </mocked>
    );
  };
}

jest.mock("../SearchBox/Results", () => {
  return mockComponent("Results");
});
jest.useFakeTimers();

describe("Search Box test", () => {
  it("Snapshot test for Searchbox index component", () => {
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
    const wrapper = mount(
      <Provider store={mockAppStore()}>
        <SearchBox />
      </Provider>
    );
    const searchInput = wrapper.find("input");
    searchInput.simulate("change", { target: { value: "search term" } });

    const clearBtn = wrapper.find("mocked button");
    clearBtn.simulate("click");
    expect(searchInput.instance().value).toEqual("");
  });
});

describe("search box debounce", () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("should call list invoices after 0.5 sec of input change", () => {
    const listInvoicesStub = jest.spyOn(actions, "listInvoices");
    const wrapper = mount(
      <Provider store={mockAppStore()}>
        <SearchBox />
      </Provider>
    );
    const searchInput = wrapper.find("input");
    searchInput.simulate("change", { target: { value: "search term" } });

    expect(listInvoicesStub).toHaveBeenCalledTimes(0);

    // wait 1000ms
    clock.tick(500);

    expect(listInvoicesStub).toHaveBeenCalledTimes(1);
    expect(listInvoicesStub).toHaveBeenCalledWith(
      { search: "search term", page_size: 3 },
      true
    );
  });
});
