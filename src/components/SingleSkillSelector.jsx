/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import _ from "lodash";
import styled from "styled-components";

/* -------------------------- Internal dependencies ------------------------- */
import { generateRandomString } from "./utils/stringUtils";
import InputGroup from "./InputGroup";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";
import IconButton from "./IconButton";
import Input from "./Input";

class SingleSkillSelector extends React.Component {
  static defaultProps = {
    placeholder: "Add skills or products",
    selectionKey: null,
    max: null,
    excludeSkills: [],
    type: "single",
  };

  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.object,
    onChange: PropTypes.func,
    selectionKey: PropTypes.string,
    filter: PropTypes.string,
    removeSkill: PropTypes.func,
    score: PropTypes.number,
    allowDelete: PropTypes.bool,
    position: PropTypes.number,
    skill: PropTypes.string,
    excludeSkills: PropTypes.array,
    type: PropTypes.string,
    SkillActions: PropTypes.object,
    Skill: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.skill,
      selectionKey: props.selectionKey || generateRandomString(),
      prevKey: null,
      showSuggestions: false,
      search: props.type === "single" && props.skill ? props.skill.name : "",
      score: props.score || "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!_.isEqual(this.state.selected, prevState.selected) || !_.isEqual(this.state.score, prevState.score)) &&
      this.props.onChange
    ) {
      this.props.onChange(this.state.selected, this.state.score);
    }

    if (!_.isEqual(this.state.search, prevState.search)) {
      this.getSkills({
        search: this.state.search,
        type: this.props.filter && this.props.filter.filter,
      });
    }

    if (!_.isEqual(this.props.skill, prevProps.skill)) {
      this.setState({
        selected: this.props.skill,
        ...(this.props.type === "single" ? { search: this.props.skill ? this.props.skill.name : "" } : {}),
      });
    }

    if (!_.isEqual(this.props.score, prevProps.score)) {
      this.setState({
        score: this.props.score,
      });
    }
  }

  searchKey() {
    return `${this.state.selectionKey}-${this.state.search}`;
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

  onChangeSkill = (e) => {
    let skill = e.target.value;
    this.setState({
      search: skill,
      showSuggestions: !!skill,
    });
  };

  onChange = (e) => {
    let score = e.target.value;
    this.setState({
      score: score,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        selected: nextProps.selected,
      });
    }
  }

  onSelectSkill(skill, e) {
    e.preventDefault();
    this.setState({
      search: this.props.type === "single" ? skill.name : "",
      showSuggestions: false,
      selected: skill,
    });
  }

  onRemoveSkill(e) {
    e.preventDefault();

    if (this.props.removeSkill) {
      this.props.removeSkill(this.props.position);
    }
  }

  render() {
    return (
      <SelectedContainer>
        {(this.props.type === "single" || !this.state.selected) && (
          <div style={{ position: "relative" }}>
            <InputGroup
              className={this.props.className}
              placeholder="Search Skill"
              {...filterInputProps(this.props)}
              {...filterEventProps(this.props)}
              selected={this.state.selected}
              value={this.state.search}
              onFocus={() => {
                this.setState({
                  showSuggestions: !!this.state.search,
                });
              }}
              onChange={this.onChangeSkill}
              onKeyPress={this.onKeyPress}
            />
            {this.state.showSuggestions ? (
              <div className="list-group suggestions">
                {(this.props.Skill.skills[this.searchKey()] || []).map((skill) => {
                  if (skill === this.state.selected) {
                    return null;
                  }
                  if (this.props.excludeSkills.length > 0 && this.props.excludeSkills.includes(skill.id)) {
                    return null;
                  }

                  return (
                    <a className="list-group-item" key={skill.id} onClick={this.onSelectSkill.bind(this, skill)}>
                      {skill.name}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
        {this.props.type !== "single" && this.state.selected ? (
          <Input
            className="selected-item"
            key={`skill-${this.state.selected.id}`}
            value={this.state.selected.name}
            disabled={this.props.type === "single" ? false : true}
            onClick={() => {}}
          />
        ) : null}

        {this.props.type !== "single" && (
          <>
            <Input
              placeholder="Score"
              onChange={this.onChange}
              value={this.props.score}
              type="number"
              min="0"
              max="100"
              step={1}
            />

            <div className="item-actions">
              <IconButton
                disabled={!this.props.allowDelete}
                name="delete-outline"
                onClick={(e) => {
                  this.onRemoveSkill(e);
                }}
              />
            </div>
          </>
        )}
      </SelectedContainer>
    );
  }
}

const SelectedContainer = styled.div`
  padding-bottom: ${(props) => (props.type === "single" ? "20px" : "0px")};
  display: flex;
  flex-direction: row;
  gap: 16px;
  ${(props) => (props.type === "single" ? "" : "width: 153px")};

  .input-group {
    ${(props) => (props.type === "single" ? "" : "box-shadow: none")};
  }

  .input-group input {
    border-right: 1px solid rgba(194, 204, 217, 0.25) !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    min-width: 150px;
    margin-bottom: 0 !important;
  }

  .suggestions {
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .selected-item {
    color: #3e4857;
    min-width: 150px;
  }
  .item-actions {
    margin: 0px 0px 0px auto;
  }
`;

export default SingleSkillSelector;
