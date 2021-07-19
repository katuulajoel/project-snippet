/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import { LOCATION_CHANGE } from "react-router-redux";
import { confirmable } from "react-confirm";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import Button from "./Button";
import TextArea from "./TextArea";
import store from "../../store";
// import ModalHeader from "../../dashboard/projects/common/modals/Header";

class GenericModal extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    modalHeader: null,
  };

  constructor(props) {
    super(props);
    this.state = { response: null };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    store.dispatch({ type: LOCATION_CHANGE });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  onResponseChange(e) {
    this.setState({ response: e.target.value });
  }

  renderModalContent() {
    const { proceed, dismiss, cancel, modalContent } = this.props;

    return typeof modalContent === "string"
      ? modalContent
      : React.cloneElement(modalContent, { proceed, dismiss, cancel });
  }

  //   renderModalHeader() {
  //     const { proceed, dismiss, cancel, modalHeader } = this.props;

  //     return modalHeader ? (
  //       React.cloneElement(modalHeader, { proceed, dismiss, cancel })
  //     ) : this.props.options.title ? (
  //       <ModalHeader {...this.props} />
  //     ) : null;
  //   }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const { dismiss, cancel, options } = this.props;
    let safe_options = options || {};
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      safe_options.dismissAsCancel ? cancel() : dismiss();
    }
  }

  render() {
    const { show, proceed, dismiss, cancel, options } = this.props;
    let safe_options = options || {};

    return (
      <Provider store={store}>
        <Modal
          style={safe_options.style}
          isOpen={show}
          toggle={dismiss}
          className={`${
            safe_options.size ? `modal-${safe_options.size}` : ""
          } ${safe_options.className || ""}`}
          backdrop={
            safe_options.hideBackdrop
              ? false
              : safe_options.mustRespond
              ? "static"
              : true
          }
          keyboard={!safe_options.mustRespond}
        >
          <div ref={this.wrapperRef}>
            {!options.mustRespond || safe_options.title
              ? this.renderModalHeader()
              : null}
            <ModalBody>
              <div>{this.renderModalContent()}</div>
              {safe_options.isPrompt ? (
                <div className="form-group">
                  <TextArea onChange={this.onResponseChange.bind(this)} />
                </div>
              ) : null}
            </ModalBody>
            {safe_options.hideActions ? null : (
              <StyledModalFooter>
                {safe_options.hideCancel ? null : (
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
                      if (this.state.response) {
                        proceed(this.state.response);
                      }
                    } else {
                      if (!safe_options.form) {
                        proceed();
                      }
                    }
                  }}
                  disabled={safe_options.isPrompt && !this.state.response}
                >
                  {safe_options.ok || "OK"}
                </Button>
              </StyledModalFooter>
            )}
          </div>
        </Modal>
      </Provider>
    );
  }
}

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

export default confirmable(GenericModal);
