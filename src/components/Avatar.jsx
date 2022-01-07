import React from "react";
import PropTypes from "prop-types";

import Icon from "./Icon";
import OverlayTooltip from "./OverlayTooltip";
import styled from "styled-components";

const Avatar = (props) => {
  const { className, image, icon, title, badge, verified, initials } = props;
  let avatar = (
    <div
      className={`avatar ${className}`}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    >
      {image ? null : initials ? initials : icon || <Icon name="avatar" />}
    </div>
  );

  return (
    <Wrapper className={className}>
      {badge ? <span className="badge">{badge}</span> : null}
      {verified ? <Icon name="check" className="verified" /> : null}
      {title ? (
        <OverlayTooltip placement="top" overlay={title}>
          {avatar}
        </OverlayTooltip>
      ) : (
        avatar
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;

  .verified {
    color: #40bb56;
    position: absolute;
    top: -1px;
    right: -1px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border: 1px solid #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 5px 8px 24px;

    &.avatar-initials {
      align-items: center;
      color: #fff;
      background-color: #062e64;
    }

    &.avatar-tunga {
      align-items: center;
      color: #fff;
      background-color: #da3451;
    }

    &.avatar-icon {
      background: #e9edf0;
      align-items: center;
    }
  }
`;

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  badge: PropTypes.number,
  title: PropTypes.number,
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
