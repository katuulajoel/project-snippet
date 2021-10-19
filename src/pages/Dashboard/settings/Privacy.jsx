import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import Button from "../../../components/Button";
import CookieSettingForm from "./modals/CookieSettingForm";
import { createModal } from "../../../utils/modals";
import * as actions from "../../../redux/actions/ProfileActions";

export default function Privacy() {
  const dispatch = useDispatch();
  const { settings } = useSelector(({ profile }) => profile);
  const { user } = useSelector(({ Auth }) => Auth);
  // const { settings } = user;

  useEffect(() => {
    actions.getSettings()(dispatch);
  }, []);

  const onCookieSettings = async () => {
    await createModal("Cookie Settings", <CookieSettingForm />);
  };

  const onChange = (name, value) => {
    let setting = {};
    setting[name] = value;

    if (settings && settings.switches[name] !== value) {
      actions.updateSettings({ switches: setting });
    }
  };

  const getTrans = (user) => {
    if (user.is_developer || user.is_project_manager) {
      return [
        {
          name: "TASK_PROGRESS_REPORT_REMINDER_EMAIL",
          label: "Email reminders about project progress updates.",
        },
        {
          name: "TASK_INVITATION_RESPONSE_EMAIL",
          label:
            "Email notifications about task invitation responses from developers.",
        },
      ];
    } else {
      return [
        {
          name: "TASK_SURVEY_REMINDER_EMAIL",
          label: "Email reminders about client progress surveys.",
        },
        {
          name: "NEW_TASK_PROGRESS_REPORT_EMAIL",
          label: "Email notifications about new developer progress reports.",
        },
      ];
    }
  };

  const labels = {
    promo: [
      {
        name: "NEWSLETTER_EMAIL",
        label: "Email newsletters from Tunga",
      },
      {
        name: "EVENT_EMAIL",
        label: "Emails about interesting events from Tunga",
      },
    ],
    trans: [...getTrans(user)],
    agreement: [
      ["/privacy", "Privacy Policy"],
      ["/agreement", "User Agreement"],
      ["/code-of-conduct", "Code of Conduct"],
    ],
  };

  return (
    <ContentSection className="privacy-settings">
      <div>
        <div className="section">
          <div className="section-title" aria-label="cookie-model">
            Cookie Settings
          </div>

          <div className="row">
            <div className="col-md-12">
              <p>
                Learn more about how we use cookies from the &quot;Cookies&quot;
                section of our{" "}
                <a href="https://tunga.io/privacy/#cookies">Privacy Policy.</a>
              </p>
            </div>
            <div className="col-md-12">
              <p>
                You can opt-out of specific cookie categories (except essential
                website cookies) by clicking on the button below.
              </p>
            </div>
            <div className="col">
              <button
                className="save"
                aria-label="submit"
                onClick={onCookieSettings}
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Promotional Email Settings</div>
          {labels.promo.map((label) => {
            return (
              <div className="form-check" key={`day-${label.name}`}>
                <label
                  className="form-check-label"
                  htmlFor={`check-${label.name}`}
                >
                  {label.label}
                </label>

                <input
                  className="switch form-check-input"
                  id={`check-${label.name}`}
                  value={
                    settings && settings.switches[label.name] ? "off" : "on"
                  }
                  type="checkbox"
                  aria-label={`check-${label.name}`}
                  defaultChecked={settings && settings.switches[label.name]}
                  onChange={(e) => onChange(label.name, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <div className="section">
          <div className="section-title">Transactional Email Settings</div>
          {labels.trans.map((label) => {
            return (
              <div className="form-check" key={`day-${label.name}`}>
                <label
                  className="form-check-label"
                  htmlFor={`check-${label.name}`}
                >
                  {label.label}
                </label>

                <input
                  className="switch form-check-input"
                  id={`check-${label.name}`}
                  value={
                    settings && settings.switches[label.name] ? "off" : "on"
                  }
                  type="checkbox"
                  aria-label={`check-${label.name}`}
                  checked={settings && settings.switches[label.name]}
                  onChange={(e) => onChange(label.name, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <div className="section agreements">
          <div className="section-title">Agreements and Policies</div>
          <ul>
            {labels.agreement.map((link, key) => {
              return (
                <li key={key} style={{ marginBottom: "8px" }}>
                  <a href={link[0]}>{link[1]}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ContentSection>
  );
}

const ContentSection = styled.div`
  .section {
    border-bottom: 1px solid #edf1f7;
    padding-bottom: 24px;

    &:last-of-type {
      border-bottom: none;
      padding-bottom: 0px;
    }

    .section-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #151a30;
      margin-bottom: 24px;
    }

    a {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #3e4857;
    }

    .save {
      box-shadow: none;
      border: none;
      background: rgba(6, 46, 100, 0.05);
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #062e64;

      &:disabled {
        color: rgba(6, 46, 100, 0.25);
      }
    }
  }

  .form-check {
    margin-bottom: 18px;
    padding: 0;

    .form-check-input {
      position: initial;
      margin-top: 0;
      margin-left: 0;
      float: right;
    }

    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      input[type="checkbox"],
      input[type="radio"] {
        --active: #219653;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, 0.3);
        --border: #bbc1e1;
        --border-hover: #219653;
        --background: var(--ab, var(--border));
        --disabled: #f6f8ff;
        --disabled-inner: rgba(33, 150, 83, 0.5);
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 15px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
        &:after {
          content: "";
          display: block;
          left: 0;
          top: 0;
          position: absolute;
          transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
            opacity var(--d-o, 0.2s);
        }
        &:checked {
          --b: var(--active);
          --bc: var(--active);
          --d-o: 0.3s;
          --d-t: 0.6s;
          --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
        }
        &:disabled {
          --b: var(--disabled);
          cursor: not-allowed;
          opacity: 0.9;
          &:checked {
            --b: var(--disabled-inner);
            --bc: var(--border);
          }
          & + label {
            cursor: not-allowed;
          }
        }
        &:hover {
          &:not(:checked) {
            &:not(:disabled) {
              --bc: var(--border-hover);
            }
          }
        }
        &:focus {
          box-shadow: 0 0 0 var(--focus);
        }
      }
      input[type="checkbox"] {
        &.switch {
          width: 30px;
          border-radius: 11px;
          &:after {
            left: 1px;
            top: 1px;
            border-radius: 50%;
            width: 11px;
            height: 11px;
            background: #fff;
            transform: translateX(var(--x, 0));
          }
          &:checked {
            --ab: var(--active-inner);
            --x: 15px;
          }
          &:disabled {
            &:not(:checked) {
              &:after {
                opacity: 0.6;
              }
            }
          }
        }
      }
      input[type="radio"] {
        border-radius: 50%;
        &:after {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: var(--active-inner);
          opacity: 0;
          transform: scale(var(--s, 0.7));
        }
        &:checked {
          --s: 0.5;
        }
      }
    }
  }
`;
