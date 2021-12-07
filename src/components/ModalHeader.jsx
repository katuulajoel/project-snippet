/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import IconButton from "./IconButton";

const ModelHeaderProptypes = {
  dismiss: PropTypes.func,
  style: PropTypes.object,
  options: PropTypes.object,
};

export const ModalHeader = ({ dismiss, style, options = {} }) => {
  return (
    <StyledModalHeader style={style}>
      {options.title ? <h3>{options.title}</h3> : null}
      {options.mustRespond ? null : (
        <HeaderActions className="actions">
          <IconButton name="x-circle" onClick={() => dismiss()} />
        </HeaderActions>
      )}
    </StyledModalHeader>
  );
};

export const HeaderActions = styled.div`
  margin: 0 0 0 auto;
  button {
    height: fit-content;
    padding: 40px 0 0 0;

    i {
      color: #8f9bb3;
      font-size: 16px;
    }

    &:first-of-type {
      i {
        transform: rotate(180deg);
        display: inline-block;
      }
    }

    &:last-of-type {
      i {
        font-size: 20px;
      }
    }
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: none;
  padding: 0 40px 40px 40px;

  h3 {
    padding: 16px; /* TODO: fix the styling of the modal header */
    display: inline-block;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #151a30;
    margin-bottom: 0px;
    padding: 40px 0 0 0;

    span {
      color: #8f9bb3;
    }
  }
`;

ModalHeader.propTypes = ModelHeaderProptypes;

export default ModalHeader;
