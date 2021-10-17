/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { confirmable } from "react-confirm";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import Button from "./Button";
import store from "../redux/store";
// import ModalHeader from "./ModalHeader";

const GenericModal = (props) => {
  const [response] = useState(null);
  const wrapperRef = useRef(null);

  const { show, proceed, dismiss, cancel, options } = props;
  let safe_options = options || {};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    let safe_options = options || {};
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      safe_options.dismissAsCancel ? cancel() : dismiss();
    }
  };

  return (
    <Provider store={store}>
      <Modal
        style={safe_options.style}
        isOpen={show}
        toggle={dismiss}
        className={`${safe_options.size ? `modal-${safe_options.size}` : ""} ${
          safe_options.className || ""
        }`}
      >
        <div ref={wrapperRef}>
          <ModalBody>
            <div>{props.children}</div>
          </ModalBody>
          {!safe_options.hideActions && (
            <StyledModalFooter>
              <Button
                className="okay"
                {...(safe_options.form || "")}
                onClick={() => proceed(response)}
              >
                {safe_options.ok || "OK"}
              </Button>
            </StyledModalFooter>
          )}
        </div>
      </Modal>
    </Provider>
  );
};

const StyledModalFooter = styled(ModalFooter)`
  padding-bottom: 20px;
  padding-top: 20px;
  background: rgba(237, 241, 247, 0.25);

  button {
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin: 0;

    &.cancel {
      border: 1px solid #3e4857;
      color: #3e4857;
      background-color: #fff;
      margin-right: 16px;
    }

    &.okay {
      color: #fff;
      background-color: #da3451;
      border-color: #da3451;
    }
  }
`;

GenericModal.propTypes = {
  show: PropTypes.bool,
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  modalContent: PropTypes.any,
  options: PropTypes.object,
  modalHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
    PropTypes.object,
  ]),
  children: PropTypes.any,
};

GenericModal.defaultProps = {
  modalHeader: null,
};

export default confirmable(GenericModal);
