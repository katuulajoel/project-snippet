import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Icon from "../../../components/Icon";
import SectionNav from "../../../components/SectionNav";
import { isDev } from "../../../components/utils/auth";
import DashboardLayout from "../../../layouts/DashboardLayout";
import InvoiceListContainer from "./InvoiceListContainer";
import Payments from "./Payments";

import Payouts from "./Payouts";
import { downloadCsv } from "./utils/paymentActions";
import PaymentTotals from "./components/PaymentTotals";
import { NavActions } from "./styles";

export default function PaymentsPage() {
  let { type } = useParams();
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const { csv } = useSelector(({ Invoice }) => Invoice);
  let filter = pathname.split("/")[3];

  useEffect(() => {
    if (csv) {
      var fileDownload = require("js-file-download");
      fileDownload(
        csv,
        `${filter?.toUpperCase()} ${type === "in" ? "Payments" : "Payouts"}.csv`
      );
      dispatch({ type: "CLEAR_CSV" });
    }
  }, [csv]);

  return (
    <DashboardLayout>
      <Wrapper>
        <PaymentTotals type={type} />
        <SectionNav
          links={[
            ...(isDev()
              ? [
                  { route: `payments/${type}/all`, name: "All" },
                  {
                    route: `payments/${type}/pending`,
                    name: "Pending",
                  },
                  { route: `payments/${type}/paid`, name: "Paid" },
                ]
              : [
                  { route: `payments/${type}/all`, name: "All" },
                  {
                    route: `payments/${type}/overdue`,
                    name: "Overdue",
                  },
                  {
                    route: `payments/${type}/pending`,
                    name: "Pending",
                  },
                  { route: `payments/${type}/paid`, name: "Paid" },
                  {
                    route: `payments/${type}/archived`,
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
            path={`/payments/${type}/:filter`}
            render={(props) => {
              return (
                <InvoiceListContainer {...props} type={type}>
                  {type === "in" ? (
                    <Payments {...props} />
                  ) : (
                    <Payouts {...props} />
                  )}
                </InvoiceListContainer>
              );
            }}
          />
          <Redirect from="*" to={`/payments/${type}/all`} />
        </Switch>
      </Wrapper>
    </DashboardLayout>
  );
}

const Wrapper = styled.div`
  padding-top: 30px; /* TODO: moving this couldnt work cause navbar doesnt record right hieght on page reload */
`;
