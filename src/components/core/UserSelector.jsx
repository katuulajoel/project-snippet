/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import randomstring from "../utils/generateRandomString";
import _ from "lodash";
import styled from "styled-components";
import Avatar from "./Avatar";

import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

import * as UserActions from "../../actions/UserActions";
import Input from "./Input";
import IconButton from "./IconButton";
import { generateUserIntials } from "./utils/project";

const VARIANT_BOTTOM = "bottom";

class UserSelector extends React.Component {
  static defaultProps = {
    placeholder: "Type a name or username here",
    selectionKey: null,
    max: null,
    label: true,
    type: "normal",
    filter: false,
    users: [],
    userType: "",
    disabled: false,
  };

  static propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    selected: PropTypes.array,
    onChange: PropTypes.func,
    size: PropTypes.string,
    placeholder: PropTypes.string,
    selectionKey: PropTypes.string,
    account_type: PropTypes.string,
    max: PropTypes.number,
    label: PropTypes.bool,
    type: PropTypes.string,
    filter: PropTypes.array,
    userRemoved: PropTypes.func,
    userType: PropTypes.string,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.value || [],
      selectionKey: props.selectionKey || randomstring.generate(),
      prevKey: null,
      showSuggestions: false,
      search: "",
    };
  }

  componentDidUpdate(__, prevState) {
    if (
      !_.isEqual(this.state.selected, prevState.selected) &&
      this.props.onChange
    ) {
      this.props.onChange(this.state.selected);
    }

    if (!_.isEqual(this.state.search, prevState.search)) {
      this.getUsers({
        search: this.state.search,
        account_type: this.props.account_type,
      });
    }
  }

  searchKey() {
    return `${this.state.selectionKey}-${this.state.search}`;
  }

  getUsers(filter) {
    const { UserActions } = this.props;
    UserActions.listUsers(filter, this.searchKey(), this.state.prevKey);
  }

  onChange(e) {
    let username = e.target.value;
    this.setState({ search: username, showSuggestions: !!username });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.selected, this.props.selected)) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onSelectUser(user, e) {
    e.preventDefault();
    this.setState({
      search: "",
      showSuggestions: false,
      selected: Array.from(new Set([...this.state.selected, user])),
    });
  }

  onRemoveUser(user, e) {
    e.preventDefault();
    let idx = this.state.selected
      .map((user) => {
        return user.id;
      })
      .indexOf(user.id);

    if (this.props.userRemoved) {
      this.props.userRemoved(user.id);
    }

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

  renderSelection() {
    if (this.state.selected && this.state.selected.length) {
      return (
        <div className="selected">
          {this.state.selected.map((user) => {
            return (
              <div
                className={`item ${!this.props.label && "nolabel"}`}
                key={`user-${user.id}`}
              >
                <Avatar
                  image={user.avatar_url}
                  initials={generateUserIntials(user)}
                  size="dash"
                />
                <span>{user.display_name}</span>

                {!this.props.disabled && (
                  <div className="item-actions">
                    <IconButton
                      name="delete-outline"
                      onClick={this.onRemoveUser.bind(this, user)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const { max, label, type, disabled } = this.props;

    return (
      <Wrapper className="tag-input" label={label}>
        {this.props.variant !== VARIANT_BOTTOM ? this.renderSelection() : null}
        <div className="form">
          {label && <label>User</label>}

          {((this.state.selected.length === 0 && type === "singular") ||
            type === "normal") && (
            <Input
              disabled={!(!max || max > this.state.selected.length) || disabled}
              className={this.props.className}
              variant="personalnew"
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
              onChange={this.onChange.bind(this)}
            />
          )}

          {this.state.showSuggestions ? (
            <div className="list-group suggestions">
              {(this.props.User.ids[this.searchKey()] || []).map((id) => {
                let user = this.props.User.users[id] || {};
                if (
                  this.state.selected.indexOf(id) > -1 ||
                  (this.props.filter && !this.props.users.includes(user.id))
                ) {
                  return null;
                }
                if (this.props.userType !== "") {
                  if (
                    this.props.userType === "developer" &&
                    !user.is_developer
                  ) {
                    return null;
                  }
                }
                return (
                  <div
                    className="item-selected"
                    key={`user-${user.id}`}
                    onClick={this.onSelectUser.bind(this, user)}
                  >
                    <Avatar
                      image={user.avatar_url}
                      initials={generateUserIntials(user)}
                      size="dash"
                    />
                    <span>{user.display_name}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {this.props.variant === VARIANT_BOTTOM ? this.renderSelection() : null}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #151a30;
  }

  .form {
    ${(props) =>
      props.label
        ? "padding-bottom: 40px; border-bottom: 1px solid #edf1f7;"
        : ""}
  }

  .selected {
    ${(props) => (props.label ? "padding-top: 40px;" : "padding-bottom: 20px;")}
  }

  .suggestions {
    background: #fff;
    padding: 11px 16px;
    border: 1px solid #edf1f7;

    .item-selected {
      cursor: pointer;
      margin-bottom: 0px;
      border: none;
      border-bottom: 1px solid #edf1f7;
      padding: 11px 0px;

      &::last-of-type {
        border-bottom: none;
      }
    }
  }

  .item.nolabel {
    padding: 5px 8px;
    .avatar.avatar-dash {
      width: 29px;
      height: 29px;

      &.avatar-initials {
        font-size: 10px;
      }
    }

    button {
      height: auto;
    }
  }

  .item,
  .item-selected {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;
    border: 1px solid #edf1f7;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 11px 16px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .avatar.avatar-dash {
      width: 35px;
      height: 35px;

      &.avatar-initials {
        font-size: 14px;
      }
    }

    > span {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #3e4857;
    }

    .item-actions {
      margin: 0 0 0 auto;

      button i {
        margin-left: 30px;
        color: #8f9bb3;
        font-size: 20px;
      }
    }
  }
`;

function mapStateToProps(state) {
  return {
    User: state.app.User,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserActions: bindActionCreators(UserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelector);
