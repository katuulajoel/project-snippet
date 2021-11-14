import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InviteUser from "../Invite/InviteUser";
import store from "../../../../redux/store";
import axios from "axios";

afterEach(cleanup);

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
    request: jest.fn(),
  };
});

describe("InviteUser comp test", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
    axios.request.mockReturnValue(
      Promise.reject({
        response: { data: { email: ["User email already exists"] } },
      })
    );
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

  it("Check form submit successfully", async () => {
    // axios.post.mockReturnValue(Promise.resolve({}));
    axios.request.mockReturnValue(Promise.resolve({ data: [] }));
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

    const userTypeInput = queryByLabelText("type-input");
    fireEvent.change(userTypeInput, { target: { value: "1" } });
    expect(userTypeInput.value).toBe("1");

    fireEvent.click(getByText(/Send Invite/i));

    await waitFor(
      () =>
        expect(getByText(/Invitation Successfully Sent/i)).toBeInTheDocument(),
      {
        timeout: 6000, // wait 3s
      }
    );
  });
});
