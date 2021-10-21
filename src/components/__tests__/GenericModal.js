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
          <GenericModal
            show={jest.fn()}
            proceed={jest.fn()}
            dismiss={jest.fn()}
            cancel={jest.fn()}
            options={{}}
            modalContent={<h1>Header</h1>}
          />
        </Router>
      </Provider>
    );
    expect(asFragment(<GenericModal />)).toMatchSnapshot();
  });
});
