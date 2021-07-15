import React from "react";
import PropTypes from "prop-types";
import styleable from "react-styleable";

import PlaceholderImg from "../../../assets/images/empty-state/empty-file.png"; // TODO: get image that is same as rendered image or double the resolution
import PlaceholderImg2 from "../../../assets/images/empty-state/person-waiting.png";
import css from "./SummaryPlaceholder.module.scss";

const SummaryPlaceholder = ({ description, className }) => {
    return (
        <div className={`${css.empty} ${css[className]}`}>
            {className !== "empty-table" && (
                <img
                    src={
                        className == "summary"
                            ? PlaceholderImg
                            : PlaceholderImg2
                    }
                    alt="empty file image"
                />
            )}
            <p>{description}</p>
        </div>
    );
};

SummaryPlaceholder.propTypes = {
    description: PropTypes.string,
    className: PropTypes.string
};

SummaryPlaceholder.defaultProps = {
    className: "summary"
};

export default styleable(css)(SummaryPlaceholder);
