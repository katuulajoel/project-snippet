import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateUser from "../Invite/CreateUser";
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

describe("CreateUser comp test", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("Check form submit", () => {
    axios.post.mockReturnValue(Promise.resolve({ data: [] }));
    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <CreateUser
            countries={[
              { code: "NL", name: "The Netherlands" },
              { code: "UG", name: "Uganda" },
            ]}
          />
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

    const companyInput = queryByLabelText("company-input");
    fireEvent.change(companyInput, { target: { value: "tunga" } });
    expect(companyInput.value).toBe("tunga");

    const vatInput = queryByLabelText("vat_number-input");
    fireEvent.change(vatInput, { target: { value: "009900" } });
    expect(vatInput.value).toBe("009900");

    const streetInput = queryByLabelText("street-input");
    fireEvent.change(streetInput, { target: { value: "P . O . Box" } });
    expect(streetInput.value).toBe("P . O . Box");

    const plotInput = queryByLabelText("plot_number-input");
    fireEvent.change(plotInput, { target: { value: "2000" } });
    expect(plotInput.value).toBe("2000");

    const postalCodeInput = queryByLabelText("postal_code-input");
    fireEvent.change(postalCodeInput, { target: { value: "00233" } });
    expect(postalCodeInput.value).toBe("00233");

    const countryInput = getByLabelText("country-input");

    fireEvent.change(countryInput, { target: { value: "Uganda" } });
    expect(countryInput.value).toBe("Uganda");

    const cityInput = queryByLabelText("city-input");
    fireEvent.change(cityInput, { target: { value: "Accra" } });
    expect(cityInput.value).toBe("Accra");

    fireEvent.click(queryByLabelText("submit"));
  });

  // it("Check Create client form submit successfully", async () => {
  //   axios.post.mockReturnValue(Promise.resolve({ data: [] }));

  //   const { queryByLabelText, getByLabelText } = render(
  //     <Provider store={store}>
  //       <Router>
  //         <CreateUser
  //           countries={[
  //             { code: "NL", name: "The Netherlands" },
  //             { code: "UG", name: "Uganda" },
  //           ]}
  //         />
  //       </Router>
  //     </Provider>
  //   );

  //   const emailInput = queryByLabelText("email-input");
  //   fireEvent.change(emailInput, { target: { value: "ms@gm.com" } });
  //   expect(emailInput.value).toBe("ms@gm.com");

  //   const firstNameInput = queryByLabelText("first_name-input");
  //   fireEvent.change(firstNameInput, { target: { value: "Kwame" } });
  //   expect(firstNameInput.value).toBe("Kwame");

  //   const lastNameInput = queryByLabelText("last_name-input");
  //   fireEvent.change(lastNameInput, { target: { value: "Mensah" } });
  //   expect(lastNameInput.value).toBe("Mensah");

  //   const companyInput = queryByLabelText("company-input");
  //   fireEvent.change(companyInput, { target: { value: "tunga" } });
  //   expect(companyInput.value).toBe("tunga");

  //   const vatInput = queryByLabelText("vat_number-input");
  //   fireEvent.change(vatInput, { target: { value: "009900" } });
  //   expect(vatInput.value).toBe("009900");

  //   const streetInput = queryByLabelText("street-input");
  //   fireEvent.change(streetInput, { target: { value: "P . O . Box" } });
  //   expect(streetInput.value).toBe("P . O . Box");

  //   const plotInput = queryByLabelText("plot_number-input");
  //   fireEvent.change(plotInput, { target: { value: "2000" } });
  //   expect(plotInput.value).toBe("2000");

  //   const postalCodeInput = queryByLabelText("postal_code-input");
  //   fireEvent.change(postalCodeInput, { target: { value: "00233" } });
  //   expect(postalCodeInput.value).toBe("00233");

  //   const countryInput = getByLabelText("country-input");

  //   fireEvent.change(countryInput, { target: { value: "Uganda" } });
  //   expect(countryInput.value).toBe("Uganda");

  //   const cityInput = queryByLabelText("city-input");
  //   fireEvent.change(cityInput, { target: { value: "Accra" } });
  //   expect(cityInput.value).toBe("Accra");

  //   fireEvent.click(queryByLabelText("submit"));

  //   await waitFor(() => {}, {
  //     timeout: 2000, // wait 3s
  //   });
  // });
});
