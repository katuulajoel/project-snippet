/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { FormGroup, Row, Col } from "reactstrap";
import moment from "moment";
import _ from "lodash";

/* -------------------------- Internel Dependencies ------------------------- */
import Input from "../../../components/Input";
import UserSelector from "../../../../core/UserSelector";
import MilestoneSelector from "../../../../core/MilestoneSelector";
import {
  INVOICE_TYPE_CREDIT_NOTE,
  INVOICE_TYPE_PURCHASE,
  INVOICE_TYPE_SALE,
  INVOICE_TYPES,
} from "../../../../../actions/utils/api";
import { StyledDateTimePicker } from "../../../styles";
import Icon from "../../../components/Icon";

/* --------------------------- Style dependencies --------------------------- */
import { StyledForm } from "../../../styles";
import FieldError from "components/core/FieldError";
import styled from "styled-components";
/* export default class InvoiceForm extends React.Component {
  static propTypes = {
    invoice: PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      title: PropTypes.string,
      issued_at: PropTypes.string,
      milestone: PropTypes.object,
      amount: PropTypes.string,
    }),
    project: PropTypes.object,
    proceed: PropTypes.func,
    cancel: PropTypes.func,
    dismiss: PropTypes.func,
    payouts: PropTypes.object,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      invoice: props.invoice || {},
      payouts: props.payouts || { 0: {} },
      error: null,
      addTeamMember: false,
    };
  }

  componentDidUpdate(__, prevState) {
    const { payouts } = this.state;
    if (!_.isEqual(payouts, prevState.payouts)) {
      this.checkDisplayAddTeamButton(payouts);
    }
  }

  checkDisplayAddTeamButton(payouts) {
    let teamAddition = true;
    Object.entries(payouts).forEach(([, value]) => {
      if (
        !(
          value.hasOwnProperty("user") &&
          value.hasOwnProperty("amount") &&
          value.amount
        )
      ) {
        teamAddition = false;
      }
    });
    if (teamAddition) {
      this.setState({ addTeamMember: true });
    } else {
      this.setState({ addTeamMember: false });
    }
  }

  onChangeValue(key, value) {
    let newState = {};
    newState[key] = value;
    this.setState({ invoice: { ...this.state.invoice, ...newState } });
  }

  onChangeField(key, e) {
    this.onChangeValue(key, e.target.value);
  }

  onSave = (e) => {
    e.preventDefault();

    let payouts = this.state.payouts;
    let errorRequiredFields = false;
    let message = null;
    Object.entries(payouts).forEach(([key, value]) => {
      if (!value.user && value.amount) {
        errorRequiredFields = true;
        message = "Select team member";
      }
    });

    if (errorRequiredFields) {
      this.setState({
        ...this.state,
        error: { message: message, section: "team" },
      });
    } else if (this.props.proceed) {
      if (this.props.invoice.type === INVOICE_TYPE_PURCHASE) {
        this.props.proceed({
          invoice: this.state.invoice,
          payouts: this.state.payouts,
        });
      } else {
        this.props.proceed(this.state.invoice);
      }
    }
  };

  onCancel = (e) => {
    e.preventDefault();

    if (this.props.cancel) {
      this.props.cancel(this.state.plan);
    }
  };

  onAddPayout = () => {
    const { payouts } = this.state;
    let idx = null,
      newState = {};
    if (Object.keys(payouts).length > 0) {
      idx =
        parseInt(Object.keys(payouts)[Object.keys(payouts).length - 1], 10) + 1;
    } else {
      idx = Object.keys(payouts).length;
    }
    newState[idx] = {};

    let allowPayoutCreation = true;
    if (idx === 1) {
      let firstPayout = payouts[Object.keys(payouts)[0]];
      if (
        !(
          firstPayout.hasOwnProperty("user") &&
          firstPayout.hasOwnProperty("amount")
        )
      ) {
        allowPayoutCreation = false;
      }
    }
    if (allowPayoutCreation) {
      this.setState({ payouts: { ...payouts, ...newState } });
    }
  };

  onPayoutUpdate(idx, key, value) {
    let newPayout = {},
      newState = {};
    if (!value && key === "user") {
      return;
    }

    newPayout[key] = value;
    newState[idx] = {
      ...(this.state.payouts[idx] || {}),
      ...newPayout,
    };
    this.setState({ payouts: { ...this.state.payouts, ...newState } });
  }

  userRemoved(user) {
    let deleteKey = null;

    let payouts = this.state.payouts;
    Object.entries(payouts).forEach(([key, value]) => {
      if (value.user && value.user.id === user) {
        deleteKey = key;
      }
    });

    if (deleteKey && Object.keys(payouts).length > 1) {
      delete payouts[deleteKey];
    } else {
      payouts[0] = {};
    }

    this.checkDisplayAddTeamButton(payouts);

    this.setState({ payouts: { ...payouts } });
  }

  checkRequired(payout) {
    let payouts = this.state.payouts;

    if (Object.keys(payouts).length === 1) {
      return true;
    }

    if (Object.keys(payout).length > 0 && payout.user) {
      return true;
    } else {
      return false;
    }
  }

  renderPayOut(idx) {
    let payout = this.state.payouts[idx] || {};
    return (
      <Row key={idx}>
        <Col sm="7">
          {idx == 0 ? (
            <label>
              Team Member
              <span style={{ color: "#da3451", paddingLeft: "2px" }}>*</span>
            </label>
          ) : null}
          <UserSelector
            users={this.props.project.participants}
            filter={true}
            label={false}
            type="singular"
            max={1}
            variant="bottom"
            placeholder="Select from project"
            selected={payout.user ? [payout.user] : []}
            onChange={(users) => this.onPayoutUpdate(idx, "user", users[0])}
            userRemoved={(user) => this.userRemoved(user)}
          />
        </Col>
        <Col sm="5">
          <FormGroup>
            {idx == 0 ? (
              <label>
                Amount (in EUR)
                <span
                  style={{
                    color: "#da3451",
                    paddingLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
            ) : null}
            <Input
              type="number"
              value={payout.amount || ""}
              onChange={(e) =>
                this.onPayoutUpdate(idx, "amount", e.target.value)
              }
              placeholder="Enter amount"
              required={this.checkRequired(payout)}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <StyledForm id={this.props.id} onSubmit={this.onSave.bind(this)}>
        <FormGroup>
          <label>
            {INVOICE_TYPES[this.props.invoice.type]} Title
            <LabelStyle>
              <span className="label-style">*</span>
            </LabelStyle>
          </label>
          <Input
            value={this.state.invoice.title}
            onChange={this.onChangeField.bind(this, "title")}
            placeholder="Enter a title for this payment"
            required
          />
          <div className="text text-sm">Don't include project title here</div>
        </FormGroup>
        <FormGroup>
          <label>Invoice Date</label>
          <StyledDateTimePicker
            className="tg-date-field"
            placeholder="Enter invoice date"
            format={"DD MMM YYYY"}
            calendar={true}
            time={false}
            value={
              this.state.invoice.issued_at
                ? new Date(this.state.invoice.issued_at)
                : null
            }
            onChange={(issued_at) => {
              this.onChangeValue("issued_at", moment.utc(issued_at).format());
            }}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Milestone</label>
          <MilestoneSelector
            variant="bottom"
            placeholder="Select"
            max={1}
            filters={{
              project: this.props.project ? this.props.project.id : null,
            }}
            selected={
              this.state.invoice.milestone ? [this.state.invoice.milestone] : []
            }
            onChange={(milestones) =>
              this.onChangeValue("milestone", milestones[0] || null)
            }
          />
        </FormGroup>
        {this.state.invoice.type === INVOICE_TYPE_SALE ||
        this.state.invoice.type === INVOICE_TYPE_CREDIT_NOTE ? (
          <>
            <FormGroup>
              <label>
                Amount (in EUR)
                <LabelStyle>
                  <span className="label-style">*</span>
                </LabelStyle>
              </label>
              <Input
                type="number"
                value={this.state.invoice.amount}
                onChange={this.onChangeField.bind(this, "amount")}
                step="0.01"
                placeholder="Enter amount"
                required
              />
            </FormGroup>
            {this.state.invoice.type !== INVOICE_TYPE_CREDIT_NOTE && (
              <FormGroup>
                <label className="control-label">
                  Payment Period (in days)
                  <LabelStyle>
                    <span className="label-style">*</span>
                  </LabelStyle>
                </label>
                <select
                  className="form-control"
                  onChange={this.onChangeField.bind(this, "payment_period")}
                  value={
                    this.state.invoice.payment_period
                      ? this.state.invoice.payment_period
                      : "14"
                  }
                  required
                >
                  <option value="7">7</option>
                  <option value="14">14</option>
                  <option value="21">21</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </FormGroup>
            )}
          </>
        ) : (
          <div>
            {this.state.error && this.state.error.section === "team" && (
              <FieldError message={this.state.error.message} />
            )}
            {Object.keys(this.state.payouts).map((idx) => {
              return this.renderPayOut(idx);
            })}
            {this.state.addTeamMember && (
              <div className="add-more">
                <button type="button" onClick={this.onAddPayout}>
                  <Icon name="round-add" size="main" /> Add Another Team Member
                </button>
              </div>
            )}
          </div>
        )}
      </StyledForm>
    );
  }
}

const LabelStyle = styled.span`
  .label-style {
    color: #da3451;
    padding-left: 2px;
  }
`;
 */
