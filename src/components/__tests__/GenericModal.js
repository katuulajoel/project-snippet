import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import GenericModal from "../GenericModal";
import { cleanup, render } from "@testing-library/react";
import store from "../../redux/store";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

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
