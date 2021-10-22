import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import NavBar from "../NavBar";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme";

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    isMakingRequest: {},
  },
  Projects: {
    isMakingRequest: {},
    project: {},
  },
  TestResults: {
    isMakingRequest: { default: false },
    data: null,
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <BrowserRouter>
            <NavBar ref={{ current: "" }} />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render Dashboard title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Dashboard");
  });

  it("should render Projects title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/projects"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Projects");
  });

  it("should render payments title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/payments"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Payments");
  });

  it("should render settings title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/settings"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Settings");
  });

  it("should render tests title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/tests"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Tests");
  });

  it("should render community guide title", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/community"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".navbar-brand");
    expect(title.innerHTML).toEqual("Community Guide");
  });

  it("should show add new result for test.", async () => {
    const { container } = render(
      <Provider store={mockAppStore()}>
        <MemoryRouter initialEntries={["/tests"]}>
          <NavBar ref={{ current: "" }} />
        </MemoryRouter>
      </Provider>
    );
    const title = container.querySelector(".btn-primary");
    expect(title.innerHTML).toMatch(/Add New Result/i);
  });

  it("should trigger create Result when add New Result is clicked.", async () => {
    // const openModalMock = jest.fn();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <MemoryRouter initialEntries={["/tests"]}>
            <NavBar ref={{ current: "" }} />
          </MemoryRouter>
        </Provider>
      </BrowserRouter>
    );
    wrapper.find("#createResult").first().simulate("click");
    // expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});
