import React from "react";
import { render, cleanup } from "@testing-library/react";
import CountrySelector from "../CountrySelector";

afterEach(cleanup);

describe("Select component test", () => {
  it("CountrySelector component snapshot", () => {
    const { asFragment } = render(<CountrySelector />);
    expect(asFragment(<CountrySelector />)).toMatchSnapshot();
  });
});
