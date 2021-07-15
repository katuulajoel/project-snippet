/* eslint-disable react/no-string-refs */
import PropTypes from "prop-types";
import React from "react";
import Dropzone from "react-dropzone";
import _ from "lodash";
import styled from "styled-components";

import Button from "./Button";
import Icon from "./Icon";

const UPLOAD_TYPES = {
  image: {
    accept: "image/*",
  },
};

export default class Upload extends React.Component {
  static defaultProps = {
    variant: "dropzone",
    type: "file",
    multiple: false,
    max: 0,
    showSelected: true,
    showSelector: false,
    actionText: "",
    accept: "",
    closeOnly: false,
    reset: false,
  };

  static propTypes = {
    variant: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.object,
    instructions: PropTypes.any,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.string,
    max: PropTypes.number,
    icon: PropTypes.string,
    showSelected: PropTypes.bool,
    showSelector: PropTypes.bool,
    actionText: PropTypes.string,
    accept: PropTypes.string,
    files: PropTypes.array,
    closeOnly: PropTypes.bool,
    reset: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      errors: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onChange && !_.isEqual(prevState.files, this.state.files)) {
      this.props.onChange(this.state.files);
    }

    if (prevProps.files !== this.props.files && this.props.files.length === 0) {
      this.setState({ files: [] });
    }

    if (
      prevProps.reset !== this.props.reset &&
      this.state.files.length > 0 &&
      this.props.reset
    ) {
      this.setState({ files: [] });
    }
  }

  checkFileSize(file) {
    if (file.size > 5000000) {
      this.setState({ errors: "Size is greater than 5Mbs" });
      return false;
    }
    return true;
  }

  onDrop(files) {
    if (files.length > 0) {
      this.setState({
        files: this.props.multiple
          ? [...this.state.files, ...files]
          : this.checkFileSize(files[0])
          ? [files[0]]
          : [],
      });
    }
  }

  onRemoveFile(file) {
    let updatedFiles = [];
    this.state.files.forEach((item) => {
      if (item.preview !== file.preview) {
        updatedFiles.push(item);
      }
    });

    this.setState({ files: updatedFiles });
  }

  onUpload() {
    this.refs.dropzone.open();
  }

  getProperties() {
    return UPLOAD_TYPES[this.props.type] || {};
  }

  render() {
    return (
      <div className={`upload-input ${this.props.className || ""}`}>
        {this.props.showSelected &&
        this.state.files.length &&
        (this.props.variant !== "dropzone" || this.props.multiple) ? (
          this.props.closeOnly ? (
            <button
              className="btn"
              onClick={this.onRemoveFile.bind(this, this.state.files[0])}
            >
              <i style={{ fontSize: "12px" }} className="tg-ic-close" />
            </button>
          ) : (
            <div className="file-list">
              {this.state.files.map((file, index) => {
                return (
                  <div className="file-item" key={index}>
                    <i className="tg-ic-file" /> {file.name}
                    <button
                      className="btn"
                      onClick={this.onRemoveFile.bind(this, file)}
                    >
                      <i className="tg-ic-close" />
                    </button>
                  </div>
                );
              })}
            </div>
          )
        ) : null}

        <Dropzone
          ref="dropzone"
          className={`dropzone ${
            this.props.variant === "dropzone" ? "" : "hidden"
          }`}
          multiple={this.props.multiple}
          {...this.getProperties()}
          {...(this.props.accept ? { accept: this.props.accept } : {})}
          onDrop={this.onDrop.bind(this)}
        >
          <div>
            {this.state.files.length ? (
              this.state.files.map((file, index) => {
                return (
                  <div key={index}>
                    {this.props.type === "image" ? (
                      <img src={file.preview} />
                    ) : null}
                    <div className="filename">
                      <i className="tg-ic-file" /> {file.name}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="placeholder">
                {this.props.placeholder || (
                  <i
                    style={{
                      color: "#8F9BB3",
                      fontSize: "20px",
                    }}
                    className="tg-ic-file-upload-outline"
                  />
                )}
              </div>
            )}

            {((typeof this.props.instructions !== "boolean" ||
              this.props.instructions) &&
              !this.props.multiple &&
              this.state.files.length === 0) ||
            (this.props.multiple &&
              (this.state.files.length < this.props.max ||
                this.props.max === 0)) ? (
              <div className="help">
                {this.props.instructions ? (
                  this.props.instructions
                ) : (
                  <Instructions>
                    <span>
                      Drag and drop or <b>Click to upload</b>
                    </span>
                    <span>
                      {this.props.type !== "image" ? "PDF, DOC, " : ""}
                      PNG, JPG accepted. Max 5MB
                    </span>
                    {this.state.errors && (
                      <span style={{ color: "#da3451" }}>
                        {this.state.errors}
                      </span>
                    )}
                  </Instructions>
                )}
              </div>
            ) : null}
          </div>
        </Dropzone>

        {["button", "icon"].includes(this.props.variant) &&
        (this.props.showSelector ||
          this.props.multiple ||
          !this.state.files.length) ? (
          <Button
            variant={this.props.variant === "icon" ? "icon" : "primary"}
            size={
              this.props.variant === "button" ? this.props.size || "md" : null
            }
            onClick={this.onUpload.bind(this)}
          >
            <Icon
              name={
                this.props.icon ||
                (this.props.variant === "icon" ? "add" : "upload")
              }
              size={
                this.props.variant === "icon" ? this.props.size || "md" : null
              }
            />
            <span className="action-text">
              {this.props.actionText ||
                (this.props.variant === "button" ? " Upload" : "")}
            </span>
          </Button>
        ) : null}
      </div>
    );
  }
}

const Instructions = styled.div`
  span {
    display: block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #8f9bb3;

    b {
      color: #151a30;
    }

    &:last-of-type {
      font-weight: normal;
      font-size: 14px;
    }
  }
`;
