import React from "react";
import PropTypes from "prop-types";

import { DateTimePicker as DTP } from "react-widgets";
import moment from "moment/moment";
import momentLocalizer from "react-widgets-moment";

new momentLocalizer(moment);

export default class DateTimePicker extends React.Component {
  static propTypes = {
    onToggle: PropTypes.bool,
    onClick: PropTypes.bool,
    time: PropTypes.bool,
    calendar: PropTypes.bool,
    open: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { open: this.props.open || false };
  }

  onClick(event) {
    if (event.target.tagName === "INPUT") {
      const { time, calendar } = this.props;
      this.open(time && !calendar ? "time" : "calendar");
    }

    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  }

  onToggle(view) {
    this.open(view);

    const { onToggle } = this.props;
    if (onToggle) {
      onToggle(view);
    }
  }

  open(view = null) {
    this.setState({ open: view });
  }

  render() {
    return (
      <DTP
        {...this.props}
        onClick={this.onClick.bind(this)}
        onToggle={this.onToggle.bind(this)}
        open={this.state.open}
      />
    );
  }
}
