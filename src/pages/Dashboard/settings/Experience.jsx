import React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import TextArea from "../../../components/TextArea";
import { FormGroup, Input } from "reactstrap";

export default function Experience() {
  return (
    <ExperienceWrapper>
      <form>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">Role</label>
              <Input placeholder="Role" value="" />
            </FormGroup>
          </div>
          <div className="col-sm-12">
            <FormGroup>
              <label className="control-label">Your Bio</label>
              <TextArea placeholder="Enter your bio" defaultValue="" />
            </FormGroup>
          </div>
        </div>
        <hr />
        <>
          <h4>Skillset</h4>
          <div className="row">
            <div className="col-sm-12">
              <FormGroup className="experience__form">
                <label className="control-label">Skillsets</label>
                <div>
                  <Button>
                    <Icon name="round-add" /> Add new
                  </Button>
                </div>
              </FormGroup>
            </div>
          </div>
        </>
        <div className="row">
          <div className="col-sm-12">
            <FormGroup className="experience__form">
              <label className="control-label">Work Experience</label>
              <div>
                <Button>
                  <Icon name="round-add" /> Add new
                </Button>
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card work-education-wrapper">
              <div className="card-body">
                <h3>
                  work-position, work-company
                  <span>
                    <Icon name="circle-edit-outline" />
                    <Icon name="delete-outline" />
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 save-container">
          <button type="submit" className="btn btn-primary float-right save">
            Save
          </button>
        </div>
      </form>
    </ExperienceWrapper>
  );
}
const ExperienceWrapper = styled.div`
  max-width: 600px;
  margin: 100px auto;
  padding-bottom: 60px;
  hr {
    border-color: #edf1f7;
  }
  h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    color: #151a30;
    margin: 1rem 0 1.5rem;
  }
  .card.work-education-wrapper {
    background: #ffffff;
    border: 1px solid #edf1f7;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none !important;
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      margin-bottom: 6px;
      color: #3e4857;
      display: flex;
      justify-content: space-between;

      i {
        &:last-child {
          margin-left: 15px;
        }
        color: #8f9bb3;
        font-size: 16px;
      }
    }
    h4 {
      font-style: normal;
      font-weight: 100;
      font-size: 14px;
      line-height: 150%;
      color: #8f9bb3;
      margin-bottom: 1rem;
      margin-top: 0;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 150%;

      color: #3e4857;
    }
  }
  .save-container {
    button {
      font-weight: 600;
      font-size: 15px;
      box-shadow: none;
    }
  }
  textarea,
  input {
    background: #ffffff;
    border: 1px solid rgba(194, 204, 217, 0.25);
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none !important;
    font-size: 16px;
    line-height: 24px;
    color: #3e4857;

    &:disabled {
      background: rgba(194, 204, 217, 0.1);
    }
  }

  .input-group {
    box-shadow: none !important;
  }
  .btn-icon {
    min-width: min-content !important;
    padding-right: 2px;
  }
  .experience__form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 0.4rem;
    label {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;

      color: #151a30;
    }
    button {
      background: transparent;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      color: #062e64;
      border: none;
      box-shadow: none;
    }
  }

  .save-container {
    background: rgba(237, 241, 247, 0.25);
    height: fit-content;
    display: flex;
    padding: 20px 40px;
    position: absolute;
    bottom: 0;
    left: 0;

    .save {
      margin: 0 0 0 auto;
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
