import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import { useDropzone } from "react-dropzone";

const Upload = ({ type, placeholder, onChange }) => {
  const [errors, setErrors] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: type,
    maxSize: 5242880,
    onDrop: (acceptedFiles, fileRejections) => {
      onChange(acceptedFiles);
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (
            err.code === "file-too-large" ||
            err.code === "file-invalid-type"
          ) {
            setErrors(`Error: ${err.message}`);
          }
        });
      });
    },
  });

  return (
    <Wrapper className={`upload-input`}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {acceptedFiles.length ? (
          acceptedFiles.map((file, index) => {
            return (
              <div key={index}>
                {["image/jpeg", "image/png", "image/gif"].includes(
                  file.type
                ) && <img src={file.preview} />}
                <div className="filename">
                  <i className="tg-ic-file" /> {file.name}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="placeholder">
              {placeholder || (
                <i
                  style={{
                    color: "#8F9BB3",
                    fontSize: "20px",
                  }}
                  className="tg-ic-file-upload-outline"
                />
              )}
            </div>
            <Instructions>
              <span>
                Drag and drop or <b>Click to upload</b>
              </span>
              <span>
                {type !== "image" ? "PDF, DOC, " : ""}PNG, JPG accepted. Max 5MB
              </span>
              {errors && <span style={{ color: "#da3451" }}>{errors}</span>}
            </Instructions>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &.upload-id-doc {
    .dropzone {
      .placeholder {
        min-height: 130px;

        [class*="tg-ic"] {
          font-size: 130px;
        }
      }

      img {
        height: 130px;
      }
    }
  }

  .dropzone {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    min-height: 130px;
    border: 2px dashed #8f9bb3;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    cursor: pointer;

    &.hidden {
      display: none;
    }

    &:hover {
      border-color: get-color("blue");
    }

    > * {
      width: 100%;
      text-align: center;
    }

    img {
      max-width: 100%;
      max-height: 300px;
    }

    .filename {
      font-weight: $font-weight-normal;
      margin: 5px auto;
    }
  }
`;

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

Upload.defaultProps = {
  type: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf",
};

Upload.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.object,
  onChange: PropTypes.func,
};

export default Upload;
