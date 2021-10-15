import { css } from "styled-components";

const clearfix = css`
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const link = (color) => `
    color: ${color};

    &:hover, &:focus, &:active {
        color: ${color};
        text-decoration: none;
    }
`;

const scrollbar = css`
  /* width */
  &::-webkit-scrollbar {
    width: 14px;
    border: 10px solid rgba(0, 0, 0, 0);
    border-top: none;
    border-left: none;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(143, 155, 179, 0.15);
    box-shadow: 0px 4px 8px rgba(62, 72, 87, 0.04);
    background-clip: padding-box;
    border: 10px solid rgba(0, 0, 0, 0);
    border-top: none;
    border-left: none;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border: 10px solid rgba(0, 0, 0, 0);
    border-top: none;
    border-left: none;
    background-clip: padding-box;
    background-color: #8f9bb3;
    box-shadow: -1px -1px 0px rgba(62, 72, 87, 0.05);
    -webkit-box-shadow: inset -1px -1px 0px rgba(62, 72, 87, 0.05),
      inset 1px 1px 0px rgba(62, 72, 87, 0.05);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    border: 10px solid rgba(0, 0, 0, 0);
    border-top: none;
    border-left: none;
    background-clip: padding-box;
    background-color: #6b7588;
    cursor: pointer;
  }
`;

const borderBottom = css`
  border-bottom: 1px solid #062e64;
`;

export const mixins = {
  clearfix,
  link,
  borderBottom,
  scrollbar,
};
