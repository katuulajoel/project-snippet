import PropTypes from "prop-types";
import React from "react";

import { filterEventProps } from "../utils/events";
import { filterInputProps } from "../utils/forms";

const propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.any,
  children: PropTypes.any,
  onChange: PropTypes.func,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  grouped: PropTypes.bool,
  required: PropTypes.bool,
  testId: PropTypes.string,
};

const Select = (props) => {
  const { options = [], placeholder = "-- Select --", testId } = props;

  const onChange = (e) => {
    let choice = e.target.value;
    if (props.onChange) {
      props.onChange(choice);
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => {
      const { value, name } = option;

      return (
        <option
          key={`option-${value}`}
          value={value}
          data-testid={`option-${value}`}
        >
          {name}
        </option>
      );
    });
  };

  return (
    <div data-testid={testId ? testId : "select-component"}>
      <select
        className={`form-control ${props.className || ""} ${
          props.size ? `form-control-${props.size}` : ""
        }`}
        {...filterInputProps(props)}
        {...filterEventProps(props)}
        value={props.selected || ""}
        onChange={onChange.bind(this)}
        required={props.required}
      >
        {placeholder ? (
          <option key="option-placeholder" value="">
            {placeholder}
          </option>
        ) : null}

        {props.children ? props.children : renderOptions(options)}
      </select>
    </div>
  );
};

Select.propTypes = propTypes;

export default Select;
