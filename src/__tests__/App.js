import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "../App";
import configureStore from "redux-mock-store";
import * as AuthActions from "../redux/actions/AuthActions";

const middlewares = [thunk];

const mockHistoryPush = jest.fn();

const mockUseLocationValue = {
  pathname: "/dashboard",
  search: "",
  hash: "",
  state: null,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
    location: mockUseLocationValue,
  }),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

jest.mock("../hooks/usePrevious", () => ({
  __esModule: true,
  default: () => ({ logout: true }),
}));

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "katuula@gmail.com" },
    isMakingRequest: {},
  },
  Invoice: { search: {} },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("App.js", () => {
  it("Snapshot test for App component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore()}>
            <App />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should redirect if authenticated", async () => {
    render(
      <MemoryRouter>
        <Provider
          store={mockAppStore({
            Auth: { user: { id: 123456 }, isMakingRequest: {} },
          })}
        >
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should verify if users id is null", () => {
    const verifyStub = jest.spyOn(AuthActions, "verify");
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Provider
          store={mockAppStore({
            Auth: { user: {}, isMakingRequest: {} },
            Invoice: { search: {} },
            Projects: {
              project: {},
              isMakingRequest: {},
              projects: { results: [], next: null },
            },
          })}
        >
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(verifyStub).toHaveBeenCalled();
  });

  it("should redirect to login page if logged out", () => {
    const store = mockAppStore({
      Auth: { user: {}, isMakingRequest: {} },
      Invoice: { search: {} },
    });
    mockUseLocationValue.pathname = "/projects";
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should remain on page if user is authenticatted", () => {
    const store = mockAppStore({
      Auth: { user: { id: 123 }, isMakingRequest: {} },
      Invoice: { search: {} },
    });
    mockUseLocationValue.pathname = "/projects";
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(mockHistoryPush).toHaveBeenCalledWith("/projects");
  });
});
