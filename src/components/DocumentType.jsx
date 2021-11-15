import React from "react";
import PropTypes from "prop-types";

import ChoiceGroup from "./ChoiceGroup";

const DocumentType = () => {
  const makeChoice = () => {
    /* if (onChange) {
      onChange(type);
    } */
  };

  let choices = [
    ["file", "Upload file", "upload"],
    ["url", "Insert url", "link"],
  ];

  return (
    <div className="text-center">
      <ChoiceGroup variant="card" choices={choices} onChange={makeChoice} />
    </div>
  );
};

DocumentType.propTypes = {
  onChange: PropTypes.func,
};

export default DocumentType();
