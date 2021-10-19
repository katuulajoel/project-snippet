/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormGroup } from "reactstrap";

/* -------------------------- Internel Dependencies ------------------------- */
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import FieldError from "../../../../../components/FieldError";

/* --------------------------- Style dependencies --------------------------- */
import { StyledForm } from "../../../../../utils/styles";

const PlanningForm = (props) => {
  const { proceed, id } = props;

  const [plan, setPlan] = useState(props.plan || {});
  const [errors, setErrors] = useState({ url: false });

  const isValidUrl = (string) => {
    const regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    return regex.test(string);
  };

  const onChangeValue = (key, value) => {
    let newState = {};
    newState[key] = value;
    setPlan({ ...plan, ...newState });
  };

  const onChangeField = (key, e) => {
    onChangeValue(key, e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    setErrors({ url: !isValidUrl(plan.url) });

    if (proceed) {
      proceed(plan);
    }
  };

  return (
    <StyledForm id={id} onSubmit={onSave}>
      <FormGroup>
        {errors.url && <FieldError message="Invalid link" />}
        <Input
          name="url"
          placeholder="Url"
          onChange={(e) => onChangeField("url", e)}
          value={plan.url}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Name of file"
          value={plan.title || ""}
          onChange={(e) => onChangeField("title", e)}
          required
        />
      </FormGroup>
      {plan.id ? (
        <FormGroup>
          <label>Reason for changing document</label>
          <TextArea
            value={plan.reason}
            onChange={(e) => onChangeField("reason", e)}
            required
          />
        </FormGroup>
      ) : null}
    </StyledForm>
  );
};

PlanningForm.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    reason: PropTypes.string,
  }),
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  id: PropTypes.string,
};

export default PlanningForm;
