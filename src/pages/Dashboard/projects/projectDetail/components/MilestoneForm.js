/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { FormGroup } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import FieldError from "../../../../../components/FieldError";

/* --------------------------- Style dependencies --------------------------- */

import { StyledDateTimePicker, StyledForm } from "../../../../../utils/styles";

const MilestoneForm = (props) => {
  const { milestone: milestoneData, proceed, id } = props;

  const [milestone, setMilestone] = useState({
    ...milestoneData,
    due_at: milestoneData.due_at ? new Date(milestoneData.due_at) : null,
  });
  const [errors, setErrors] = useState({ deadline: null });

  const onChangeValue = (key, value) => {
    let newState = {};
    newState[key] = value;
    setMilestone({ ...milestone, ...newState });
  };

  const onChangeField = (key, e) => {
    onChangeValue(key, e.target.value);
  };

  useEffect(() => {
    if (milestone.due_at && milestone.due_at === "Invalid date") {
      setMilestone({ ...milestone, due_at: "" });
    }
  }, [milestone]);

  const onSave = (e) => {
    e.preventDefault();
    if (!milestone.due_at) {
      setErrors({ due_at: "Deadline is required" });
    } else if (proceed) {
      proceed(milestone);
    }
  };

  return (
    <StyledForm id={id} onSubmit={onSave}>
      <FormGroup>
        <label>
          Milestone title
          <LabelStyle>
            <span className="label-style">*</span>
          </LabelStyle>
        </label>
        <Input
          placeholder="Title of milestone (e.g, End of sprint 1)"
          value={milestone.title}
          onChange={(e) => onChangeField("title", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        {errors.due_at && <FieldError message={errors.due_at} />}
        <label>
          Deadline
          <LabelStyle>
            <span className="label-style">*</span>
          </LabelStyle>
        </label>
        <StyledDateTimePicker
          className="tg-date-field"
          placeholder="Enter Deadline"
          format={"DD MMM YYYY"}
          calendar={true}
          time={false}
          min={new Date()}
          value={milestone.due_at}
          onChange={(date) => {
            onChangeValue("due_at", moment.utc(date).format());
          }}
          required
        />
      </FormGroup>
      {milestone.id ? (
        <FormGroup>
          <label>
            Give reason for change
            <LabelStyle>
              <span className="label-style">*</span>
            </LabelStyle>
          </label>
          <TextArea
            value={milestone.reason}
            onChange={(e) => onChangeField("reason", e)}
            required
          />
        </FormGroup>
      ) : null}
    </StyledForm>
  );
};
const LabelStyle = styled.span`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
`;

MilestoneForm.propTypes = {
  milestone: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    due_at: PropTypes.string,
    reason: PropTypes.string,
  }),
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  id: PropTypes.string,
};

export default MilestoneForm;
