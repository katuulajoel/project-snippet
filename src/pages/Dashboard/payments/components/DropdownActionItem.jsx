/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { DropdownItem } from "reactstrap";

import { showAction, performAction } from "../utils/utils";

const DropdownActionItem = (props) => {
  const { action, invoice, children } = props;
  return showAction(action, invoice) ? (
    <DropdownItem
      className="dropdown-item"
      onClick={() => {
        performAction(action, invoice, props);
      }}
    >
      {children}
    </DropdownItem>
  ) : null;
};

DropdownActionItem.propTypes = {
  action: PropTypes.any, // TODO: add the acceptable prop types
  children: PropTypes.any,
  invoice: PropTypes.any,
};

export default DropdownActionItem;
