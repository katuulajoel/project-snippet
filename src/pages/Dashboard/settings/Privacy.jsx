import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

export default function Privacy() {
  return (
    <ContentSection className="privacy-settings">
      <div>
        <div className="section">
          <div className="section-title">Cookie Settings</div>

          <div className="row">
            <div className="col-md-12">
              <p>
                Learn more about how we use cookies from the &quot;Cookies&quot;
                section of our{" "}
                <a href="https://tunga.io/privacy/#cookies">Privacy Policy.</a>
              </p>
            </div>
            <div className="col-md-12">
              <p>
                You can opt-out of specific cookie categories (except essential
                website cookies) by clicking on the button below.
              </p>
            </div>
            <div className="col">
              <Button className="save">Cookie Settings</Button>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Promotional Email Settings</div>
        </div>
      </div>
    </ContentSection>
  );
}
const ContentSection = styled.div`
  .section {
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 24px;

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0px;
    }

    .section-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #151a30;
      margin-bottom: 24px;
    }

    a {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #3e4857;
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

  .form-check {
    margin-bottom: 18px;
    padding: 0;

    .form-check-input {
      position: initial;
      margin-top: 0;
      margin-left: 0;
      float: right;
    }

    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      input[type="checkbox"],
      input[type="radio"] {
        --active: #219653;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, 0.3);
        --border: #bbc1e1;
        --border-hover: #219653;
        --background: var(--ab, var(--border));
        --disabled: #f6f8ff;
        --disabled-inner: rgba(33, 150, 83, 0.5);
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 15px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
        &:after {
          content: "";
          display: block;
          left: 0;
          top: 0;
          position: absolute;
          transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
            opacity var(--d-o, 0.2s);
        }
        &:checked {
          --b: var(--active);
          --bc: var(--active);
          --d-o: 0.3s;
          --d-t: 0.6s;
          --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
        }
        &:disabled {
          --b: var(--disabled);
          cursor: not-allowed;
          opacity: 0.9;
          &:checked {
            --b: var(--disabled-inner);
            --bc: var(--border);
          }
          & + label {
            cursor: not-allowed;
          }
        }
        &:hover {
          &:not(:checked) {
            &:not(:disabled) {
              --bc: var(--border-hover);
            }
          }
        }
        &:focus {
          box-shadow: 0 0 0 var(--focus);
        }
      }
      input[type="checkbox"] {
        &.switch {
          width: 30px;
          border-radius: 11px;
          &:after {
            left: 1px;
            top: 1px;
            border-radius: 50%;
            width: 11px;
            height: 11px;
            background: #fff;
            transform: translateX(var(--x, 0));
          }
          &:checked {
            --ab: var(--active-inner);
            --x: 15px;
          }
          &:disabled {
            &:not(:checked) {
              &:after {
                opacity: 0.6;
              }
            }
          }
        }
      }
      input[type="radio"] {
        border-radius: 50%;
        &:after {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: var(--active-inner);
          opacity: 0;
          transform: scale(var(--s, 0.7));
        }
        &:checked {
          --s: 0.5;
        }
      }
    }
  }
`;
