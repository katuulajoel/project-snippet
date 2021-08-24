import { mount } from "enzyme/build";
import React from "react";
import { Helmet } from "react-helmet";
import MetaTags from "../MetaTags";

describe("MetaTags component test", () => {
  it("should render metadata", () => {
    mount(<MetaTags title="Page" />);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Tunga | Page");
  });
});
