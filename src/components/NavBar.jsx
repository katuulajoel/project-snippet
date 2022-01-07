/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchBox from "./SearchBox";
import NavLinks from "./NavLinks";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useSelector } from "react-redux";
import Progress from "./Progress";
import useRightNav from "../layouts/RightSideNav/useRightNav";
import Navigation from "../layouts/RightSideNav/Navigation";
import Overview from "../pages/Dashboard/projects/projectDetail/Overview";

function getMainPath(str) {
  const regex = /^\/([^?\\/]+)/;
  return str.match(regex) ? str.match(regex)[1] : "";
}

const NavBar = (props, ref) => {
  const { className } = props;
  let history = useHistory();
  const { isMakingRequest, project } = useSelector(({ Projects }) => Projects);

  const { open } = useRightNav();

  const getNavTitle = () => {
    let title = "Dashboard";
    switch (getMainPath(history.location.pathname)) {
      case "projects":
        title = isMakingRequest.fetch ? (
          <Progress />
        ) : (
          project?.title || "Projects"
        );
        break;
      case "payments":
        title = "Payments";
        break;
      case "settings":
        title = "Settings";
        break;
      case "tests":
        title = "Tests";
        break;
      case "community":
        title = "Community Guide";
        break;
      default:
        break;
    }
    return title;
  };

  const viewTitle = getNavTitle();

  // TODO: move this to another file
  let navSections = [
    {
      component: <></>,
      title: "Activity",
    },
    {
      component: <Overview project={project} history={history} />,
      title: "Overview",
    },
  ];

  return (
    <Wrapper ref={ref} className={`navbar ${className || ""}`}>
      <div className="title-bar">
        <Link to={`/dashboard`} className="navbar-brand">
          {viewTitle}
        </Link>
        <ul className="navbar-nav ml-auto">
          {viewTitle === "Tests" && (
            <li>
              <StyledButton id="createResult" variant={"primary"}>
                <Icon name="round-add" />
                &nbsp;&nbsp;&nbsp;Add New Result
              </StyledButton>
            </li>
          )}
          {!(project?.title || viewTitle === "Tests") && (
            <li>
              <SearchBox navHieght={ref} variant="search" clear={true} />
            </li>
          )}
          {project?.title && (
            <li>
              <Button
                className="right-nav-button"
                onClick={() => open(<Navigation navSections={navSections} />)}
              >
                <Icon name="dots-horizontal" />
                &nbsp;&nbsp;&nbsp;More
              </Button>
            </li>
          )}
        </ul>
      </div>

      <NavLinks />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 80% / 50%);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1030;
  left: 220px;
  padding: 0 40px;

  .title-bar {
    padding: 16px 0;
    display: flex;
    align-items: center;
    width: 100%;

    .navbar-brand {
      color: #151a30;
      font-weight: bold;
      line-height: 24px;
      padding: 0;

      &.hover {
        color: #000000;
      }
    }
  }

  .right-nav-button {
    color: #8f9bb3;
    background: rgba(143, 155, 179, 0.1);
    border: none;
    border-radius: 6px;
    box-shadow: none;
    line-height: 22px;
    font-size: 14px;
    text-align: right;

    i {
      font-size: 3px;
      vertical-align: middle;
    }

    &:hover,
    &:visited,
    &:link,
    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled):active:focus,
    &:focus {
      outline: 0;
      box-shadow: none;
      border: none;
      border-radius: 6px;
      color: #8f9bb3;
      background: rgba(143, 155, 179, 0.2);
    }
  }

  .navbar-nav {
    margin: 0 0 0 auto;
    > li {
      > a {
        color: #000000;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  box-shadow: none;
`;

NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default forwardRef(NavBar);
