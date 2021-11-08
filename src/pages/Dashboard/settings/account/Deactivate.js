/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
/* ------------------------- Component dependencies ------------------------- */
import Button from "../../../../components/Button";

const ChangeEmail = ({ deactivate, page }) => {
  return (
    <form onSubmit={deactivate} aria-label="deactivate-form" id="deactivate">
      <div className="header">Deactivate account</div>
      <div>
        <Button
          className="save"
          type="submit"
          disabled={page && page.saving === "deactivate"}
        >
          {page && page.saving === "deactivate"
            ? "Deactivating your account ..."
            : "Deactivate my account"}
        </Button>
      </div>
    </form>
  );
};

ChangeEmail.propTypes = {
  deactivate: PropTypes.func,
  page: PropTypes.object,
};

export default ChangeEmail;
