/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { isAdmin } from "../../../../utils/auth";
/* ------------------------- Component dependencies ------------------------- */
import AddAdminEmail from "./AddAdminEmail";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import Deactivate from "./Deactivate";
import {
  updateAuthUser,
  updateAccountInfo,
  updatePassword,
  deactivateAccount,
} from "../../../../redux/actions/ProfileActions";
import { openConfirm } from "../../../../utils/modals";

const Account = () => {
  const [page] = useState({
    isSaved: "",
  });
  const { user } = useSelector(({ Auth }) => Auth);
  const dispatch = useDispatch();

  const getFormData = (formdata) => {
    let data = {};
    formdata.forEach((val, key) => (data[key] = val));
    return data;
  };

  const addAdminEmail = (e) => {
    e.preventDefault();

    let formdata = new FormData(document.querySelector("#addAdminEmail"));
    let data = getFormData(formdata);
    console.log("addAdminEmail", data);

    return updateAuthUser(data)(dispatch);
  };

  const changePassword = (e) => {
    e.preventDefault();

    let formdata = new FormData(document.querySelector("#changePassword"));
    let data = getFormData(formdata);
    if (data) {
      data["new_password2"] = data["new_password1"];
    }
    console.log("changePassword", data);

    return updatePassword(data)(dispatch);
  };

  const changeEmail = (e) => {
    e.preventDefault();

    let formdata = new FormData(document.querySelector("#changeEmail"));
    let data = getFormData(formdata);
    console.log("changeEmail", data);

    return updateAccountInfo(data)(dispatch);
  };

  const deactivate = (e) => {
    e.preventDefault();

    openConfirm({
      message: (
        <div>
          <p>
            Your user account will be disabled immediately and you will be
            logged out of Tunga.
          </p>
          <p>
            Additionally, all data that's non-essential to compliance will be
            deleted from Tunga's systems within 7 days.
          </p>
        </div>
      ),
      title: "Confirm Account Deactivation",
      canClose: true,
      options: {
        ok: "Confirm",
        cancel: "Cancel",
        dismissAsCancel: true,
        size: "md",
      },
    }).then(() => deactivateAccount());
  };

  return (
    <ContentSection className="account-settings">
      {user.is_project_owner || isAdmin() ? ( // TODO: remove isAdmin()
        <AddAdminEmail onSave={addAdminEmail} />
      ) : null}

      <ChangePassword onSave={changePassword} />
      <ChangeEmail onSave={changeEmail} />
      <Deactivate page={page} deactivate={deactivate} />
    </ContentSection>
  );
};

const ContentSection = styled.div`
  width: 600px;
  padding: 40px;
  margin: auto;
  background: white;

  .label-style {
    color: #da3451;
    padding-left: 2px;
  }

  label {
    font-weight: 400;
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
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
    margin-bottom: 20px;

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
      height: 2.5rem;
      padding: 0.4375rem 1.25rem;

      &:disabled {
        color: rgba(6, 46, 100, 0.25);
      }
    }
  }
`;

export default Account;
