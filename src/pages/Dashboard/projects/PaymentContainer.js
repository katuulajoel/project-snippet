/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Icon from "../../../components/Icon";
import SectionNav from "../../../components/SectionNav";
import { isAdminOrPM, isDev } from "../../../components/utils/auth";
import PaymentTotals from "../payments/components/PaymentTotals";
import InvoiceListContainer from "../payments/InvoiceListContainer";
import Payments from "../payments/Payments";
import Payouts from "../payments/Payouts";
import { NavActions } from "../payments/styles";
import { downloadCsv } from "../payments/utils/paymentActions";

const PaymentContainer = ({ project }) => {
  let { pathname } = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [createAction, setcreateAction] = useState(null);
  let filter = pathname.split("/")[5];
  let type = pathname.split("/")[4];

  return (
    <>
      {isAdminOrPM() && (
        <SectionNav
          urlExact={false}
          links={[
            {
              route: `projects/${project.id}/pay/payments`,
              name: "Payments",
            },
            {
              route: `projects/${project.id}/pay/payouts`,
              name: "Payouts",
            },
          ]}
          rightActions={
            createAction &&
            createAction.visibility && (
              <NavActions>
                {(createAction.add && Array.isArray(createAction.add)
                  ? createAction.add
                  : []
                ).map((item, idx) => {
                  return (
                    <>
                      {idx > 0 ? <span className="divider">/</span> : null}
                      <a
                        key={idx}
                        href="#"
                        className="add-btn"
                        onClick={item.action}
                      >
                        {idx === 0 ? <Icon name="round-add" size="sm" /> : null}{" "}
                        {item.title}
                      </a>
                    </>
                  );
                })}
              </NavActions>
            )
          }
        />
      )}

      <PaymentTotals project={project.id} />

      <SectionNav
        links={[
          ...(isDev()
            ? [
                {
                  route: `projects/${project.id}/pay/${type}/all`,
                  name: "All",
                },
                {
                  route: `projects/${project.id}/pay/${type}/pending`,
                  name: "Pending",
                },
                {
                  route: `projects/${project.id}/pay/${type}/paid`,
                  name: "Paid",
                },
              ]
            : [
                {
                  route: `projects/${project.id}/pay/${type}/all`,
                  name: "All",
                },
                {
                  route: `projects/${project.id}/pay/${type}/overdue`,
                  name: "Overdue",
                },
                {
                  route: `projects/${project.id}/pay/${type}/pending`,
                  name: "Pending",
                },
                {
                  route: `projects/${project.id}/pay/${type}/paid`,
                  name: "Paid",
                },
                {
                  route: `projects/${project.id}/pay/${type}/archived`,
                  name: "Archived",
                },
              ]),
        ]}
        style={{ marginTop: "40px" }}
        rightActions={
          !isDev() && (
            <NavActions>
              <a
                href="#"
                className="add-btn"
                onClick={() =>
                  downloadCsv(filter, type === "in" ? "Payments" : "Payouts")
                }
              >
                <Icon name="file-upload-outline" size="sm" /> Export
              </a>
            </NavActions>
          )
        }
      />

      <Switch>
        <Route
          path={`/projects/${project.id}/pay/${type}/:filter`}
          render={(props) => {
            return (
              <InvoiceListContainer
                {...props}
                type={type === "payments" ? "in" : "out"}
                project={project.id}
              >
                {type === "payments" ? (
                  <Payments {...props} />
                ) : (
                  <Payouts {...props} />
                )}
              </InvoiceListContainer>
            );
          }}
        />
        <Redirect
          exact
          from={`projects/${project.id}/pay/`}
          to={`projects/${project.id}/pay/${
            isDev() ? "payouts" : "payments"
          }/all`}
        />
        <Redirect
          exact
          from={`projects/${project.id}/pay/payments`}
          to={`projects/${project.id}/pay/payments/all`}
        />
        <Redirect
          exact
          from={`projects/${project.id}/pay/payouts`}
          to={`projects/${project.id}/pay/payouts/all`}
        />
      </Switch>
    </>
  );
};

PaymentContainer.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default PaymentContainer;
