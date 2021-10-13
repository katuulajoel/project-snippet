import React from "react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import InvoiceListContainer from "../InvoiceListContainer";
import { mount } from "enzyme/build";
import Payments from "../Payments";
import { dummyInvoice } from "./Payments";
import * as actions from "../../../../redux/actions/InvoiceActions";

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

  it("should load data on page change", async () => {
    const listInvoicesAction = jest.spyOn(actions, "listInvoices");
    const store = mockAppStore({
      Invoice: {
        list: {
          data: [dummyInvoice],
          count: 10,
        },
        isMakingRequest: {},
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <InvoiceListContainer type="in" match={{ params: { filter: "all" } }}>
            <Payments />
          </InvoiceListContainer>
        </Provider>
      </BrowserRouter>
    );

    const nextPage = wrapper.find("li.next");
    nextPage.simulate("click");

    expect(listInvoicesAction).toHaveBeenCalled();
    /* expect(listInvoicesAction).toBeCalledWith({
      page: 2,
      types: "sale,credit_nota",
    }); */
  });

  it("load new invoices on change to new status page", () => {
    // eslint-disable-next-line no-unused-vars
    const listInvoicesAction = jest.spyOn(actions, "listInvoices");

    const store = mockAppStore({
      Invoice: {
        list: {
          data: [dummyInvoice],
          count: 10,
        },
        isMakingRequest: {},
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <InvoiceListContainer type="in" match={{ params: { filter: "all" } }}>
            <Payments />
          </InvoiceListContainer>
        </Provider>
      </BrowserRouter>
    );

    // eslint-disable-next-line no-unused-vars
    const container = wrapper.find("InvoiceListContainer"); // TODO: finish up test
    // container.setProps({ match: { params: { filter: "overdue" } } });

    // expect(listInvoicesAction).toHaveBeenCalled();
    // expect(listInvoicesAction).toBeCalledWith({});
  });
});
