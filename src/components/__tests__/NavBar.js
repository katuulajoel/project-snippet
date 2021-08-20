import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Router } from "react-router-dom";
// import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";
import { createMemoryHistory } from "history";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <NavBar ref={{ current: "" }} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show right title basing on url path", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NavBar ref={{ current: "" }} />
      </Router>
    );

    const dashboardTitle = screen.getByText("Dashboard");
    expect(dashboardTitle).toBeInTheDocument();

    /* history.push("/projects");
    render(
      <Router history={history}>
        <NavBar ref={{ current: "" }} />
      </Router>
    );
    expect(screen.getByText("Projects")).toBeInTheDocument(); */
  });
});
