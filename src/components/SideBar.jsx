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

const SideBar = () => {
  const dispatch = useDispatch();

  const onSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Wrapper id="sidebar" className="sidebar">
      <img
        alt="company-logo"
        src={require("../assets/images/logo_round.png")}
      />
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
          <NavLink to="logout" onClick={(e) => onSignOut(e)}>
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
    width: "75px";
    margin: "2rem auto";
    display: "block";
  }
`;

export default SideBar;
