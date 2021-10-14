import React from "react";
import { cleanup, render } from "@testing-library/react";
import CountrySelector from "../CountrySelector";

afterEach(cleanup);

describe("CountrySelector layout test", () => {
  it("CountrySelector component snapshot", () => {
    const { asFragment } = render(<CountrySelector />);

    expect(asFragment(<CountrySelector />)).toMatchSnapshot();
  });
});
