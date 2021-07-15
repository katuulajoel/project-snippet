/* eslint-disable react/prop-types */
import React from "react";

const Progress = ({ message }) => {
  return (
    <div className="loading" data-testid="loading">
      <img src={require("../../assets/images/rolling.gif")} /> {message || ""}
    </div>
  );
};

export default Progress;
