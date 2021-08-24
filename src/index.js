import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

export const ReactStrictMode = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

export const rootElement = document.getElementById("root");

const renderApp = () => render(ReactStrictMode, rootElement);

export function moduleHotAccept(mod) {
  if (process.env.NODE_ENV !== "production" && mod && mod.hot) {
    mod.hot.accept("./App", renderApp);
  }
}

moduleHotAccept(module);

renderApp();
