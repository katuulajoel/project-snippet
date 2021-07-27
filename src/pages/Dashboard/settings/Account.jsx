/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import styled from "styled-components";

/* ------------------------- Component dependencies ------------------------- */
import CustomInputGroup from "../../../components/CustomInputGroup";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const Account = () => {
  return (
    <ContentSection className="account-settings">
      <form>
        <div className="header">Add admin email address for invoices</div>
        <Label>
          Email Address
          <span className="label-style">*</span>
        </Label>
        <Row>
          <Col md="12">
            <FormGroup>
              <Input value="" required />
            </FormGroup>
          </Col>
          <Col>
            <Button className="save" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </form>
      <form className="update-password-form">
        <div className="header">Change Password</div>

        <Row>
          <Col>
            <FormGroup>
              <Label>
                Current Password
                <span className="label-style">*</span>
              </Label>
              <CustomInputGroup
                className="password2"
                variant="password2"
                placeholder="Enter your password"
                value=""
                required
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>
                New Password
                <span className="label-style">*</span>
              </Label>
              <CustomInputGroup
                className="password2"
                variant="password2"
                placeholder="Enter new password"
                value=""
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="save" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </form>
      <form>
        <div className="header">Change Email Address</div>
        <Row>
          <Col md="6">
            <Label>
              New Email Address
              <span className="label-style">*</span>
            </Label>
            <FormGroup>
              <Input placeholder="Enter new email address" value="" required />
            </FormGroup>
          </Col>
          <Col md="6">
            <Label>
              Password
              <span className="label-style">*</span>
            </Label>
            <FormGroup>
              <CustomInputGroup
                className="password2"
                variant="password2"
                placeholder="Enter your password"
                value=""
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button className="save" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </form>
      <form>
        <div className="header">Deactivate account</div>
        <div>
          <Button className="save" type="submit">
            {" "}
            Deactivate my account
          </Button>
        </div>
      </form>
    </ContentSection>
  );
};

const ContentSection = styled.div`
  width: 600px;
  padding-top: 70px;
  margin: auto;

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
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 24px;

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0px;
    }

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

    .password2 {
      border-right: none;
      box-shadow: none;

      input {
        border-right: none;
      }

      .input-group-prepend {
        .input-group-text {
          padding: 0px;
          button {
            min-width: 45px;
            background-color: #fff;
            border: 1px solid rgba(194, 204, 217, 0.25);
            border-radius: 0px 4px 4px 0px;
            border-left: none;
            i {
              font-size: 16px;
              color: #8f9bb3;
            }
          }
        }
      }
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

export default Account;
