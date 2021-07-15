import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App.js", () => {
    it("Snapshot test for App component", () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
