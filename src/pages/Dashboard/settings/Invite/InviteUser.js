import React, { useState } from "react";
import TabBar from "./tabBar";
import { ContentSection } from "../../../../components/utils/styles";
import Input from "../../../../components/Input";
import { isAdmin } from "../../../../components/utils/auth";
import * as InviteActions from "../../../../actions/InvitesActions";
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

    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    InviteActions.invite({ ...user })();
  };

  return (
    <>
      <TabBar />
      <ContentSection>
        <form onSubmit={onSave}>
          <Label name="Email Address">
            <Input
              placeholder="eg. bart@tunga.io"
              onChange={onChangeField}
              name="email"
              defaultValue={user.email}
              required
            />
          </Label>
          <Label name="First Name">
            <Input
              placeholder="Enter first name"
              onChange={onChangeField}
              name="first_name"
              value={user.first_name}
              required
            />
          </Label>
          <Label name="Last Name">
            <Input
              placeholder="Enter last name"
              name="last_name"
              onChange={onChangeField}
              value={user.last_name}
              required
            />
          </Label>
          <Label name="User type">
            <select
              className="form-control"
              onChange={onChangeField}
              name="type"
              value={user.type}
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
            <Label name="User category">
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
    </>
  );
};

export default InviteUser;
