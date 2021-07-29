/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

/* -------------------------- Internal Dependencies ------------------------- */
import Icon from "./Icon";
import { logout } from "../actions/AuthActions";
import logo from "../assets/images/logo_round.png";

const SideBar = () => {
  const dispatch = useDispatch();

  const onSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Wrapper id="sidebar" className="sidebar">
      <img alt="company-logo" src={logo} />
      <ul className="nav">
        {[
          ["dashboard", "Dashboard", "outline-dashboard"],
          ["projects", "Projects", "baseline-folder-open"],
          ["payments", "Payments", "round-payment"],
          ["settings", "Settings", "outline-settings"],
        ].map((item, idx) => {
          return (
            <li key={`dashboard-${idx}`}>
              <NavLink to={`/${item[0]}`} activeClassName="active">
                <span className="menu-icon">
                  <Icon name={item[2]} size="sidebar" />
                </span>
                <span>{item[1]}</span>
              </NavLink>
            </li>
          );
        })}
        <li>
          <NavLink
            data-testid="signout"
            to="logout"
            onClick={(e) => onSignOut(e)}
          >
            <span className="menu-icon">
              <Icon name="log-out" size="sidebar" />
            </span>
            <span>Log Out</span>
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 75px;
    margin: 2rem auto;
    display: block;
  }

  position: fixed;
  width: 220px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: 20px 30px;
  overflow-x: hidden;
  overflow-y: auto;
  /* Scrollable contents if viewport is shorter than content. */
  background-color: #062e64;
  box-shadow: inset 0 -3px 3px 0 rgba(0, 0, 0, 0.5);

  padding-top: 0px;

  h2 {
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    margin: 24px 18px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    li {
      display: block;
      margin: 0 auto 22px;
      width: 100%;

      a {
        display: block;
        color: #8f9bb3;
        padding: 12px 18px;

        &:hover,
        &:focus {
          text-decoration: none;
        }

        &.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        span {
          display: inline-block;
          font-size: 16px;
        }

        .menu-icon {
          margin-right: 12px;
          vertical-align: baseline;
          width: 20px;
          text-align: right;
        }
      }
    }
  }
`;

export default SideBar;
