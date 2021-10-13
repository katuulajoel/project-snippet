/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { showAction, performAction } from "../../../../utils/invoiceUtils";

const ActionItem = (props) => {
  const { action, invoice, children } = props;
  return showAction(action, invoice) ? (
    <a
      href="#"
      onClick={() => {
        performAction(action, invoice, props);
      }}
    >
      {children}
    </a>
  ) : null;
};

ActionItem.propTypes = {
  action: PropTypes.any, // TODO: add the acceptable prop types
  children: PropTypes.any,
  invoice: PropTypes.any,
};

export default ActionItem;
