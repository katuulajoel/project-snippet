import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InviteUser from "../Invite/InviteUser";
import store from "../../../../store";

afterEach(cleanup);

describe("InviteUser comp test", () => {
  it("InviteUser component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
        </Router>
      </Provider>
    );

    expect(asFragment(<InviteUser />)).toMatchSnapshot();
  });

  it("Check 4 Labels render correctly on initial mount", () => {
    const { getAllByLabelText } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
        </Router>
      </Provider>
    );

    expect(getAllByLabelText("label")).toHaveLength(4);
  });

  it("Check User category Label does not render on initial mount", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
        </Router>
      </Provider>
    );

    expect(queryByText("User category")).toBeFalsy();
  });
});
