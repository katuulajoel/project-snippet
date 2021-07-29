/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Link } from "react-router-dom";
import styled, { withTheme, createGlobalStyle } from "styled-components";
import PropTypes from "prop-types";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../components/Icon";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  user: PropTypes.object,
  theme: PropTypes.object,
  ProjectActions: PropTypes.object,
  contentType: PropTypes.string,
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #f8f8f8;
  }
`;

const CreateLayout = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div className="layout-navbar">
        <NavWizard showIndicator={true} percentage={30}>
          <div className="nav-content">
            <span className="layout-close">
              <Link to="/dashboard">
                <Icon name="x-circle" />
                Close
              </Link>
            </span>

            <h5>wizard title {/* TODO: fix the wizard title*/}</h5>

            <span className="layout-steps">Step 1 of 3</span>
          </div>
          <div className="nav-wizard-indicator"></div>
        </NavWizard>
      </div>
    </Wrapper>
  );
};

const Wrapper = withTheme(styled.div`
  height: 100vh;
  display: block;
  width: 100%;
  position: fixed;
  margin-top: 73px;
  overflow-y: scroll;
  overflow-x: scroll;

  &:hover::-webkit-scrollbar {
    visibility: visible;
  }

  &::-webkit-scrollbar {
    visibility: hidden;
  }

  ${(props) => props.theme.mixins.scrollbar}

  .layout-navbar {
    display: block;
    background: #fff;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 80%, 0.5);
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
  }
`);

const NavWizard = withTheme(styled.div`
  .nav-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 24px 40px;

    h5 {
      font-weight: bold;
      font-size: ${(props) => props.theme.functions.pxToRem(20)};
      line-height: ${(props) => props.theme.functions.pxToRem(24)};
      text-align: center;
      color: ${(props) => props.theme.colors["text-black"]};
      margin: 0;
    }

    .layout-close a,
    .layout-steps {
      font-weight: 500;
      font-size: ${(props) => props.theme.functions.pxToRem(16)};
      line-height: ${(props) => props.theme.functions.pxToRem(19)};
      color: ${(props) => props.theme.colors["gray"]};
    }

    .layout-close a {
      text-decoration: none;
      i {
        font-size: ${(props) => props.theme.functions.pxToRem(20)};
        vertical-align: bottom;
        margin-right: 10px;
      }
    }
  }
  .nav-wizard-indicator:after {
    content: "";
    display: block;
    width: ${(props) => props.percentage}%;
    ${(props) => (props.showIndicator ? props.theme.mixins.borderBottom : "")}
  }
`);

CreateLayout.propTypes = proptypes;

CreateLayout.defaultProps = {
  contentType: "project-creation",
};

export default CreateLayout;
