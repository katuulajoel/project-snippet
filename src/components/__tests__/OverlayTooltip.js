import { mount } from "enzyme/build";
import React from "react";
import OverlayTooltip from "../OverlayTooltip";

describe("Overlay tooltip test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    div.setAttribute("id", "tooltip");
    document.body.appendChild(div);
    mount(<OverlayTooltip tooltipId="tooltip" />);
  });
});
