/* eslint-disable no-unused-vars */
import React from "react";
import DropdownActionItem from "../DropdownActionItem";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import * as utils from "../../utils/utils";
import { mount } from "enzyme/build";

const invoice = {
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
  type: "purchase",
  amount: "1000.00",
  number: "2021/3/P1/42",
  status: "pending",
  paid: false,
  finalized: true,
  archived: false,
  batch_ref: "7234db4d-24b9-4705-b4dc-e65f20b32e6e",
  created_at: "2021-05-26T18:05:21.072944",
};

describe("ActionItem tests", () => {
  it("Should match snapshot test", () => {
    jest.spyOn(utils, "showAction").mockReturnValueOnce(true);
    const tree = renderer
      .create(
        <BrowserRouter>
          <DropdownActionItem />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
