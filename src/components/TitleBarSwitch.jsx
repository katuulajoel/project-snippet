import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_PROJECT_FILTER } from "../configs/constants/ActionTypes";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  toggleProjectFilters: PropTypes.func,
  projectPMFilter: PropTypes.object,
};

const TitleBarSwitch = () => {
  const dispatch = useDispatch();
  const { projectPMFilter } = useSelector(({ Projects }) => Projects);

  const onChangeValue = (value) => {
    dispatch({ type: TOGGLE_PROJECT_FILTER, data: value });
  };

  return (
    <Wrapper>
      <div className="switch">
        <label htmlFor="toggle" style={{ margin: 0 }}>
          Show all projects
        </label>
        <input
          type="checkbox"
          className="toggle-switch"
          id="toggle"
          checked={projectPMFilter}
          onChange={(e) => onChangeValue(e.target.checked)}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  float: right;

  .switch {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.6em;
  }

  .toggle-switch {
    --clr-unchecked: #eee;
    --clr-background-checked: rgba(0, 0, 0, 0.6);
    --clr-background-unchecked: rgba(0, 0, 0, 0.3);
    --clr-background-hover: rgba(0, 0, 0, 0.4);
    --clr-shadow: rgba(0, 0, 0, 0.75);
    --clr-highlight: rgba(255, 255, 255, 0.75);
    --transition-length: 200ms;
    --transition: cubic-bezier(0.76, 0.08, 0.54, 1.4);
    --size-height: 1.5em;
    --size-width: 3em;
    --size-gap: 0.2em;
    --size-focus: var(--size-gap);
    --size-shadow: var(--size-gap);
    appearance: none;
    outline: none;
    position: relative;
    cursor: pointer;
    width: var(--size-width);
    height: var(--size-height);
    border-radius: calc(var(--size-height) / 2);
    background: var(--clr-background-unchecked);
    box-shadow: inset 0 0 calc(var(--size-height) / 4) var(--clr-shadow);

    &:checked {
      background: var(--clr-background-checked);
    }

    &:hover {
      background: var(--clr-background-hover);
    }

    &::after {
      content: "";
      position: absolute;
      top: var(--size-gap);
      left: var(--size-gap);
      bottom: var(--size-gap);
      width: calc(var(--size-height) - (var(--size-gap) * 2));
      border-radius: 50%;
      background: var(--clr-unchecked);
      box-shadow: inset 0 0 calc(var(--size-height) / 4) var(--clr-highlight),
        0 0 var(--size-shadow) 0 var(--clr-shadow);
      transition: left var(--transition-length) var(--transition),
        background var(--transition-length) var(--transition);
    }

    &:checked::after {
      left: calc(var(--size-width) - var(--size-height) + var(--size-gap));
    }

    & + label {
      cursor: pointer;
    }
  }
`;

TitleBarSwitch.propTypes = proptypes;

export default TitleBarSwitch;
