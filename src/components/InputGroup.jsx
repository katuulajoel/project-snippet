import PropTypes from "prop-types";
import React from "react";

import Input from "./Input";
import { addPropsToChildren } from "./utils/children";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

const InputGroup = (props) => {
  const {
    className,
    prepend,
    isPrependText,
    type,
    size,
    placeholder,
    append,
    isAppendText,
    appendFunc,
    value,
  } = props;
  return (
    <div className={`input-group ${className || ""}`}>
      {prepend ? (
        <span className="input-group-prepend">
          {isPrependText ? (
            <span className="input-group-text">{prepend}</span>
          ) : (
            prepend
          )}
        </span>
      ) : null}
      <Input
        type={type}
        className="form-control"
        size={size}
        placeholder={placeholder}
        {...filterInputProps(props)}
        {...filterEventProps(props)}
      />
      {append && (
        <span className="input-group-prepend">
          {isAppendText ? (
            <span className="input-group-text">{append}</span>
          ) : appendFunc ? (
            value !== "" &&
            addPropsToChildren(append, {
              onClick: () => appendFunc(this),
            })
          ) : (
            append
          )}
        </span>
      )}
    </div>
  );
};

InputGroup.defaultProps = {
  isPrependText: true,
  isAppendText: true,
};

InputGroup.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  prepend: PropTypes.object,
  append: PropTypes.object,
  isPrependText: PropTypes.bool,
  isAppendText: PropTypes.bool,
  appendFunc: PropTypes.func,
  size: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default InputGroup;
