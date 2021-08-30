import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavBar from "../NavBar";

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

  it("should render Dashboard title", async () => {
    const { container } = render(
      <MemoryRouter>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Dashboard");
  });

  it("should render Projects title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/projects"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Projects");
  });

  it("should render network title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/network"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Network");
  });

  it("should render payments title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/payments"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Payments");
  });

  it("should render settings title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/settings"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Settings");
  });

  it("should render tests title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/tests"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Tests");
  });

  it("should render community guide title", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/community"]}>
        <NavBar ref={{ current: "" }} />
      </MemoryRouter>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Community Guide");
  });
});
