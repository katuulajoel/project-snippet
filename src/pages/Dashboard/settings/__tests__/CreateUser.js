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

  // it("Check form submit", () => {
  //   const { queryByLabelText } = render(
  //     <Provider store={store}>
  //       <Router>
  //         <CreateUser />
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

  //   const countryInput = queryByLabelText("country-input");
  //   fireEvent.change(countryInput, { target: { value: "0" } });
  //   expect(countryInput).toBeTruthy();
  //   expect(countryInput.value).toBe("0");

  //   const cityInput = queryByLabelText("city-input");
  //   fireEvent.change(cityInput, { target: { value: "Accra" } });
  //   expect(cityInput.value).toBe("Accra");

  //   // fireEvent.click(getByText(/Create Client/i));
  // });
});
