/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* -------------------------- Internel Dependencies ------------------------- */
import Icon from './Icon';
import IconButton from './IconButton';

const propTypes = {
  dismiss: PropTypes.func,
  style: PropTypes.object,
  options: PropTypes.object,
  msg: PropTypes.string,
};

const AlertDialogue = ({ dismiss, msg }) => {
  return (
    <Wrapper>
      <span id="msg">
        <Icon name="check" size="sm" /> {msg}
      </span>

      <span>
        <IconButton name="close" size="sm" onClick={dismiss} />
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    &:first-of-type {
      i {
        margin-right: 17px;
      }
    }

    a {
      text-decoration: none;
      margin-right: 25px;
      color: #219653;
      line-height: 21px;
      font-size: 14px;
      font-weight: 500;
      vertical-align: bottom;
    }

    button {
      display: inline-flex;
      height: auto;
      i {
        font-size: 12px;
        color: #219653;
      }
    }
  }
`;

AlertDialogue.defaultProps = {
  msg: 'Invoice archived',
};

AlertDialogue.propTypes = propTypes;

export default AlertDialogue;
