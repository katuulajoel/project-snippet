import React from "react";
import { cleanup, render } from "@testing-library/react";
import Select from "../Select";

afterEach(cleanup);

describe("CountrySelector layout test", () => {
  it("CountrySelector component snapshot", () => {
    const { asFragment } = render(<Select />);
    expect(asFragment(<Select />)).toMatchSnapshot();
  });
});
