/* eslint-disable react/prop-types */
import { isAdminOrPM } from "../components/utils/auth";
import React from "react";
import { NavLink } from "react-router-dom";

import Icon from "../components/core/Icon";

const SideBar = (props) => {
  const onSignOut = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (props.onSignOut) {
      props.onSignOut();
    }
  };

  return (
    <div id="sidebar" className="sidebar">
      <img
        alt="company-logo"
        src={require("../assets/images/icons/tunga_logo_round.png")}
        style={{ width: "75px", margin: "2rem auto", display: "block" }}
      />
      <ul className="nav">
        {[
          ["dashboard", "Dashboard", "outline-dashboard"],
          ["projects", "Projects", "baseline-folder-open"],
          ...(isAdminOrPM() ? [["tests", "Tests", "award"]] : []),
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
          <NavLink to="logout" onClick={onSignOut.bind(this)}>
            <span className="menu-icon">
              <Icon name="log-out" size="sidebar" />
            </span>
            <span>Log Out</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
