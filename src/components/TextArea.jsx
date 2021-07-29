import PropTypes from "prop-types";
import React from "react";

import { addEventListeners, INPUT_EVENTS } from "./utils/events";
import { filterInputProps } from "./utils/forms";

const TextArea = (props) => {
  return (
    <textarea
      className={`form-control ${props.className || ""}`}
      placeholder={props.placeholder}
      required={props.required}
      {...filterInputProps(props)}
      {...addEventListeners(INPUT_EVENTS, props)}
    >
      {props.children}
    </textarea>
  );
};

TextArea.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.array,
  required: PropTypes.bool,
};

TextArea.defaultProps = {
  type: "text",
};

export default TextArea;
