import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mount from "enzyme/build/mount";
import * as actions from "../../actions/InvoiceActions";

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
    jest.spyOn(actions, "listInvoices").mockReturnValue();
    const wrapper = mount(
      <Provider store={mockAppStore()}>
        <SearchBox />
      </Provider>
    );

    //console.log(wrapper.debug());

    const searchInput = wrapper.find("input");
    console.log(searchInput.debug());

    // searchInput.simulate("change", { target: { value: "Hello" } });
  });
});
