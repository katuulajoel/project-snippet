import PropTypes from "prop-types";
import React from "react";
import loadingGif from "../assets/images/rolling.gif";

const Progress = (props) => {
  const { message } = props;
  return (
    <div {...props} className="loading" data-testid="loading">
      <img style={{ width: "20px" }} src={loadingGif} /> {message || ""}
    </div>
  );
};

Progress.propTypes = {
  message: PropTypes.string,
};

export default Progress;
