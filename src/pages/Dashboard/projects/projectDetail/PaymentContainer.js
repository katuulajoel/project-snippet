import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../../../components/Icon";
import SectionNav from "../../../../components/SectionNav";
import { isAdminOrPM, isDev } from "../../../../utils/auth";
import PaymentTotals from "../../payments/components/PaymentTotals";
import InvoiceListContainer from "../../payments/InvoiceListContainer";
import Payments from "../../payments/Payments";
import Payouts from "../../payments/Payouts";
import { NavActions } from "../../payments/styles";
import { downloadCsv } from "../../../../utils/invoiceUtils";
import Timesheets from "../../payments/Timesheets";

const PaymentContainer = ({ project }) => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [createAction, setcreateAction] = useState(null);
  let filter = pathname.split("/")[5];
  let type = pathname.split("/")[4];

  const { csv } = useSelector(({ Invoice }) => Invoice);

  const startingMonth = 2020;
  const diff = parseInt(new Date().getFullYear()) - startingMonth;
  const mapMonth = Array.from({ length: diff }).map(
    (_, i) => startingMonth + i + 1
  );

  useEffect(() => {
    if (csv) {
      var fileDownload = require("js-file-download");
      fileDownload(
        csv,
        `${filter?.toUpperCase()} ${
          type === "payments" ? "Payments" : "Payouts"
        }.csv`
      );
      dispatch({ type: "CLEAR_CSV" });
    }
  }, [csv]);

  return (
    <>
      {isAdminOrPM() && (
        <SectionNav
          urlExact={false}
          links={[
            {
              route: `projects/${project.id}/pay/timesheets`,
              name: "Timesheets",
            },
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
            createAction && createAction.visibility && type !== "timesheets" ? (
              <NavActions>
                {(createAction.add ? createAction.add : []).map((item, idx) => {
                  return (
                    <span key={idx}>
                      {idx > 0 ? <span className="divider"> /</span> : null}
                      <a
                        key={idx}
                        href="#"
                        className="add-btn"
                        onClick={item.action}
                      >
                        {idx === 0 ? <Icon name="round-add" size="sm" /> : null}{" "}
                        {item.title}
                      </a>
                    </span>
                  );
                })}
              </NavActions>
            ) : (
              <NavActions>
                <select onChange={(e) => setCurrentYear(e.target.value)}>
                  {mapMonth.reverse().map((year) => {
                    return (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </NavActions>
            )
          }
        />
      )}

      {type !== "timesheets" && (
        <>
          <PaymentTotals
            type={type === "payments" ? "in" : "out"}
            project={project.id}
          />

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
                      downloadCsv(
                        filter,
                        type === "payments" ? "Payments" : "Payouts",
                        project.id
                      )
                    }
                  >
                    <Icon name="file-upload-outline" size="sm" /> Export
                  </a>
                </NavActions>
              )
            }
          />
        </>
      )}
      <Switch>
        <Route
          path={`/projects/${project.id}/pay/timesheets`}
          exact
          render={() => {
            return <Timesheets currentYear={currentYear} />;
          }}
        />
        <Route
          path={`/projects/${project.id}/pay/${type}/:filter`}
          render={(props) => {
            return (
              <InvoiceListContainer
                {...props}
                type={type === "payments" ? "in" : "out"}
                project={project}
              >
                {type === "payments" ? (
                  <Payments {...props} setcreateAction={setcreateAction} />
                ) : (
                  <Payouts {...props} setcreateAction={setcreateAction} />
                )}
              </InvoiceListContainer>
            );
          }}
        />
        <Redirect
          exact
          from={`/projects/${project.id}/pay/`}
          to={`/projects/${project.id}/pay/${
            isDev()
              ? "payouts/all"
              : isAdminOrPM()
              ? "timesheets"
              : "payments/all"
          }`}
        />
        <Redirect
          exact
          from={`/projects/${project.id}/pay/payments`}
          to={`/projects/${project.id}/pay/payments/all`}
        />
        <Redirect
          exact
          from={`/projects/${project.id}/pay/payouts`}
          to={`/projects/${project.id}/pay/payouts/all`}
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
