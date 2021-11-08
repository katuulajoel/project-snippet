import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CookieSettingForm from "../modals/CookieSettingForm";
import store from "../../../../redux/store";
import { COOKIE_OPTIONS } from "../../../../components/utils/consent";

afterEach(cleanup);

describe("CookieSettingForm layout test", () => {
  it("CookieSettingForm component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CookieSettingForm onChange={jest.fn} settings={{}} />
        </Router>
      </Provider>
    );

    expect(asFragment(<CookieSettingForm />)).toMatchSnapshot();
  });

  it("Check checkboxes", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <CookieSettingForm onChange={jest.fn} settings={{}} />
        </Router>
      </Provider>
    );

    for (let i = 0; i < COOKIE_OPTIONS.length; i++) {
      const element = COOKIE_OPTIONS[i];
      let check = getByLabelText(`check-${element.id}`);

      fireEvent.click(check);
      expect(check.checked).toEqual(false);
    }
  });
});
