/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import randomstring from "../utils/generateRandomString";
import _, { debounce } from "lodash";
import styled, { withTheme } from "styled-components";

/* -------------------------- Internal dependencies ------------------------- */
import InputGroup from "./InputGroup";
import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";
import * as SkillActions from "../../actions/SkillActions";
import IconButton from "./IconButton";
import Star from "../../assets/images/icons/bi_star.svg";
import StarFilled from "../../assets/images/icons/bi_star_filled.svg";

class PrioritySkillSelector extends React.Component {
  static defaultProps = {
    placeholder: "Add skills or products",
    selectionKey: null,
    max: null,
    display: false,
    enableDelete: false,
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
    display: PropTypes.bool,
    ProfileActions: PropTypes.object,
    user: PropTypes.object,
    enableDelete: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      selectionKey: props.selectionKey || randomstring.generate(),
      prevKey: null,
      showSuggestions: false,
      search: "",
      error: {
        oneSkill: "",
        duplicateSkill: "",
      },
    };
  }

  componentDidMount() {
    this.checkMaxPrimary();
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
    if (!_.isEqual(this.state.selected, prevState.selected)) {
      this.checkMaxPrimary();
    }
  }

  searchKey() {
    return `${this.state.selectionKey}-${this.state.search}`;
  }

  getSkills = debounce((filter) => {
    const { SkillActions } = this.props;
    SkillActions.getSkills(filter, this.searchKey(), this.state.prevKey);
  }, 100);

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
        selected: nextProps.selected,
        error: {
          oneSkill: "",
          duplicateSkill: "",
        },
      });
    }
  }

  onSelectSkill(skill, e) {
    e.preventDefault();
    const isContainedSkill = this.state.selected.some(
      (itm) => itm.name === skill
    );
    if (!isContainedSkill)
      this.setState({
        search: "",
        showSuggestions: false,
        selected: [...this.state.selected, { name: skill, primary: false }],
      });
    else
      this.setState({
        error: {
          ...this.state.error,
          duplicateSkill: `${skill} is already a skill`,
        },
      });
  }

  onRemoveSkill(_, e, index) {
    e.preventDefault();
    const splicedItem = this.state.selected.filter(
      (_, iindex) => iindex + 1 !== index
    );
    if (splicedItem) {
      this.setState({
        selected: splicedItem,
      });
    }
  }

  removeSkillAndUpdateUser(skill, e) {
    if (!this.props.enableDelete)
      return this.setState({
        error: {
          ...this.state.error,
          oneSkill: "You must have at least one skill",
        },
      });

    this.onRemoveSkill(skill, e);

    const { user, ProfileActions } = this.props;
    let filteredSkills = user.profile.skills.filter(
      (item) => item.id !== skill.id
    );
    ProfileActions.updateProfile(user.profile.id, {
      skills: filteredSkills,
    });
  }

  markAsPrimary(skill, e) {
    e.preventDefault();
    if (this.checkMaxPrimary() >= 5 && !skill.primary) {
      return;
    }
    let selectedSkills = this.state.selected.map((item) => {
      if (item.name == skill.name) {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          primary: !item.primary,
          type: item.type,
        };
      } else {
        return item;
      }
    });
    this.setState({ selected: selectedSkills });
  }
  checkMaxPrimary() {
    let maxPrimary = 0;
    this.state.selected.forEach((skill) => {
      if (skill.primary) {
        maxPrimary++;
      }
    });
    return maxPrimary;
  }

  render() {
    const { max, prepend } = this.props;
    return (
      <div className="tag-input">
        {(!max || max > this.state.selected.length) && !this.props.display ? (
          <div>
            {this.state.error.duplicateSkill && (
              <span style={{ color: "#da3450" }}>
                {this.state.error.duplicateSkill}
              </span>
            )}
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
                    let exisits = false;
                    this.state.selected.forEach((item) => {
                      if (item.name === skill.name) {
                        exisits = true;
                      }
                    });
                    if (exisits) {
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
        {this.state.error.oneSkill && (
          <span style={{ color: "#da3450" }}>{this.state.error.oneSkill}</span>
        )}
        {this.state.selected && this.state.selected.length ? (
          <SelectedContainer display={this.props.display}>
            {this.state.selected.map((skill, index) => {
              return (
                <>
                  {this.props.display ? (
                    <SelectedItem2 key={`skill-${skill.name}`}>
                      {skill.primary ? (
                        <>
                          <img src={StarFilled} />
                          &nbsp;&nbsp;
                        </>
                      ) : null}
                      {skill.name}
                      <IconButton
                        name="x-circle"
                        size="sm"
                        onClick={this.removeSkillAndUpdateUser.bind(
                          this,
                          skill
                        )}
                      />
                    </SelectedItem2>
                  ) : (
                    <SelectedItem key={`skill-${skill.name}`}>
                      <span>{skill.name}</span>

                      <div className="actions">
                        <span
                          className={
                            this.checkMaxPrimary() >= 5 && !skill.primary
                              ? "disable"
                              : ""
                          }
                          onClick={this.markAsPrimary.bind(this, skill)}
                        >
                          <span>
                            {skill.primary
                              ? "Remove primary status"
                              : "Mark as primary skill"}
                          </span>
                          &nbsp;&nbsp;
                          {skill.primary ? (
                            <img src={StarFilled} />
                          ) : (
                            <img src={Star} />
                          )}
                        </span>
                        {this.state.selected.length > 1 && (
                          <IconButton
                            name="delete-outline"
                            size="sm"
                            onClick={(e) =>
                              this.onRemoveSkill(skill, e, index + 1)
                            }
                          />
                        )}
                      </div>
                    </SelectedItem>
                  )}
                </>
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
  ${(props) => (!props.display ? "margin-top: 24px" : "margin-bottom: 24px")}
`);

const SelectedItem2 = withTheme(styled.span`
  display: inline-block;
  padding: 0px 12px;
  border-radius: 50px;
  background: rgba(6, 46, 100, 0.04);
  border: 1px solid rgba(6, 46, 100, 0.04);
  margin-right: 16px;

  font-weight: 500;
  font-size: ${(props) => props.theme.functions.pxToRem(14)};
  line-height: ${(props) => props.theme.functions.pxToRem(17)};
  color: ${(props) => props.theme.colors["dark-blue"]};

  img {
    height: 15px;
  }

  button {
    height: auto;
    vertical-align: baseline;
    i {
      font-size: ${(props) => props.theme.functions.pxToRem(15)};
      margin-left: 14px;
      color: ${(props) => props.theme.colors["dark-blue"]};
    }

    &:disabled {
      i {
        opacity: 0.3;
      }
    }
  }
`);

const SelectedItem = withTheme(styled.div`
  font-weight: 500;
  font-size: ${(props) => props.theme.functions.pxToRem(14)};
  line-height: ${(props) => props.theme.functions.pxToRem(17)};
  color: ${(props) => props.theme.colors["dark-blue"]};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #edf1f7;
  padding: 16px 0;

  > span {
    display: inline-block;
    place-self: center;
    padding: 8px 12px;
    border-radius: 50px;
    background: rgba(6, 46, 100, 0.04);
    border: 1px solid rgba(6, 46, 100, 0.04);
    margin-right: 16px;
  }

  .actions {
    padding-top: 8px;
    span {
      &.disable {
        opacity: 0.3;
        cursor: default;
      }
      cursor: pointer;
      span {
        display: none;
      }
    }
  }
  &:hover {
    .actions {
      span {
        &.disable span {
          display: none;
        }
        span {
          display: inline-block;
        }
      }
    }
  }

  button {
    height: auto;
    vertical-align: baseline;
    i {
      font-size: ${(props) => props.theme.functions.pxToRem(20)};
      margin-left: 14px;
      color: ${(props) => props.theme.colors["dark-blue"]};
    }

    &:disabled {
      i {
        opacity: 0.3;
      }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrioritySkillSelector);
