import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InviteUser from "../Invite/InviteUser";
import store from "../../../../redux/store";

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

  it("Check inputs value change", () => {
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
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

  it("Check form submit", () => {
    const { queryByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
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

    const userTypeInput = queryByLabelText("last_name-input");
    fireEvent.change(userTypeInput, { target: { value: "1" } });
    expect(lastNameInput.value).toBe("1");

    fireEvent.click(getByText(/Send Invite/i));
  });
});
