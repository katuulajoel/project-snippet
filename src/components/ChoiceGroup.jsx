import PropTypes from "prop-types";
import React, { useState } from "react";

import Button from "./Button";
import Icon from "./Icon";

import { filterEventProps } from "../utils/events";

const ChoiceGroup = (props) => {
  const {
    selected: _selected,
    disabled,
    onChange,
    className,
    variant,
    size,
    choices,
  } = props;
  const [selected, setSelected] = useState(_selected);

  const makeChoice = (choice) => {
    if (!disabled) {
      setSelected(choice);
      if (onChange) {
        onChange(choice);
      }
    }
  };

  return (
    <div className={`btn-group choice-group ${className || ""}`}>
      {choices.map((choice) => {
        let choiceValue = choice,
          choiceName = choice,
          choiceIcon = null;

        if (Array.isArray(choice)) {
          choiceValue = choice[0];
          choiceName = choice[1];
          choiceIcon = choice[2];
        }

        return (
          <Button
            key={`choice-${choiceValue}`}
            variant={variant || "choice"}
            size={size}
            className={`${selected === choiceValue ? "active" : ""}`}
            {...filterEventProps(props)}
            onClick={() => makeChoice(choiceValue)}
          >
            {choiceName}
            {choiceIcon && variant === "card" && (
              <Icon name={choiceIcon} size={"lg"} className="icon" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

ChoiceGroup.defaultProps = {
  variant: "choice",
  choices: [],
  disabled: false,
};

ChoiceGroup.propTypes = {
  className: PropTypes.string,
  choices: PropTypes.array,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ChoiceGroup;
