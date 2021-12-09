import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";
import styled from "styled-components";

import Upload from "./Upload";
import Input from "./Input";
import FieldError from "./FieldError";

import { StyledForm } from "../utils/styles";
import { validURL } from "../utils/stringUtils";

const DocumentForm = ({ id, proceed }) => {
  const [document, setDocument] = useState({
    title: "",
    description: "",
    file: null,
    url: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (key, value) => {
    let newState = {};
    newState[key] = value;
    setDocument({ ...document, ...newState });
  };

  const validationHandler = (inputName, inputValue) => {
    setErrors({
      ...errors,
      [inputName]:
        inputValue.length >= 1 && !validURL(inputValue) ? "Invalid link" : "",
    });
    return inputValue.length >= 1 && !validURL(inputValue);
  };

  const onSave = (e) => {
    e.preventDefault();

    if (!document.file && validationHandler("url", document.url)) {
      return;
    }

    if (document.file || document.url) {
      proceed(document);
      setErrors({});
    } else {
      setErrors({ file: "Select a file", url: "Add a url" });
    }
  };

  return (
    <_StyledForm id={id} onSubmit={onSave}>
      <FormGroup>
        <label>
          Document Name<span className="label-style">*</span>
        </label>
        <Input
          placeholder="Enter name of document e.g. Final Proposal"
          onChange={(e) => {
            onChange("title", e.target.value);
          }}
          required
        />
      </FormGroup>

      <FormGroup>
        {errors.url && <FieldError message={errors.url} />}
        <label>Document Link</label>
        <Input
          name="url"
          placeholder="Enter link to document e.g. Google Docs"
          onChange={(e) => onChange("url", e.target.value)}
          value={document.url}
        />
      </FormGroup>

      <div className="legend-label">
        <div>
          <label>or upload document</label>
        </div>
      </div>

      <FormGroup>
        {errors.file && <FieldError message={errors.file} />}
        <Upload
          onChange={(files) => {
            onChange("file", files[0]);
          }}
        />
      </FormGroup>
    </_StyledForm>
  );
};

const _StyledForm = styled(StyledForm)`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  .form-group {
    padding: 0;
    border-bottom: 1px solid #edf1f7;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0px;
    }

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      border-bottom: none;
    }

    div {
      margin: 0px;
    }
  }

  .legend-label {
    position: relative;
    height: 21px;
    margin-bottom: 40px;

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

DocumentForm.propTypes = {
  id: PropTypes.string,
  proceed: PropTypes.func,
};

export default DocumentForm;
