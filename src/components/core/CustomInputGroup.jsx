/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */ import PropTypes from "prop-types";
import React from "react";

/* -------------------------- Internel Dependencies ------------------------- */
import InputGroup from "./InputGroup";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";
import Icon from "./Icon";
import IconButton from "./IconButton";

const CUSTOM_INPUTS = {
  search: {
    className: "input-search input-search-branded",
    placeholder: "Search",
    prepend: <Icon name="search1" />,
  },
  "search-plain": {
    className: "input-search ",
    placeholder: "Search",
    prepend: <Icon name="search1" />,
  },
  "search-action": {
    className: "input-search ",
    placeholder: "Search....",
    prepend: <Icon name="search1" />,
    isAppendText: false,
    append: <IconButton className="search-close-btn" name="x-circle" />,
    appendFunc: (context) => {
      context.props.onChange({
        target: {
          value: "",
        },
      });
    },
  },
  message: {
    placeholder: "Type message here",
    isAppendText: false,
    append: (
      <button className="btn" type="button">
        <Icon name="paper-plane" />
      </button>
    ),
  },
  number: {
    type: "number",
  },
  url: {
    placeholder: "Paste URL here",
    prepend: <Icon name="link" />,
  },
  personal: {
    placeholder: "Name",
    prepend: <Icon name="avatar" />,
  },
  remove: {
    placeholder: "Text",
    append: <Icon name="delete-outline" />,
  },
  personalnew: {
    placeholder: "Name",
    append: <Icon name="arrow-down" />,
  },
  address: {
    placeholder: "Address",
    prepend: <Icon name="map-marker" />,
  },
  tel: {
    placeholder: "Phone number",
    prepend: <Icon name="phone" />,
  },
  email: {
    type: "email",
    placeholder: "Email address",
    prepend: <Icon name="envelope" />,
  },
  password: {
    type: "password",
    placeholder: "Password",
    prepend: <Icon name="lock" />,
  },
};

export default class CustomInputGroup extends React.Component {
  static defaultProps = {
    variant: null,
  };

  static propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { passwordType: "password" };
  }

  showPassword() {
    if (this.state.passwordType == "password") {
      this.setState({ passwordType: "text" });
    } else {
      this.setState({ passwordType: "password" });
    }
  }

  getProperties() {
    let password2 = {
      type: this.state.passwordType,
      placeholder: "Password",
      append: (
        <IconButton
          onClick={() => this.showPassword()}
          name="outline-remove-red-eye"
          className={this.state.passwordType !== "text" ? "" : "red-icon"}
        />
      ),
    };

    let variantProps =
        this.props.variant == "password2"
          ? password2
          : CUSTOM_INPUTS[this.props.variant] || {},
      overrideProps = this.cleanProps(),
      required = this.props.required;

    return {
      ...variantProps,
      ...overrideProps,
      ...required,
      ...{
        className: `${variantProps.className || ""} ${
          overrideProps.className || ""
        }`,
      },
    };
  }

  cleanProps() {
    const allowedProps = ["className", "placeholder", "prepend", "type"],
      cleanedProps = {};
    allowedProps.forEach((key) => {
      if (this.props[key]) {
        cleanedProps[key] = this.props[key];
      }
    });
    return cleanedProps;
  }

  render() {
    return (
      <InputGroup
        {...this.getProperties()}
        {...filterInputProps(this.props)}
        {...filterEventProps(this.props)}
      />
    );
  }
}
