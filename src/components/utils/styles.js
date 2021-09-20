/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import DateTimePicker from "../DateTimePicker";

export const StyledDateTimePicker = styled(DateTimePicker)`
  &.tg-date-field {
    display: inline-block;
    border: 1px solid rgba(194, 204, 217, 0.25);
    box-shadow: initial;
    box-shadow: initial;
    width: 100%;
    margin-bottom: 24px;

    .rw-input {
      background-color: #fff;
      font-size: 16px;
      color: #3e4857;
      border-left: 1px solid rgba(194, 204, 217, 0.5);
      border-bottom: 1px solid rgba(194, 204, 217, 0.5);
      border-top: 1px solid rgba(194, 204, 217, 0.5);
      box-shadow: none;
    }

    .rw-select {
      background-color: #fff;
      border-left: none;
      border-right: 1px solid rgba(194, 204, 217, 0.5);
      border-top: 1px solid rgba(194, 204, 217, 0.5);
      border-bottom: 1px solid rgba(194, 204, 217, 0.5);
      width: 2.9em;
      button.rw-btn {
        color: #8f9bb3;
        width: 2.6em;
        font-size: 16px;
      }
    }
  }
`;

export const StyledForm = styled.form`
  .tag-input {
    .selected {
      .selected-item {
        display: block;
        width: 100%;
        height: 40px;
        margin-top: 0;
      }
    }
  }

  .form-group {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;

    label {
      color: #151a30;
    }

    input,
    textarea,
    select {
      font-size: 16px;
      color: #8f9bb3;
      background: #ffffff;
      border: 1px solid rgba(194, 204, 217, 0.5);
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: none;

      &::placeholder {
        color: #8f9bb3;
        font-weight: normal;
      }

      &.rw-input {
        padding-left: 1.25rem;
      }
    }

    .text {
      margin-top: 8px;
      color: #8f9bb3;
    }

    .input-group {
      box-shadow: none;
      input {
        border-right: none;
      }

      .input-group-prepend .input-group-text {
        background-color: #fff;
        border-left: none;
        border-right: 1px solid rgba(194, 204, 217, 0.5);
        border-top: 1px solid rgba(194, 204, 217, 0.5);
        border-bottom: 1px solid rgba(194, 204, 217, 0.5);
        border-radius: 0 4px 4px 0;

        i {
          font-size: 14px;
        }
      }
    }

    .tg-date-field {
      margin-bottom: 0px;
    }

    &.footer {
      float: right;
      margin-top: 45px;
      margin-bottom: 0px;

      button {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: none;
        margin-right: 16px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }

      button:first-child {
        border: 1px solid #3e4857;
        color: #3e4857;
        background-color: #fff;
      }

      button:last-child {
        color: #fff;
        background-color: #da3451;
        border-color: #da3451;
      }
    }
  }

  .add-more button {
    border: none;
    background: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #062e64;
    i {
      font-size: 16px;
      vertical-align: baseline;
      margin-right: 12px;
    }
  }

  .input-group {
    box-shadow: none;
    input {
      border-right: none !important;

      &.form-control {
        font-size: 16px;
        color: #8f9bb3;
        background: #ffffff;
        border: 1px solid rgba(194, 204, 217, 0.5);
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: none;
      }
      &::placeholder {
        color: #8f9bb3;
        font-weight: normal;
      }
    }

    .input-group-prepend .input-group-text {
      background-color: #fff;
      border-left: none;
      border-right: 1px solid rgba(194, 204, 217, 0.5);
      border-top: 1px solid rgba(194, 204, 217, 0.5);
      border-bottom: 1px solid rgba(194, 204, 217, 0.5);
      border-radius: 0 4px 4px 0;

      i {
        font-size: 14px;
      }
    }
  }
`;
