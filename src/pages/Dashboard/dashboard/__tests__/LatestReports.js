import React from "react";
import renderer from "react-test-renderer";
import LatestReports from "../LatestReports";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import theme from "../../../../assets/theme";

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Latest reports test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider
            store={mockAppStore({
              Dashboard: {
                notifications: {
                  events: [
                    {
                      id: 1,
                      title: "title",
                      project: { id: 1, title: "title" },
                    },
                  ],
                },
              },
            })}
          >
            <ThemeProvider theme={theme}>
              <LatestReports />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
