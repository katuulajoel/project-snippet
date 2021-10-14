import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateUser from "../Invite/CreateUser";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("CreateUser comp test", () => {
  it("CreateUser component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CreateUser />
        </Router>
      </Provider>
    );

    expect(asFragment(<CreateUser />)).toMatchSnapshot();
  });

  it("Check 10 Labels render correctly on initial mount", () => {
    const { getAllByLabelText } = render(
      <Provider store={store}>
        <Router>
          <CreateUser />
        </Router>
      </Provider>
    );

    expect(getAllByLabelText("label")).toHaveLength(10);
  });

  it("Check inputs value change", () => {
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Router>
          <CreateUser />
        </Router>
      </Provider>
    );

    const emailInput = queryByLabelText("email-input");
    fireEvent.change(emailInput, { target: { value: "ms@gm.com" } });
    expect(emailInput.value).toBe("ms@gm.com");

    const firstNameInput = queryByLabelText("first_name-input");
    fireEvent.change(firstNameInput, { target: { value: "Kwame" } });
    expect(firstNameInput.value).toBe("Kwame");

    const lastNameInput = queryByLabelText("last_name-input");
    fireEvent.change(lastNameInput, { target: { value: "Mensah" } });
    expect(lastNameInput.value).toBe("Mensah");
  });
});
