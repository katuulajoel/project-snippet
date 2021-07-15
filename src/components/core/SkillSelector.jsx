/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import randomstring from "../utils/generateRandomString";
import _ from "lodash";
import styled, { withTheme } from "styled-components";

/* -------------------------- Internal dependencies ------------------------- */
import InputGroup from "./InputGroup";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";
import * as SkillActions from "../../actions/SkillActions";
import IconButton from "./IconButton";

class SkillSelector extends React.Component {
  static defaultProps = {
    placeholder: "Add skills or products",
    selectionKey: null,
    max: null,
  };

  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    selectionKey: PropTypes.string,
    max: PropTypes.number,
    prepend: PropTypes.bool,
    filter: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: this.processSelected(props.selected || props.value),
      selectionKey: props.selectionKey || randomstring.generate(),
      prevKey: null,
      showSuggestions: false,
      search: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.state.selected, prevState.selected) &&
      this.props.onChange
    ) {
      this.props.onChange(this.state.selected);
    }

    if (!_.isEqual(this.state.search, prevState.search)) {
      this.getSkills({
        search: this.state.search,
        type: this.props.filter && this.props.filter.filter,
      });
    }
  }

  searchKey() {
    return `${this.state.selectionKey}-${this.state.search}`;
  }

  processSelected(selected) {
    let finalSelected = [];
    if (Array.isArray(selected)) {
      finalSelected = selected.map((skill) => {
        if (typeof skill === "object") {
          return skill.name;
        } else {
          return skill;
        }
      });
    } else if (typeof selected === "string") {
      finalSelected = selected.split(",");
    }
    return finalSelected.map((skill) => {
      return skill.trim();
    });
  }

  getSkills(filter) {
    const { SkillActions } = this.props;
    SkillActions.getSkills(filter, this.searchKey(), this.state.prevKey);
  }

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let skill = e.target.value;
      this.onSelectSkill(skill, e);
    }
  };

  onChange = (e) => {
    let skill = e.target.value;
    this.setState({
      search: skill,
      showSuggestions: !!skill,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        selected: this.processSelected(nextProps.selected),
      });
    }
  }

  onSelectSkill(skill, e) {
    e.preventDefault();
    this.setState({
      search: "",
      showSuggestions: false,
      selected: Array.from(new Set([...this.state.selected, skill])),
    });
  }

  onRemoveSkill(skill, e) {
    e.preventDefault();
    let idx = this.state.selected.indexOf(skill);
    if (idx > -1) {
      this.setState({
        selected: Array.from(
          new Set([
            ...this.state.selected.slice(0, idx),
            ...this.state.selected.slice(idx + 1),
          ])
        ),
      });
    }
  }

  render() {
    const { max, prepend } = this.props;
    return (
      <div className="tag-input">
        {!max || max > this.state.selected.length ? (
          <div>
            <InputGroup
              className={this.props.className}
              prepend={prepend ? <i className="tg-ic-tag" /> : null}
              size={this.props.size}
              placeholder={this.props.placeholder}
              {...filterInputProps(this.props)}
              {...filterEventProps(this.props)}
              selected={this.state.selected}
              value={this.state.search}
              onFocus={() => {
                this.setState({
                  showSuggestions: !!this.state.search,
                });
              }}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
            {this.state.showSuggestions ? (
              <div className="list-group suggestions">
                {(this.props.Skill.skills[this.searchKey()] || []).map(
                  (skill) => {
                    if (this.state.selected.indexOf(skill.name) > -1) {
                      return null;
                    }
                    return (
                      <a
                        className="list-group-item"
                        key={skill.id}
                        onClick={this.onSelectSkill.bind(this, skill.name)}
                      >
                        {skill.name}
                      </a>
                    );
                  }
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        {this.state.selected && this.state.selected.length ? (
          <SelectedContainer>
            {this.state.selected.map((skill) => {
              return (
                <SelectedItem key={`skill-${skill}`}>
                  {skill}

                  <IconButton
                    name="x-circle"
                    size="sm"
                    onClick={this.onRemoveSkill.bind(this, skill)}
                  />
                </SelectedItem>
              );
            })}
          </SelectedContainer>
        ) : null}
      </div>
    );
  }
}

const SelectedContainer = withTheme(styled.div`
  ${(props) => props.theme.mixins.clearfix}
  margin-top: 24px
`);

const SelectedItem = withTheme(styled.span`
  display: inline-block;
  padding: 0px 12px;
  border-radius: 50px;
  background: rgba(6, 46, 100, 0.04);
  border: 1px solid rgba(6, 46, 100, 0.04);
  margin-right: 2px;

  font-weight: 500;
  font-size: ${(props) => props.theme.functions.pxToRem(14)};
  line-height: ${(props) => props.theme.functions.pxToRem(17)};
  color: ${(props) => props.theme.colors["dark-blue"]};

  button {
    padding: 0 !important;
    height: auto;
    vertical-align: baseline;
    i {
      font-size: ${(props) => props.theme.functions.pxToRem(20)};
      margin-left: 14px;
      color: ${(props) => props.theme.colors["dark-blue"]};
    }
  }
`);

function mapStateToProps(state) {
  return {
    Skill: state.app.Skill,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SkillActions: bindActionCreators(SkillActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillSelector);
