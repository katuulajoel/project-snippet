/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";

/* -------------------------- Internak Dependencies ------------------------- */
import Icon from "../../../../components/Icon";

/* --------------------------- Component Proptypes -------------------------- */
const proptypes = {
  attachments: PropTypes.array,
};

const Attachments = (props) => {
  const { attachments } = props;
  return (
    <div className="attachments">
      {attachments.map((attachment) => {
        return (
          <div key={attachment.id} className="file">
            <a href={attachment.url} target="_blank" rel="noreferrer">
              <Icon name="download" /> {attachment.name}{" "}
              <strong>[{attachment.display_size}]</strong>
            </a>
          </div>
        );
      })}
    </div>
  );
};

Attachments.propTypes = proptypes;

export default Attachments;
