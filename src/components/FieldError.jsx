import React from "react";
import PropTypes from "prop-types";

const FieldError = ({ message }) => {
  return (
    <div className="error">
      {message
        ? Array.isArray(message)
          ? message.map((item, idx) => {
              return <div key={idx}>{item}</div>;
            })
          : message
        : ""}
    </div>
  );
};

FieldError.propTypes = {
  message: PropTypes.string,
};

export default FieldError;
