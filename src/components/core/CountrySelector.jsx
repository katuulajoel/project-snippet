/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

/* ------------------------- Component dependencies ------------------------- */
import Select from "./Select";
import { filterEventProps } from "./utils/events";
import { getCountries } from "../../actions/ProfileActions";
import { filterInputProps } from "./utils/forms";
import Icon from "./Icon";

class CountrySelector extends React.Component {
  static defaultProps = {
    placeholder: "-- Select a country --",
  };

  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { selected: props.selected || props.value };
  }

  componentDidMount() {
    const { countries, getCountries } = this.props;
    if (!countries || countries.length === 0) {
      getCountries();
    }
  }

  onChange(choice) {
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

  getOptions() {
    let options = [];
    options.push(["--", this.props.placeholder || "-- Select a country --"]);

    const { countries } = this.props;

    const countriesWithCodes = countries.reduce(function (
      accumulator,
      currentValue
    ) {
      if (currentValue.code) {
        accumulator.push(currentValue);
      }
      return accumulator;
    },
    []);

    if (countriesWithCodes && countriesWithCodes.length) {
      countriesWithCodes.forEach((country, idx) => {
        if (country.code || idx) {
          options.push([
            country.code,
            country.name === "The Netherlands" ? "Netherlands" : country.name,
          ]);
        }
      });
    }
    return options;
  }

  render() {
    return (
      <Wrapper>
        <Select
          className={this.props.className}
          size={this.props.size}
          options={this.getOptions()}
          placeholder={null}
          {...filterInputProps(this.props)}
          {...filterEventProps(this.props)}
          selected={this.state.selected}
          onChange={this.onChange.bind(this)}
          required={this.props.required}
        />

        <Icon name="rounded-keyboard-arrow-down" size="sm" />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  select {
    padding-right: 35px;
    /* for Firefox */
    -moz-appearance: none;
    /* for Chrome */
    -webkit-appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  i {
    font-size: 10px;
    margin: auto;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8f9bb3;
  }
`;

function mapStateToProps(state) {
  return {
    countries: state.app.Profile.countries,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountries: bindActionCreators(getCountries, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);
