import React from "react";
import { FormGroup } from "reactstrap";

/* -------------------------- Internel Dependencies ------------------------- */
import styled from "styled-components";
import Input from "../../../components/Input";

export default function Profile() {
  return (
    <ContentSection>
      <form method="post">
        <div className="header">Biodata</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="profile-pic">{/* TODO: FIX THIS*/}</div>
          <div className="row">
            <div className="col">
              <FormGroup>
                <label className="control-label">
                  First Name
                  <span className="label-style">*</span>
                </label>
                <Input className="form-control" required value="" />
              </FormGroup>
            </div>

            <div className="col">
              <FormGroup>
                <label className="control-label">
                  Last Name
                  <span className="label-style">*</span>
                </label>
                <Input required value="" />
              </FormGroup>
            </div>

            <div className="col-12">
              <FormGroup>
                <label className="control-label">
                  Phone Number
                  <span className="label-style">*</span>
                </label>
                <Input placeholder="Enter phone number" required value="" />
              </FormGroup>
            </div>
          </div>
        </div>
        <>
          <hr />
          <div className="header">Address</div>
          <div className="row">
            <div className="col-md-6">
              <label className="control-label">
                Street
                <span className="label-style">*</span>
              </label>
              <Input placeholder="Bello, Yaba" required value="" />
            </div>
            <div className="col-md-3">
              <label className="control-label">
                Number / Plot
                <span className="label-style">*</span>
              </label>
              <Input placeholder="2" required type="number" value="" />
            </div>
            <div className="col-md-3">
              <label className="control-label">
                Zip Code
                <span className="label-style">*</span>
              </label>
              <Input placeholder="10001" required value="" />
            </div>
            <div className="col-md-6">
              <label className="control-label">
                City
                <span className="label-style">*</span>
              </label>
              <Input placeholder="Enter City" required value="" />
            </div>
            <div className="col-md-6">
              <label className="control-label">
                Country
                <span className="label-style">*</span>
              </label>
              {/* FIX */}
            </div>
          </div>
          <hr />
          <div className="header">Identification</div>
          <div className="row">
            <div className="col-md-12">{/* FIX */}</div>
          </div>
        </>
        <div className="col-12 save-container">
          <button type="submit" className="btn btn-primary float-right save">
            Save
          </button>
        </div>
      </form>
    </ContentSection>
  );
}
export const ContentSection = styled.div`
  max-width: 600px;
  padding-bottom: 60px;

  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  .save-container {
    background: rgba(237, 241, 247, 0.25);
    max-width: 600px;
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
  .file-drop {
    /* relatively position the container bc the contents are absolute */
    position: relative;
    height: 100px;
    width: 100%;
    background: #ffffff;
    border: 1px dashed #c2ccd9;
    box-sizing: border-box;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    text-align: center;

    color: #8f9bb3;
    span {
      position: relative;
      color: #062e64;
      font-weight: bold;
      margin: 0 2px;
      input {
        position: absolute;
        width: 100%;
        opacity: 0;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }

  .file-drop > .file-drop-target {
    /* basic styles */
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 2px;

    /* horizontally and vertically center all content */
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;

    flex-direction: row;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;

    align-items: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;

    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;

    align-content: center;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;

    text-align: center;
  }

  .file-drop > .file-drop-target.file-drop-dragging-over-frame {
    /* overlay a black mask when dragging over the frame */
    border: none;
    background-color: rgba(0, 0, 0, 0.65);
    box-shadow: none;
    z-index: 50;
    opacity: 1;

    /* typography */
    color: white;
  }

  .file-drop > .file-drop-target.file-drop-dragging-over-target {
    /* turn stuff orange when we are dragging over the target */
    color: #ff6e40;
    box-shadow: 0 0 13px 3px #ff6e40;
  }
  hr {
    border-top: 1px solid #edf1f7;
    margin: 2rem 0 !important;
  }
  .header {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #151a30;
    margin-bottom: 24px;
  }

  form,
  .form__onboard {
    .control-label {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #151a30;
    }

    .profile-pic {
      position: relative;
      margin-right: 40px;
      height: fit-content;

      button {
        border: none;
        border-radius: 50%;
        background: #fff;
        min-width: 25px;
        height: 25px;
        position: absolute;
        bottom: 0;
        right: 10px;
        box-shadow: 0px 3px 8px rgba(143, 155, 179, 0.5);
        padding: 0;

        &.btn {
          font-size: initial;
          line-height: 0px;
        }

        .action-text {
          display: none;
        }

        i {
          color: #232735;
        }
      }
    }

    input,
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

    .avatar {
      width: 100px;
      height: 100px;

      &.avatar-icon i {
        font-size: 100px;
      }

      &.avatar-initials {
        font-size: 24px !important;
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
