import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InviteContainer from "./InviteContainer";
import { ContentSection } from "../../../../utils/styles";
import Input from "../../../../components/Input";
import { isAdmin } from "../../../../utils/auth";
import * as InviteActions from "../../../../redux/actions/InvitesActions";
import Label from "../../../../components/Label";
import { AnimatedButton } from "../../../../components/Button";
import { getFormData } from "../../../../utils/forms";
import { success } from "../../../../utils/actions";
import * as actionTypes from "../../../../configs/constants/ActionTypes";
import Alert from "../../../../utils/alert";

const InviteUser = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");

  const onSave = async (e) => {
    e.preventDefault();

    let form = document.querySelector("form");
    let formdata = new FormData(form);
    let data = getFormData(formdata);

    return InviteActions.invite({ ...data })
      .then(function () {
        dispatch(success(actionTypes.SET_BUTTON, false));
        Alert("Invitation Successfully Sent.");
        form.reset();
      })
      .catch(function (error) {
        dispatch(success(actionTypes.SET_BUTTON, false));
        if (error.response.data && error.response.data["email"]) {
          // Request made and server responded
          Alert(error.response.data["email"][0], false);
        }
      });
  };

  return (
    <InviteContainer>
      <ContentSection style={{ paddingTop: "0" }}>
        <form onSubmit={onSave}>
          <input type="hidden" name="resent" defaultValue={false} />
          <input type="hidden" name="category" defaultValue={""} />
          <Label name="Email Address">
            <Input
              placeholder="eg. bart@tunga.io"
              name="email"
              aria-label="email-input"
              required
            />
          </Label>
          <Label name="First Name">
            <Input
              placeholder="Enter first name"
              name="first_name"
              aria-label="first_name-input"
              required
            />
          </Label>
          <Label name="Last Name">
            <Input
              placeholder="Enter last name"
              name="last_name"
              aria-label="last_name-input"
              required
            />
          </Label>
          <Label name="User Type">
            <select
              className="form-control"
              onChange={(e) => setUserType(e.target.value)}
              name="type"
              defaultValue={userType}
              aria-label="type-input"
              required
            >
              <option value="">Select type of user</option>
              <option value="1">Developer</option>
              {isAdmin() && (
                <>
                  <option value="3">Project Manager</option>
                  <option value="2">Project Owner</option>
                </>
              )}
            </select>
          </Label>
          {userType === "1" && (
            <Label name="User Category">
              <select className="form-control" name="category">
                <option value="">Select category of user</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
            </Label>
          )}
          <div className="col-12">
            <AnimatedButton>Send Invite</AnimatedButton>
          </div>
        </form>
      </ContentSection>
    </InviteContainer>
  );
};

export default InviteUser;
