import PropTypes from "prop-types";
import React from "react";

import { filterEventProps } from "../utils/events";
import { filterInputProps } from "../utils/forms";

export default class Select extends React.Component {
  static defaultProps = {
    options: [],
    placeholder: "-- Select --",
    grouped: false,
  };

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selected: PropTypes.any,
    children: PropTypes.any,
    onChange: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    grouped: PropTypes.bool,
    required: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  onChange(e) {
    let choice = e.target.value;
    this.setState({ selected: choice });
    if (this.props.onChange) {
      this.props.onChange(choice);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  renderOptions(options) {
    return options.map((option) => {
      const { value, name } = option;

      return (
        <option
          key={`option-${value}`}
          value={value}
          data-testid={`option-${value}`}
        >
          {name}
        </option>
      );
    });
  }

  render() {
    return (
      <div data-testid="select-component">
        <select
          className={`form-control ${this.props.className || ""} ${
            this.props.size ? `form-control-${this.props.size}` : ""
          }`}
          {...filterInputProps(this.props)}
          {...filterEventProps(this.props)}
          value={this.state.selected || ""}
          onChange={this.onChange.bind(this)}
          required={this.props.required}
        >
          {this.props.placeholder ? (
            <option key="option-placeholder" value="">
              {this.props.placeholder}
            </option>
          ) : null}

          {this.props.children
            ? this.props.children
            : this.renderOptions(this.props.options)}
        </select>
      </div>
    );
  }
}
