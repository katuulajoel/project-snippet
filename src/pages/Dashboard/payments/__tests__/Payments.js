import React from "react";
import renderer from "react-test-renderer";
import Payments from "../Payments";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme/build";
import * as utils from "../../../../utils/invoiceUtils";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: {
      is_admin: true,
      is_pay_admin: true,
    },
  },
  Invoice: {
    isMakingRequest: {},
    errors: {},
    summary: {},
    list: { data: [], count: 0, next: "", previous: "" },
    invoice: {},
    csv: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

export const dummyInvoice = {
  id: "42",
  project: {
    id: 1,
    user: {},
    owner: {
      display_name: "Client Tunga",
    },
    title: "Test Project (updated)",
  },
  full_title: "Test Project (updated): Pay Dami",
  subtotal: "1000.00",
  total_amount: "1000.00",
  download_url: "https://work.tunga.io/api/invoices/42/download/?format=pdf",
  due_at: "2021-06-09T23:59:59.999999",
  is_overdue: true,
  title: "Pay Dami",
  type: "sale",
  amount: "1000.00",
  number: "2021/3/P1/42",
  status: "approved",
  paid: false,
  finalized: true,
  archived: false,
  batch_ref: "7234db4d-24b9-4705-b4dc-e65f20b32e6e",
  created_at: "2021-05-26T18:05:21.072944",
};

describe("Dashboard test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <Payments data={[]} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("checks the table rows successfuly", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore(mockAppState)}>
          <Payments data={[dummyInvoice]} onLoadMore={() => {}} filter="in" />
        </Provider>
      </BrowserRouter>
    );

    var checkbox = wrapper.find(".custom-checkbox");
    expect(wrapper.find("BulkActions").exists()).toBeFalsy();
    checkbox.simulate("click");
    expect(wrapper.find("BulkActions").exists()).toBeTruthy();
    checkbox.simulate("click");
    expect(wrapper.find("BulkActions").exists()).toBeFalsy();
  });

  it("should create actions for adding invoices", () => {
    const createActionStub = jest.fn();
    mount(
      <BrowserRouter>
        <Provider store={mockAppStore(mockAppState)}>
          <Payments
            data={[dummyInvoice]}
            onLoadMore={() => {}}
            filter="in"
            setcreateAction={createActionStub}
            project={{ user: { id: 123 } }}
          />
        </Provider>
      </BrowserRouter>
    );

    expect(createActionStub).toHaveBeenCalled();
    // TODO: (@katuula) test parameters passed to function when its called
  });

  it("should open dropdown actions", async () => {
    jest.spyOn(utils, "showAction").mockReturnValueOnce(true);

    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore(mockAppState)}>
          <Payments data={[dummyInvoice]} onLoadMore={() => {}} filter="in" />
        </Provider>
      </BrowserRouter>
    );

    // TODO: unfinished test for toggle dropdown action
    //var dropdownAction = wrapper.find(".btn-group > button");
    /* expect(wrapper.find("BulkActions").exists()).toBeFalsy();
    checkbox.simulate("click");
    expect(wrapper.find("BulkActions").exists()).toBeTruthy();
    checkbox.simulate("click");
    expect(wrapper.find("BulkActions").exists()).toBeFalsy(); */
  });
});
