/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import moment from "moment";
import Cookies from "js-cookie";

export const COOKIE_OPTIONS = [
  {
    id: "essential",
    name: "essential_cookies",
    title: "Essential Website Cookies",
    content:
      "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as logging in, filling forms and setting your privacy settings. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.",
    defaultChecked: true,
    disabled: true,
    list: [
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
  },
  {
    id: "perf_func",
    name: "cookie_performance_functionality",
    title: "Performance and Functionality Cookies",
    content:
      "These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.",
    defaultChecked: true,
    disabled: false,
    list: [
      [
        "Tunga",
        "https://tunga.io",
        "These cookies are used to enhance the performance and functionality of our website but are not essential to its use.",
        ["chatAutoOpenAt"],
      ],
    ],
  },
  {
    id: "analytics_custom",
    name: "cookie_analytics_customization",
    title: "Analytics and Customization Cookies",
    content:
      "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you in order to enhance your experience.",
    defaultChecked: true,
    disabled: false,
    list: [
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
  },
  {
    id: "target_advert",
    name: "cookie_targeting_advertising",
    title: "Targeting and Advertising Cookies",
    content:
      "These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.",
    defaultChecked: true,
    disabled: false,
  },
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

// TODO: Checkout to see if its still needs to be used
// export function removeCookieConsent() {
//   Cookies.remove("cookieConsent");
// }

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
