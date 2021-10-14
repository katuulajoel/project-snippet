import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CookieSettingForm from "../modals/CookieSettingForm";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("CookieSettingForm layout test", () => {
  it("CookieSettingForm component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CookieSettingForm />
        </Router>
      </Provider>
    );

    expect(asFragment(<CookieSettingForm />)).toMatchSnapshot();
  });
});
