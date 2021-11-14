import React from "react";

const Loading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 50 50"
    style={{ strokeWidth: "0" }}
  >
    <path d="M25.3 6.5c-10.3 0-18.7 8.4-18.7 18.7h4.1c0-8.1 6.5-14.6 14.6-14.6V6.5z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default Loading;
