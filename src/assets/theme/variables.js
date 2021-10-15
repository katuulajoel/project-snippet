import { pxToRem } from "./functions";

const colors = {
  "dark-blue": "#062E64",
  gray: "#8F9BB3",
  "text-black": "#151A30",
  "text-black-normal": "#3E4857",
  "bg-color": "#f8f8f8",
};

const fontSizes = {
  "font-size-normal": pxToRem(14),
  "font-size-sm": pxToRem(14 * 0.875),
  "font-size-lg": pxToRem(14 * 1.25),
  "font-size-xl": pxToRem(14 * 1.5),
  "font-size-xxl": pxToRem(14 * 1.75),
};

export const variables = {
  colors,
  fontSizes,
};
