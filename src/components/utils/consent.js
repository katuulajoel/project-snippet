/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import moment from "moment";
import * as Cookies from "js-cookie";
import styled from "styled-components";
import PropTypes from "prop-types";

/* -------------------------- Internel Dependencies ------------------------- */
import { openModal } from "./modals";
import CookieSettings from "../CookieSettings";

export const COOKIE_OPTIONS = [
  [
    "essential",
    "Essential Website Cookies",
    "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as logging in, filling forms and setting your privacy settings. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.",
    true,
    true,
    [
      [
        "Tunga",
        "https://tunga.io",
        "These cookies are strictly necessary to provide you with services through Tunga",
        [
          "sessionid",
          "csrftoken",
          "taskEditToken",
          "cookieConsent",
          "cookieConsentClosedAt",
        ],
      ],
      [
        "Google Tag Manager",
        "https://www.google.com/analytics/tag-manager/",
        "This cookie is associated with Google Tag Manager which we use to load scripts into our website pages.",
        ["_dc_gtm_UA-70644715-1"],
      ],
    ],
  ],
  [
    "perf_func",
    "Performance and Functionality Cookies",
    "These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.",
    true,
    false,
    [
      [
        "Tunga",
        "https://tunga.io",
        "These cookies are used to enhance the performance and functionality of our website but are not essential to its use.",
        ["chatAutoOpenAt"],
      ],
    ],
  ],
  [
    "analytics_custom",
    "Analytics and Customization Cookies",
    "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.",
    true,
    false,
    [
      [
        "Google Analytics",
        "https://analytics.google.com/analytics/web/",
        "Google Analytics gathers information allowing us to understand interactions with our websites and ultimately refine that experience to better serve you.",
        ["_gat", "_ga", "_gid"],
      ],
      [
        "Hotjar",
        "https://www.hotjar.com/",
        "Hotjar gathers information allowing us to understand interactions with our websites and ultimately refine that experience to better serve you.",
        ["_hj*"],
      ],
      [
        "Optimizely",
        "https://www.optimizely.com/",
        "Optimizely is a testing and experimentation platform that helps us uncover customer insights and create optimal web experiences.",
        ["optimizelyDomainTestCookie", "optimizelyEndUserId"],
      ],
    ],
  ],
  [
    "target_advert",
    "Targeting and Advertising Cookies",
    "These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.",
    true,
    false,
  ],
];

export function setCookieConsent(consentDetails) {
  Cookies.set(
    "cookieConsent",
    `${moment.utc().format()}|${consentDetails.join("|")}`,
    { expires: 365 }
  );
}

export function getCookieConsent() {
  return Cookies.get("cookieConsent");
}

export function removeCookieConsent() {
  Cookies.remove("cookieConsent");
}

export function setCookieConsentCloseAt() {
  Cookies.set("cookieConsentClosedAt", moment.utc().format(), {
    expires: 365,
  });
}

export function getCookieConsentCloseAt() {
  return Cookies.get("cookieConsentClosedAt");
}

export function parseDefaultConsents() {
  let currentConsents = [],
    currentConsentCookie = getCookieConsent();
  if (currentConsentCookie) {
    currentConsentCookie.split("|").forEach((category, idx) => {
      if (idx !== 0 && !moment.utc(category).isValid()) {
        currentConsents.push(category);
      }
    });
  } else {
    COOKIE_OPTIONS.forEach((category) => {
      if (category[3] && !category[4]) {
        currentConsents.push(category[0]);
      }
    });
  }
  return currentConsents;
}

export function openCookieConsentPopUp() {
  openModal(
    <CookieSettings />,
    null,
    true,
    {
      className: "consent",
    },
    <ModalHeader />
  );
}

const ModalHeader = ({ dismiss }) => {
  return (
    <StyledHeader>
      <h3>Cookie Settings</h3>
      <span onClick={dismiss}>Done</span>
    </StyledHeader>
  );
};

ModalHeader.propTypes = {
  dismiss: PropTypes.func,
};

const StyledHeader = styled.div`
  h3 {
    font-weight: 700;
    font-size: 14px;
  }

  span {
    position: absolute;
    line-height: 1.5;
    height: auto;
    padding: 0;
    margin: 0;

    top: 15px;
    right: 15px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #8f9bb3;

    &:hover {
      cursor: pointer;
    }
  }
`;
