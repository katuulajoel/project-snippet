import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import CreateLayout from "../CreateLayout";
import { ThemeProvider } from "styled-components";
import theme from "../../assets/theme";

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <ThemeProvider theme={theme}>
            <CreateLayout />
          </ThemeProvider>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
