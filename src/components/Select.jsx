import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  size: PropTypes.string,
  children: PropTypes.any,
};

const Select = (props) => {
  const { options = [] } = props;

  return (
    <select
      {...props}
      className={`form-control ${props.className || ""} ${
        props.size ? `form-control-${props.size}` : ""
      }`}
    >
      {props.children}
      {options &&
        options.map(({ value, name }) => {
          return (
            <option
              key={`option-${value || name}`}
              defaultValue={value || name}
              data-testid={`option-${value || name}`}
            >
              {name}
            </option>
          );
        })}
    </select>
  );
};

Select.propTypes = propTypes;

export default Select;
