import PropTypes from "prop-types";
import React from "react";

import { addEventListeners, BUTTON_EVENTS } from "./utils/events";
import { filterButtonProps } from "./utils/forms";

const Icon = (props) => {
  return (
    <i
      className={`tg-ic-${props.name || ""} ${props.size ? `tunga-ic-sz-${props.size}` : ""} ${props.className || ""}`}
      {...filterButtonProps(props)}
      {...addEventListeners(BUTTON_EVENTS, props)}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
