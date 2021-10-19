import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
// import { confirmable, createConfirmation } from "react-confirm";
// import Button from "./Button";

const ModalContainer = (props) => {
  const {
    proceedLabel,
    // cancelLabel,
    title,
    confirmation,
    show,
    proceed,
    enableEscape = true,
  } = props;
  return (
    <div className="static-modal">
      <Modal
        show={show}
        onHide={() => proceed(false)}
        backdrop={enableEscape ? true : "static"}
        keyboard={enableEscape}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmation}</Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => proceed(false)}>{cancelLabel}</Button> */}
          <button
            aria-label="save-settings"
            className="btn btn-primary save"
            // bsStyle="primary"
            onClick={() => proceed(true)}
          >
            {proceedLabel}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalContainer.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.object,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
  proceedLabel: PropTypes.any,
};

export default ModalContainer;
