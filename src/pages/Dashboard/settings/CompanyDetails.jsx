/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { FormGroup } from "reactstrap";
import styled from "styled-components";

/* ------------------------- Component dependencies ------------------------- */
import Button from "../../../components/core/Button";
import Input from "../../../components/core/Input";

const CompanyDetails = () => {
  return (
    <ContentSection>
      <div className="header">Address</div>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <FormGroup>
              <label>
                Street<span className="label-style">*</span>
              </label>
              <Input value="" />
            </FormGroup>
          </div>
          <div className="col-sm-3">
            <FormGroup>
              <label>
                Number/Plot
                <span className="label-style">*</span>
              </label>
              <Input type="number" value="" />
            </FormGroup>
          </div>
          <div className="col-sm-3">
            <FormGroup>
              <label>
                Zip Code
                <span className="label-style">*</span>
              </label>
              <Input value="" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <FormGroup>
              <label>
                City<span className="label-style">*</span>
              </label>
              <Input value="" />
            </FormGroup>
          </div>
          <div className="col-sm-6">
            <FormGroup className="country-selector">
              <label>
                Country
                <span className="label-style">*</span>
              </label>
              {/* TODO: Add country selector*/}
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label>VAT Number</label>
              <Input value="" />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label>Company Registration Number (Optional)</label>
              <Input value="" />
            </FormGroup>
          </div>
        </div>
        <div className="col-12 save-container">
          <Button type="save" className="float-right save">
            Save
          </Button>
        </div>
      </form>
    </ContentSection>
  );
};

const ContentSection = styled.div`
  background-color: get-color("white");
  padding: 40px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.11);
  border: solid 1px #ececec;
  &.pending_invites {
    padding: 0px !important;
    max-width: 750px !important;
  }

  max-width: 650px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 6px;
  box-shadow: none;
  position: relative;

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
    textarea,
    select {
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

export default CompanyDetails;
