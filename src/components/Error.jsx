import PropTypes from "prop-types";
import React from "react";

import Icon from "./Icon";

const Error = ({ message }) => {
  return (
    <div className="alert alert-danger">
      <Icon name="attention" /> {message || ""}
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
