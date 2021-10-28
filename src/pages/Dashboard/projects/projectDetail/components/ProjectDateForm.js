/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import TextArea from "../../../../../components/TextArea";
import FieldError from "../../../../../components/FieldError";

/* --------------------------- Style dependencies --------------------------- */
import { StyledForm } from "../../../../../utils/styles";
import DateTimePicker from "../../../../../components/DateTimePicker";

const ProjectDateForm = (props) => {
  const { proceed, id } = props;

  const [project, setProject] = useState(props.project || {});
  const [errors, setErrors] = useState({ start_error: null, end_error: null });

  const onChangeValue = (key, value) => {
    let newState = {};
    newState[key] = value;
    setProject({ ...project, ...newState });
  };

  const onChangeField = (key, e) => {
    onChangeValue(key, e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    if (project.start_date == null) {
      setErrors({ start_error: "Start date is required" });
    } else {
      setErrors({ start_error: null });
    }
    if (project.deadline == null) {
      setErrors({ end_error: "End date is required" });
    } else {
      setErrors({ end_error: null });
    }

    if (proceed && project.start_date != null && project.deadline != null) {
      if (new Date(project.start_date) > new Date(project.deadline)) {
        setErrors({ start_error: "Start date is greater than end date" });
      } else {
        proceed(project);
      }
    }
  };

  return (
    <StyledForm id={id} onSubmit={onSave}>
      <label>
        Timeline
        <LabelStyle>
          <span className="label-style">*</span>
        </LabelStyle>
      </label>
      <div style={{ display: "flex", gap: "14px" }}>
        <FormGroup>
          {errors.start_error && <FieldError message={errors.start_error} />}
          <DateTimePicker
            className="tg-date-field"
            placeholder="Enter Start Date"
            format={"DD MMM YYYY"}
            calendar={true}
            time={false}
            value={project.start_date ? new Date(project.start_date) : null}
            onChange={(date) => {
              onChangeValue("start_date", moment.utc(date).format());
            }}
            required
          />
        </FormGroup>
        <FormGroup>
          {errors.end_error && <FieldError message={errors.end_error} />}
          <DateTimePicker
            className="tg-date-field"
            placeholder="Enter Deadline"
            format={"DD MMM YYYY"}
            calendar={true}
            time={false}
            value={project.deadline ? new Date(project.deadline) : null}
            onChange={(date) => {
              onChangeValue("deadline", moment.utc(date).format());
            }}
            required
          />
        </FormGroup>
      </div>

      {project.start_date && project.deadline ? (
        <FormGroup>
          <label>
            Give reason for change
            <LabelStyle>
              <span className="label-style">*</span>
            </LabelStyle>
          </label>
          <TextArea
            placeholder="Enter reason here"
            value={project.reason}
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

ProjectDateForm.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.string,
    deadline: PropTypes.string,
    reason: PropTypes.string,
  }),
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  id: PropTypes.string,
};

export default ProjectDateForm;
