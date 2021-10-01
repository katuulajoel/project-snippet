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

/* ------------------------- Component dependencies ------------------------- */
import TitleBarContent from "./TitleBarContent";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  user: PropTypes.object,
  Project: PropTypes.object,
};

const NavLinks = () => {
  let getUrl = (section) => {
    return (match) => {
      return `/projects/${match.params.projectId}/${section}`;
    };
  };

  let projectsSections = [
      ["/projects/dedicated", "Dedicated Developers"],
      ["/projects/managed", "Managed Projects"],
      ...(isClient() ? [] : [["/projects/opportunity", "Opportunities"]]),
      ["/projects/archived", "Archive"],
      ...(isPM() ? [[null, <TitleBarSwitch key={`title-bar-switch`} />]] : []),
    ],
    projectDetailSections = [
      [getUrl("plan"), "Planning"],
      [getUrl("reports"), "Reports"],
      [getUrl("docs"), "Documents"],
      [getUrl("pay"), "Payments"],
      [getUrl("settings"), "Settings"],
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
          ["/projects/:projectId/:section", [...projectDetailSections]],
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
  width: 100%;
  background-color: #fff;
`;

NavLinks.propTypes = proptypes;

export default NavLinks;
