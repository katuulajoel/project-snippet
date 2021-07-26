/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { FormGroup } from "reactstrap";
import styled from "styled-components";

/* -------------------- Internel Dependencies (Utilites) -------------------- */

/* ------------------------- Component dependencies ------------------------- */
import TextArea from "../../../components/core/TextArea";
import Input from "../../../components/core/Input";

const CompanyProfile = () => {
  return (
    <ContentSection>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">
                Company Name
                <span className="label-style">*</span>
              </label>
              <Input placeholder="Company name" value="" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">Website</label>
              <Input placeholder="https://example.com" value="" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">Company Bio</label>
              <TextArea placeholder="Enter bio here" value="" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">
                Technologies used by my company
              </label>
              {/* TODO: Add Skill selection*/}
            </FormGroup>
          </div>
        </div>

        <div className="col-12 save-container">
          <button type="submit" className="btn btn-primary float-right save">
            Save
          </button>
        </div>
      </form>
    </ContentSection>
  );
};

const ContentSection = styled.div`
  padding-bottom: 60px;
  .save-container {
    background: rgba(237, 241, 247, 0.25);
    height: fit-content;
    display: flex;
    padding: 20px 40px;
    position: absolute;
    bottom: 0;
    left: 0;

    button {
      margin: 0 0 0 auto;
    }
  }
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  .header {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #151a30;
    margin-bottom: 24px;
  }

  form {
    .control-label {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #151a30;
    }

    input,
    textarea {
      background: #ffffff;
      border: 1px solid rgba(194, 204, 217, 0.25);
      box-sizing: border-box;
      box-shadow: none;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 24px;
      color: #3e4857;
    }

    .tag-input {
      .input-group {
        box-shadow: none;
        input {
          background: #ffffff;
          border: 1px solid rgba(194, 204, 217, 0.25);
          box-sizing: border-box;
          box-shadow: none;
          border-radius: 4px;
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 24px;
          color: #3e4857;
          &::placeholder {
            padding: 8px 16px;
          }
        }
      }
    }

    .save {
      box-shadow: none;
      border: none;
      background: rgba(6, 46, 100, 0.05);
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #062e64;

      &:disabled {
        color: rgba(6, 46, 100, 0.25);
      }
    }
  }
`;

export default CompanyProfile;
