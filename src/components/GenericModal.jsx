/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { LOCATION_CHANGE } from "react-router-redux";
import { confirmable } from "react-confirm";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import Button from "./Button";
import ModalHeader from "./ModalHeader";
import store from "../store";

/* const GenericModal = (props) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const wrapperRef = useRef(null);

  const { show, proceed, dismiss, cancel, options, modalContent, modalHeader } =
    props;
  let safe_options = options || {};

  useEffect(() => {
    dispatch({ type: LOCATION_CHANGE });
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

  const renderModalHeader = () => {
    return modalHeader ? (
      React.cloneElement(modalHeader, { proceed, dismiss, cancel })
    ) : options.title ? (
      <ModalHeader {...props} />
    ) : null;
  };

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
        backdrop={
          safe_options.hideBackdrop
            ? false
            : safe_options.mustRespond
            ? "static"
            : true
        }
        keyboard={!safe_options.mustRespond}
      >
        <div ref={wrapperRef}>
          {(!options.mustRespond || safe_options.title) && renderModalHeader()}
          <ModalBody>
            <div>{renderModalContent()}</div>
            {safe_options.isPrompt && (
              <div className="form-group">
                <textarea onChange={(e) => onResponseChange(e)} />
              </div>
            )}
          </ModalBody>
          {!safe_options.hideActions && (
            <StyledModalFooter>
              {!safe_options.hideCancel && (
                <Button
                  className="cancel"
                  onClick={() => cancel()}
                  variant="secondary"
                >
                  {safe_options.cancel || "Cancel"}
                </Button>
              )}
              <Button
                className="okay"
                {...(safe_options.form || "")}
                onClick={() => {
                  if (safe_options.isPrompt) {
                    if (response) {
                      proceed(response);
                    }
                  } else {
                    if (!safe_options.form) {
                      proceed();
                    }
                  }
                }}
                disabled={safe_options.isPrompt && !response}
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
};

GenericModal.defaultProps = {
  modalHeader: null,
};

export default confirmable(GenericModal); */
