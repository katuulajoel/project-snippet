import React from "react";

import { DateTimePicker as DTP } from "react-widgets";
import moment from "moment/moment";
import momentLocalizer from "react-widgets-moment";
import styled from "styled-components";
import Icon from "./Icon";

new momentLocalizer(moment);

const DateTimePicker = (props) => {
  return <Wrapper {...props} selectIcon={<Icon name="calendar2" />} />;
};

const Wrapper = styled(DTP)`
  border: 1px solid rgba(194, 204, 217, 0.5);
  border-radius: 4px;
  .rw-widget-container {
    grid-template: 1fr/1fr 2.3em;
    border: none;
    input,
    button {
      border: none !important;
    }
    input {
      width: inherit;
    }
    button {
      color: rgb(143, 155, 179);
      font-size: 16px;
      width: initial;
      display: flex;
      justify-content: center;
    }
  }
`;

export default DateTimePicker;
