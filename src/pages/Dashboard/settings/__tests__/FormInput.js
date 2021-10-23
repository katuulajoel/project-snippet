import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FormInput from "../account/FormInput";
import store from "../../../../redux/store";

afterEach(cleanup);
describe("FormInput layout test", () => {
  it("Snapshot test for FormInput component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <FormInput />
        </Router>
      </Provider>
    );

    expect(asFragment(<FormInput />)).toMatchSnapshot();
  });
});
