/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import TitleBarSwitch from "./TitleBarSwitch";

/* -------------------- Internel Dependencies (Utilites) -------------------- */
import { isAdmin, isAdminOrPM, isClient, isDev, isPM } from "./utils/auth";
import {
  STATUS_INITIAL,
  STATUS_INTERESTED,
  STATUS_UNINTERESTED,
} from "../actions/utils/api";

/* ------------------------- Component dependencies ------------------------- */
import TitleBarContent from "./TitleBarContent";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  user: PropTypes.object,
  Project: PropTypes.object,
};

const NavLinks = () => {
  let projectsSections = [
      ["/projects/dedicated", "Dedicated Developers"],
      ["/projects/managed", "Managed Projects"],
      ...(isClient() ? [] : [["/projects/opportunity", "Opportunities"]]),
      ["/projects/archived", "Archive"],
      ...(isPM() ? [[null, <TitleBarSwitch key={`title-bar-switch`} />]] : []),
    ],
    paymentSections = [
      ...(isAdminOrPM()
        ? [
            ["/payments/in", "Payments"],
            ["/payments/out", "Payouts"],
          ]
        : []),
    ],
    settingsSections = [
      ...(isDev() || isPM()
        ? [
            ["/settings/profile", "Profile"], // All
            ["/settings/experience", "Experience"],
            ["/settings/payment", "Payment"],
            ["/settings/account", "Account"], // All
            ["/settings/privacy", "Privacy"],
            ...(isPM() ? [["/settings/invite", "Invite Users"]] : []),
          ]
        : [
            ["/settings/profile", "Profile"], // All
            ...(!isAdmin()
              ? [
                  ["/settings/company-profile", "Company Profile"],
                  ["/settings/company-details", "Company Details"],
                ]
              : []),
            ["/settings/account", "Account"], // All
            ["/settings/privacy", "Privacy"], // All
            ...(isAdmin() ? [["/settings/invite", "Invite Users"]] : []),
          ]),
    ];

  return (
    <Wrapper>
      <Switch>
        {[
          ["/projects", projectsSections],
          ["/payments", paymentSections],
          ["/settings", settingsSections],
        ].map((path, i) => {
          return (
            <Route
              key={`title-path--${i}`}
              path={path[0]}
              render={(props) => (
                <TitleBarContent
                  {...props}
                  sectionLinks={path[1]}
                  {...(path[2] || {})}
                />
              )}
            />
          );
        })}
      </Switch>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: fixed;
  z-index: 1031;
  top: 73px;
  left: 220px;
  right: 0; */
  width: 100%;
  background-color: #fff;
  /* padding-left: 40px;
  padding-right: 40px;
  padding-top: 5px; */
  /* box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5); */
`;

const LinkBadge = styled.span`
  background: #da3451;
  border-radius: 50%;
  min-width: 25px;
  min-height: 25px;
  text-align: center;
  margin-left: 8px;
  display: none;
  vertical-align: top;
  color: white;
  font-size: 12px;
  padding-top: 4px;
  font-weight: bold;
`;

NavLinks.propTypes = proptypes;

export default NavLinks;
