import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Icon from "./Icon";
import OverlayTooltip from "./OverlayTooltip";
import styled from "styled-components";

const Avatar = (props) => {
  const {
    className,
    image,
    icon,
    size,
    title,
    link,
    badge,
    verified,
    initials,
  } = props;
  let avatar = (
    <div
      className={`${size ? `avatar-${size}` : ""} ${
        image ? "" : initials ? "avatar-initials" : "avatar-icon"
      }`}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    >
      {image ? null : initials ? initials : icon || <Icon name="avatar" />}
    </div>
  );

  let linkifiedAvatar = link ? <Link to={link}>{avatar}</Link> : avatar;

  return (
    <Wrapper className={className}>
      {badge ? <span className="badge">{badge}</span> : null}
      {verified ? <Icon name="check" className="verified" /> : null}
      {title ? (
        <OverlayTooltip placement="top" overlay={title}>
          {linkifiedAvatar}
        </OverlayTooltip>
      ) : (
        linkifiedAvatar
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;

  &.avatar-dash {
    font-size: 48px;
    width: 48px;
    height: 48px;
  }

  & .avatar-initials {
    font-size: 14px !important;
  }

  &.avatar-tunga .avatar-initials {
    background-color: #da3451;
  }
`;

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  badge: PropTypes.number,
  verified: PropTypes.bool,
  remove: PropTypes.bool,
  onRemove: PropTypes.func,
  initials: PropTypes.string,
};

Avatar.defaultProps = {
  verified: false,
  remove: false,
  initials: null,
};

export default Avatar;
