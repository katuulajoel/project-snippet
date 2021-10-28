/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import styled from "styled-components";
import { Table } from "react-bootstrap";

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

  label {
    color: #151a30;
    margin-bottom: 0.5rem;
  }

  .form-group {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 14px;

    label {
      color: #151a30;
      margin-bottom: 0.5rem;
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

export const StyledTable = styled(Table)`
  background: #ffffff;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
  border-radius: 6px;
  /* table-layout: fixed; */
  border-collapse: initial;
  border-spacing: 0;
  overflow: hidden;

  thead tr {
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8f9bb3;
    background: rgba(62, 72, 87, 0.05);
    border-bottom: 1px solid #edf1f7;
    box-sizing: border-box;
    border-radius: 4px 4px 0px 0px;

    th {
      vertical-align: middle;
      padding: 10px;
      border-bottom: 1px solid #edf1f7;
    }
    th:nth-last-child(2) {
      width: 150px;
    }
    th:last-child {
      padding-right: 24px;
    }
    th:first-child {
      padding-left: 24px;
    }
  }

  tbody tr {
    font-size: 16px;
    line-height: 24px;
    text-transform: capitalize;
    color: #3e4857;
    border-bottom: 1px solid #edf1f7;

    td {
      vertical-align: middle;
      padding: 16px 10px;
      width: auto;

      &.nowrap {
        white-space: "nowrap";
      }

      a,
      b {
        font-weight: 600;
        color: #3e4857;
        text-decoration: none;
      }

      > i.danger {
        color: #da3451;
        margin-left: 8px;
        vertical-align: baseline;
      }

      .avatar.avatar-dash {
        width: 35px;
        height: 35px;

        &.avatar-initials {
          font-size: 14px;
        }
      }
    }

    td:first-child {
      padding-left: 24px;
    }

    td:last-child {
      display: flex;
      padding-right: 24px;

      &.cta {
        display: table-cell;
        color: #3e4857;
        text-decoration: none;

        &:empty {
          width: fit-content;
        }
        div.cta-wrapper {
          display: flex;
          justify-content: flex-end;
          a {
            white-space: nowrap;
            align-self: center;
            padding-right: 16px;
            i {
              font-size: 15px;
              color: #3e4857;
              margin-left: 8px;
              vertical-align: middle;
            }
          }
          > button {
            align-self: center;
            padding-left: 5px;
            i {
              color: #3e4857;
            }
          }
        }
      }
    }

    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      border-radius: 50px;
      padding: 6px 24px;

      &.pending {
        color: #8f9bb3;
        background: rgba(143, 155, 179, 0.05);
        border: 1px solid rgba(143, 155, 179, 0.04);
      }

      &.overdue {
        color: #eb5757;
        background: rgba(235, 87, 87, 0.04);
        border: 1px solid rgba(235, 87, 87, 0.04);
      }

      &.missed {
        color: #3e4857;
        background: rgba(62, 72, 87, 0.04);
        border: 1px solid rgba(62, 72, 87, 0.04);
      }

      &.completed {
        color: #219653;
        background: rgba(33, 150, 83, 0.04);
        border: 1px solid rgba(33, 150, 83, 0.04);
      }
    }
  }
`;

export const ContentSection = styled.div`
  padding-bottom: 60px;

  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  .save-container {
    height: fit-content;
    display: flex;
    padding: 0px 40px 40px;
    position: absolute;
    bottom: 0;
    left: 0;
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
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-align: center;

      color: #ffffff;
      box-shadow: none;
      border: none;

      background: #da3451;
      border-radius: 4px;

      &:disabled {
        opacity: 0.5;
      }
    }
  }
`;
