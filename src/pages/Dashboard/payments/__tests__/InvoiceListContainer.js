import React from "react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import InvoiceListContainer from "../InvoiceListContainer";
import { mount } from "enzyme/build";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "test@gmail.com" },
    isMakingRequest: {},
  },
  Invoice: {
    list: {},
    isMakingRequest: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Invoice list container", () => {
  it("should render children", async () => {
    const store = mockAppStore();
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <InvoiceListContainer match={{ params: { filter: "in" } }}>
            <></>
          </InvoiceListContainer>
        </Provider>
      </BrowserRouter>
    );

    const expectedActions = [
      {
        type: "LIST_INVOICES_START",
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should show progress component", async () => {
    const store = mockAppStore({
      Auth: {
        user: {},
        isMakingRequest: {},
      },
      Invoice: {
        list: {},
        isMakingRequest: { list: true },
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <InvoiceListContainer match={{ params: { filter: "in" } }}>
            <></>
          </InvoiceListContainer>
        </Provider>
      </BrowserRouter>
    );

    expect(wrapper.find("Progress").exists()).toBeTruthy();
  });
});
