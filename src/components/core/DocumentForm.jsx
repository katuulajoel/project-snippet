import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import styled from "styled-components";

import Upload from "./Upload";
import Select from "./Select";
import Input from "./Input";
import TextArea from "./TextArea";
import FieldError from "./FieldError";

import { DOCUMENT_TYPES } from "../../actions/utils/api";

import { StyledForm } from "../dashboard/styles";
import { validURL } from "components/utils/validation";

export default class DocumentForm extends React.Component {
  static defaultProps = {
    enableDescription: false,
  };

  static propTypes = {
    documentType: PropTypes.string,
    documentTypes: PropTypes.array,
    enableDescription: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    onSave: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      document: {
        title: "",
        description: "",
        type: props.documentType || null,
        file: null,
        url: "",
      },
      errors: {},
    };
  }

  onChange(key, value) {
    let newState = {};
    newState[key] = value;
    this.setState({ document: { ...this.state.document, ...newState } });
  }

  //TODO: put these in a utils file
  validationHandler = (inputName, inputValue) => {
    const { errors } = this.state;
    if (inputValue.length >= 1 && !validURL(inputValue)) {
      return this.setState({
        errors: { ...errors, [inputName]: "Invalid link" },
      });
    }
    return this.setState({
      errors: { ...errors, [inputName]: "" },
    });
  };

  handleLinksChange = (event) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        ...this.state,
        document: {
          ...this.state.document,
          [event.target.name]: event.target.value,
        },
      },
      () => this.validationHandler(name, value)
    );
  };

  onSave = (e) => {
    e.preventDefault();

    if (this.state.document.file || this.state.document.url) {
      const { onSave } = this.props;
      if (onSave) {
        onSave(this.state.document);
      }
      this.setState({ errors: {} });
    } else {
      this.setState({
        errors: { file: "Select a file", url: "Add a url" },
      });
    }
  };

  render() {
    const { documentTypes } = this.props;

    return (
      <_StyledForm id={this.props.id} onSubmit={this.onSave}>
        {this.props.documentType ? null : (
          <FormGroup>
            <label>
              Document Type<span className="label-style">*</span>
            </label>
            <Select
              options={
                Array.isArray(documentTypes) && documentTypes.length > 0
                  ? documentTypes
                  : DOCUMENT_TYPES
              }
              onChange={(type) => {
                this.onChange("type", type);
              }}
              required
            />
          </FormGroup>
        )}
        <FormGroup>
          <label>
            Document Name<span className="label-style">*</span>
          </label>
          <Input
            placeholder="Enter name of document e.g. Final Proposal"
            onChange={(e) => {
              this.onChange("title", e.target.value);
            }}
            required
          />
        </FormGroup>

        <FormGroup className="no-border">
          {this.state.errors.url ? (
            <FieldError message={this.state.errors.url} />
          ) : null}
          <label>Document Link</label>
          <Input
            name="url"
            placeholder="Enter link to document e.g. Google Docs"
            onChange={(e) => this.handleLinksChange(e)}
            value={this.state.url}
          />
        </FormGroup>

        <div className="legend-label">
          <div>
            <label>or upload document</label>
          </div>
        </div>

        <FormGroup>
          {this.state.errors.file ? (
            <FieldError message={this.state.errors.file} />
          ) : null}
          <Upload
            onChange={(files) => {
              this.onChange("file", files[0]);
            }}
          />
        </FormGroup>

        {this.props.enableDescription ? (
          <FormGroup>
            <label>Document Description</label>
            <TextArea
              placeholder="Description"
              onChange={(e) => {
                this.onChange("description", e.target.value);
              }}
            />
          </FormGroup>
        ) : null}
      </_StyledForm>
    );
  }
}

const _StyledForm = styled(StyledForm)`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  .form-group {
    padding: 40px 0;
    border-bottom: 1px solid #edf1f7;
    margin-bottom: 0px;

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }

  .no-border.form-group {
    border-bottom: none;
  }

  .legend-label {
    position: relative;
    height: 21px;

    > div {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
    }

    label {
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #8f9bb3;
      margin-bottom: 0;
      background: #fff;
      padding: 0 10px;
    }

    &:before {
      content: "";
      display: block;
      width: 100%;
      top: 11px;
      position: absolute;
      border-bottom: 1px solid #8f9bb3;
    }
  }
`;
