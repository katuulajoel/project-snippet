import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GenericModal from "../GenericModal";
import store from "../../redux/store";

afterEach(cleanup);

describe("GenericModal layout test", () => {
  it("GenericModal component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <GenericModal />
        </Router>
      </Provider>
    );

    expect(asFragment(<GenericModal />)).toMatchSnapshot();
  });
});
