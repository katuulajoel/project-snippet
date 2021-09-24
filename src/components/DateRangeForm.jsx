import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

import FieldError from "./FieldError";
import { StyledDateTimePicker, StyledForm } from "./utils/styles";

const DateRangeForm = (props) => {
  const {
    id,
    maxdate: maxdateProp,
    message,
    proceed,
    defaultStart,
    defaultEnd,
  } = props;
  const [start, setstart] = useState(defaultStart || null);
  const [end, setend] = useState(defaultEnd || null);
  const [startError, setstartError] = useState(null);
  const [endError, setendError] = useState(null);
  const maxdate = maxdateProp || new Date(2099, 11, 31);

  const onSave = (e) => {
    e.preventDefault();

    let error = false;
    if (start == null || start == "Invalid date") {
      setstartError("Start date is required");
      setstart(null);
      error = true;
    } else {
      setstartError(null);
    }
    if (end == null || end == "Invalid date") {
      setendError("End date is required");
      setend(null);
      error = true;
    } else {
      setendError(null);
    }

    if (proceed && !error) {
      if (new Date(start) > new Date(end)) {
        setstartError("Start date is greater than end date");
      } else {
        proceed({ start, end });
      }
    }
  };

  return (
    <DateRangeStyledForm id={id} onSubmit={onSave}>
      <FormGroup>
        <label>
          {message}
          <span className="label-style">*</span>
        </label>
      </FormGroup>
      <div>
        <FormGroup>
          {startError && <FieldError message={startError} />}
          <StyledDateTimePicker
            id="start-date"
            className="tg-date-field"
            placeholder="From"
            format={"DD MMM YYYY"}
            calendar={true}
            time={false}
            max={maxdate}
            value={start ? new Date(start) : null}
            onChange={(date) => {
              setstart(moment(date).format());
            }}
            required
          />
        </FormGroup>
        <FormGroup>
          {endError && <FieldError message={endError} />}
          <StyledDateTimePicker
            className="tg-date-field"
            placeholder="To"
            format={"DD MMM YYYY"}
            calendar={true}
            time={false}
            max={maxdate}
            value={end ? new Date(end) : null}
            onChange={(date) => {
              setend(moment(date).format());
            }}
            required
          />
        </FormGroup>
      </div>
    </DateRangeStyledForm>
  );
};

const DateRangeStyledForm = styled(StyledForm)`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
  > div {
    display: flex;
    justify-content: space-between;

    > span {
      padding: 10px 16px;
    }
  }
`;

DateRangeForm.propTypes = {
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  id: PropTypes.string,
  message: PropTypes.string,
  maxdate: PropTypes.any,
  defaultStart: PropTypes.string,
  defaultEnd: PropTypes.string,
};

DateRangeForm.defaultProps = {
  message: "Select date range for export",
};

export default DateRangeForm;
