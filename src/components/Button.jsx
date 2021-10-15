import PropTypes from "prop-types";
import React from "react";

import { addEventListeners, BUTTON_EVENTS } from "../utils/events";
import { filterButtonProps } from "../utils/forms";

const Button = (props) => {
  return (
    <button
      type={props.type}
      form={props.form}
      className={`btn ${props.variant ? `btn-${props.variant}` : ""} ${
        props.className || ""
      } ${props.block ? "btn-block" : ""} ${
        props.size ? `btn-${props.size}` : ""
      }`}
      {...filterButtonProps(props)}
      {...addEventListeners(BUTTON_EVENTS, props)}
      data-tip={props["data-tip"]}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  form: null,
  variant: "default",
  block: false,
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  children: PropTypes.any,
  form: PropTypes.string,
  "data-tip": PropTypes.string,
};

export default Button;
