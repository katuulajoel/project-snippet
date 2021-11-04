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
import ModalHeader from "./ModalHeader";

const GenericModal = ({
  show,
  proceed,
  dismiss,
  cancel,
  options = {},
  modalContent,
}) => {
  const [response, setResponse] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const renderModalContent = () => {
    return typeof modalContent === "string"
      ? modalContent
      : React.cloneElement(modalContent, { proceed, dismiss, cancel });
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      options.dismissAsCancel ? cancel() : dismiss();
    }
  };

  return (
    <Provider store={store}>
      <Modal
        style={options.style}
        isOpen={show}
        toggle={dismiss}
        className={`${options.size ? `modal-${options.size}` : ""} ${
          options.className || ""
        }`}
        backdrop={
          options.hideBackdrop ? false : options.mustRespond ? "static" : true
        }
        keyboard={!options.mustRespond}
      >
        <div ref={wrapperRef}>
          {(!options.mustRespond || options.title) && (
            <ModalHeader
              proceed={proceed}
              dismiss={dismiss}
              cancel={cancel}
              options={options}
            />
          )}
          <ModalBody>
            <div>{renderModalContent()}</div>
            {options.isPrompt && (
              <div className="form-group">
                <textarea onChange={(e) => onResponseChange(e)} />
              </div>
            )}
          </ModalBody>
          {!options.hideActions && (
            <StyledModalFooter>
              {!options.hideCancel && (
                <Button
                  className="cancel"
                  onClick={() => cancel()}
                  variant="secondary"
                >
                  {options.cancel || "Cancel"}
                </Button>
              )}
              <Button
                className="okay"
                {...(options.form || "")}
                onClick={() => {
                  if (options.isPrompt) {
                    if (response) {
                      proceed(response);
                    }
                  } else {
                    if (!options.form) {
                      proceed();
                    }
                  }
                }}
                disabled={options.isPrompt && !response}
              >
                {options.ok || "OK"}
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
};

GenericModal.defaultProps = {
  modalHeader: null,
};

export default confirmable(GenericModal);
