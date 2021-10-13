/* eslint-disable no-unused-vars */
import React from "react";
import PaymentStatus, { BatchStatus } from "../PaymentStatus";
import renderer from "react-test-renderer";
import * as utils from "../../../../../utils/invoiceUtils";
import mount from "enzyme/build/mount";

const invoice = {
  due_at: "2021-06-09T23:59:59.999999",
  is_overdue: true,
  status: "pending",
  paid: false,
  finalized: true,
  archived: false,
  created_at: "2021-05-26T18:05:21.072944",
};

describe("Payment Status tests", () => {
  it("Should match snapshot test for payments", () => {
    jest.spyOn(utils, "showAction").mockReturnValueOnce(true);
    const tree = renderer.create(<PaymentStatus invoice={invoice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should match snapshot test for payouts batch", () => {
    jest.spyOn(utils, "showAction").mockReturnValueOnce(true);
    const tree = renderer.create(<BatchStatus batch={invoice} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render the right payment status", () => {
    let current = new Date();
    let previous = new Date(current.getTime() - 86400000); // + 1 day in ms
    const wrapper = mount(
      <PaymentStatus
        invoice={{ due_at: previous.toISOString(), paid: false }}
      />
    );

    let status = wrapper.find("span");
    expect(wrapper.text().includes("Overdue")).toBe(true);
    wrapper.setProps({
      invoice: { due_at: previous.toISOString(), paid: true },
    });

    let next = new Date(current.getTime() + 86400000); // + 1 day in ms
    wrapper.setProps({
      invoice: { due_at: next.toISOString(), paid: false },
    });
    expect(wrapper.text().includes("Pending")).toBe(true);
  });

  it("should render the right batch status", () => {
    let current = new Date();
    let previous = new Date(current.getTime() - 86400000); // + 1 day in ms
    const wrapper = mount(
      <BatchStatus batch={{ due_at: previous.toISOString(), paid: false }} />
    );

    let status = wrapper.find("span");
    expect(wrapper.text().includes("Overdue")).toBe(true);
    wrapper.setProps({
      batch: { due_at: previous.toISOString(), paid: true },
    });

    wrapper.setProps({
      batch: {
        due_at: previous.toISOString(),
        paid: false,
        status: "approved",
      },
    });
    expect(wrapper.text().includes("Processing")).toBe(true);

    let next = new Date(current.getTime() + 86400000); // + 1 day in ms
    wrapper.setProps({
      batch: { due_at: next.toISOString(), paid: false },
    });
    expect(wrapper.text().includes("Pending")).toBe(true);
  });
});
