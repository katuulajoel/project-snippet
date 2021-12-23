/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import useRightNav from "./useRightNav";

/* --------------------------- Component proptypes -------------------------- */

const RightSideNav = () => {
  const {
    status: { collapsed, content },
  } = useRightNav();

  return (
    <Wrapper className={`nav-${collapsed ? "closed" : "open"}`}>
      <div className="overlay open"></div>
      <div className="main">{content}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(21, 26, 48, 0);
    transition: 0.5s;
    z-index: 1030;
    position: fixed;

    &.open {
      display: none;
      background: rgba(21, 26, 48, 0.8);
    }
  }

  .main {
    width: 480px;
    background: white;
    position: fixed;
    z-index: 1030;
    top: 0;
    bottom: 0;
    transition: 0.5s;
    right: -480px;
  }

  &.nav-open {
    .main {
      right: 0;
    }
    .overlay {
      display: block;
    }
  }
`;

export default RightSideNav;
