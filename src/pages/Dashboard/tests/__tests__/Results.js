import React from "react";
import renderer from "react-test-renderer";
import Results from "../Results";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render, fireEvent, waitFor } from "@testing-library/react";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: {
      is_admin: true,
      is_pay_admin: true,
    },
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

export const dummyResult = {
  id: 10,
  comms_check: "very_good",
  mbti_profile: "entj",
  iq_test: 100,
  sa_test: 100,
  code_of_conduct: 100,
  coding_tests: [
    {
      skill: 1,
      score: 100,
      id: 12,
      skill_name: "react",
    },
  ],
  user_obj: {
    id: 16,
    username: "wd",
    email: "wd@tunga.io",
    first_name: "wd",
    last_name: "dw",
    display_name: "Wd Dw",
    short_name: "Wd",
    type: 1,
    avatar_url: null,
  },
};

export const dummyResults = [
  {
    id: 10,
    comms_check: "very_good",
    mbti_profile: "entj",
    iq_test: 140,
    sa_test: 100,
    code_of_conduct: 100,
    coding_tests: [
      {
        skill: 1,
        score: 100,
        id: 12,
        skill_name: "react",
      },
    ],
    user_obj: {
      id: 16,
      username: "wd",
      email: "wd@tunga.io",
      first_name: "wd",
      last_name: "dw",
      display_name: "Wd Dw",
      short_name: "Wd",
      type: 1,
      image: null,
      avatar_url: null,
    },
  },
  {
    id: 11,
    comms_check: "pass",
    mbti_profile: "entj",
    iq_test: 80,
    sa_test: 50,
    code_of_conduct: 100,
    coding_tests: [
      {
        skill: 1,
        score: 20,
        id: 12,
        skill_name: "react",
      },
    ],
    user_obj: {
      id: 18,
      username: "al",
      email: "al@tunga.io",
      first_name: "al",
      last_name: "la",
      display_name: "al la",
      short_name: "al",
      type: 1,
      avatar_url: null,
    },
  },
  {
    id: 12,
    comms_check: "poor",
    mbti_profile: "entj",
    iq_test: 112,
    sa_test: 50,
    code_of_conduct: 100,
    coding_tests: [
      {
        skill: 1,
        score: 20,
        id: 12,
        skill_name: "react",
      },
    ],
    user_obj: {
      id: 20,
      username: "bb",
      email: "bb@tunga.io",
      first_name: "bb",
      last_name: "sb",
      display_name: "bb sb",
      short_name: "bb",
      type: 1,
      avatar_url: null,
    },
  },
];

const count = dummyResults.length;
const props = {
  results: dummyResults,
  count,
};

describe("Dashboard test - Test Results", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <Results {...props} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Check inputs value change", async () => {
    const mockedOnChange = jest.fn();
    const { queryByTestId, getByText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={mockAppStore(mockAppState)}>
          <Results {...props} setlimit={mockedOnChange} />
        </Provider>
      </BrowserRouter>
    );

    const selectComponent = queryByTestId("select-component");
    const userHeader = getByText("User");
    const codingTestsHeader = getByText("Coding Tests");

    expect(selectComponent).toBeDefined();
    expect(userHeader).toBeDefined();
    expect(codingTestsHeader).toBeDefined();
    expect(selectComponent).not.toBeNull();
    // expect(mockedOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(selectComponent.firstChild, { key: "ArrowDown" });
    await waitFor(() => {
      expect(getByText("20")).toBeInTheDocument();
    });
    const option50 = getByTestId("option-50");
    const option100 = getByTestId("option-100");
    expect(option50).toBeDefined();
    expect(option100).toBeDefined();
  });
});
