import React from "react";
import PropTypes from "prop-types";

const CountrySelector = ({ ...props }) => {
  return (
    <select {...props}>
      {props.data &&
        props.data.map((item, i) => {
          return (
            <option key={i} defaultValue={item.name}>
              {item.name}
            </option>
          );
        })}
    </select>
  );
};

CountrySelector.propTypes = {
  data: PropTypes.array,
};

export default CountrySelector;
