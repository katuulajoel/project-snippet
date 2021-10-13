import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { Link } from "react-router-dom";
import { getdateFormated, getDays } from "../../../utils/dateUtil";
import Icon from "../../../components/Icon";
import { isDev } from "../../../utils/auth";
import styled from "styled-components";

const UpcomingPayments = () => {
  const {
    notifications: { invoices },
  } = useSelector(({ Dashboard }) => Dashboard);
  return (
    <div className="dashboard-card">
      <h3 className="title">Latest reports</h3>
      {invoices?.length == 0 ? (
        <SummaryPlaceholder description="No upcoming payments" />
      ) : (
        <div className="content">
          {invoices?.map((invoice) => {
            return (
              <div key={invoice.id} className="list-layout clearfix">
                <div className="icon-avatar">
                  <span>
                    <Icon name="round-payment" size="sm" />
                  </span>
                </div>
                <div className="detail">
                  <p>
                    Payment for{" "}
                    <Link
                      to={`/projects/${invoice.project.id}/pay/${
                        isDev() ? "payouts" : "payments"
                      }`}
                    >
                      {invoice.full_title}
                    </Link>
                    .
                  </p>
                  <span className="sub-text">
                    <Icon name="clock-outline" size="sm" />{" "}
                    {getdateFormated(moment(invoice.due_at))}
                    {invoice.is_overdue ? (
                      <Icon
                        name="exclamation-triangle"
                        size="sm"
                        className="text-danger"
                      />
                    ) : null}
                  </span>
                  {invoice.is_overdue && getDays(invoice.due_at).number > 0 && (
                    <Overdue>
                      Overdue by {getDays(invoice.due_at).number}{" "}
                      {getDays(invoice.due_at).name}
                    </Overdue>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Overdue = styled.span`
  text-align: center;
  font-weight: 600;
  color: #eb5757;
  font-size: 14px;
  line-height: 22px;
  background: rgba(235, 87, 87, 0.1);
  border-radius: 50px;
  padding: 2px 12px;
  margin-top: 10px !important;
  width: fit-content;
`;

export default UpcomingPayments;
