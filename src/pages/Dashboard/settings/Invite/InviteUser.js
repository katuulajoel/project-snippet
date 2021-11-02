import React, { useState } from "react";
import InviteContainer from "./InviteContainer";
import { ContentSection } from "../../../../utils/styles";
import Input from "../../../../components/Input";
import { isAdmin } from "../../../../utils/auth";
import * as InviteActions from "../../../../redux/actions/InvitesActions";
import Label from "../../../../components/Label";

const InviteUser = () => {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    resent: false,
    type: "",
    category: "",
  });

  const onChangeField = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    InviteActions.invite({ ...user })();
  };

  return (
    <InviteContainer>
      <ContentSection style={{ paddingTop: "0" }}>
        <form onSubmit={onSave}>
          <Label name="Email Address">
            <Input
              placeholder="eg. bart@tunga.io"
              onChange={onChangeField}
              name="email"
              defaultValue={user.email}
              aria-label="email-input"
              required
            />
          </Label>
          <Label name="First Name">
            <Input
              placeholder="Enter first name"
              onChange={onChangeField}
              name="first_name"
              value={user.first_name}
              aria-label="first_name-input"
              required
            />
          </Label>
          <Label name="Last Name">
            <Input
              placeholder="Enter last name"
              name="last_name"
              onChange={onChangeField}
              value={user.last_name}
              aria-label="last_name-input"
              required
            />
          </Label>
          <Label name="User Type">
            <select
              className="form-control"
              onChange={onChangeField}
              name="type"
              value={user.type}
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
          {user.type === "1" && (
            <Label name="User Category">
              <select
                className="form-control"
                onChange={onChangeField}
                name="category"
                value={user.category}
              >
                <option value="">Select category of user</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
            </Label>
          )}
          <div className="col-12">
            <button
              className="btn btn-primary save"
              // disabled={this.props.isInviting[this.state.selectionKey]}
            >
              Send Invite
            </button>
          </div>
        </form>
      </ContentSection>
    </InviteContainer>
  );
};

export default InviteUser;
