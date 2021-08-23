/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Avatar from "./Avatar";

import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

import Input from "./Input";
import IconButton from "./IconButton";
import { generateUserIntials } from "./utils/project";
import usePrevious from "../hooks/usePrevious";

/* 
const VARIANT_BOTTOM = "bottom";
const UserSelector = (props) => {
  const {
    max,
    label,
    type,
    disabled,
    onChange,
    account_type,
    userRemoved,
    variant,
    className,
    size,
    placeholder,
  } = props;
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(props.selected || []);

  const prevSelected = usePrevious(selected);
  const prevSearch = usePrevious(search);

  useEffect(() => {
    if (prevSelected !== selected) {
      onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (prevSearch !== search) {
      getUsers({
        search: search,
        account_type: account_type,
      });
    }
  }, [search]);

  const searchKey = () => {
    return `${this.state.selectionKey}-${this.state.search}`;
  };

  const getUsers = (filter) => {
    // listUsers(filter)(dispatch);
  };

  const onChange_ = (e) => {
    let username = e.target.value;
    setSearch(username);
    setShowSuggestions(!!username);
  };

  const onSelectUser = (user, e) => {
    e.preventDefault();
    setSearch("");
    setShowSuggestions(false);
    setSelected(Array.from(new Set([...selected, user])));
  };

  const onRemoveUser = (user, e) => {
    e.preventDefault();
    let idx = selected
      .map((user) => {
        return user.id;
      })
      .indexOf(user.id);

    if (userRemoved) {
      userRemoved(user.id);
    }

    if (idx > -1) {
      setSelected(
        Array.from(
          new Set([...selected.slice(0, idx), ...selected.slice(idx + 1)])
        )
      );
    }
  };

  const renderSelection = () => {
    if (selected && selected.length) {
      return (
        <div className="selected">
          {selected.map((user) => {
            return (
              <div
                className={`item ${!label && "nolabel"}`}
                key={`user-${user.id}`}
              >
                <Avatar
                  image={user.avatar_url}
                  initials={generateUserIntials(user)}
                  size="dash"
                />
                <span>{user.display_name}</span>

                {!disabled && (
                  <div className="item-actions">
                    <IconButton
                      name="delete-outline"
                      onClick={(e) => onRemoveUser(user, e)}
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
  };

  return (
    <Wrapper className="tag-input" label={label}>
      {variant !== VARIANT_BOTTOM && renderSelection()}
      <div className="form">
        {label && <label>User</label>}

        {((selected.length === 0 && type === "singular") ||
          type === "normal") && (
          <Input
            disabled={!(!max || max > selected.length) || disabled}
            className={className}
            variant="personalnew"
            size={size}
            placeholder={placeholder}
            {...filterInputProps(props)}
            {...filterEventProps(props)}
            selected={selected}
            value={search}
            onFocus={() => {
              setShowSuggestions(!!search);
            }}
            onChange={(e) => onChange_()}
          />
        )}

        {showSuggestions && (
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
                if (this.props.userType === "developer" && !user.is_developer) {
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
        )}
      </div>

      {variant === VARIANT_BOTTOM ? renderSelection() : null}
    </Wrapper>
  );
};

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

UserSelector.defaultProps = {
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

UserSelector.propTypes = {
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

export default UserSelector;
 */
