import React from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import Avatar from "../../../components/Avatar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import css from "./Dashboard.module.scss";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { isAdminOrPM, isDev, isPM } from "../../../components/utils/auth";

export default function Dashboard() {
  const user = {
    display_name: "Katuula Joel",
    avatar_url: "",
    welcomeMessage: "Welcome Back.",
  };
  return (
    <DashboardLayout>
      <Row>
        <Col sm={8}>
          <div className={`${css.card} ${css.header}`}>
            <Avatar image={user.avatar_url} size="dash" />
            <div className={css.profile}>
              <h3>Hi {user.display_name} 👋🏻</h3>

              <span className={css.subText}>{user.welcomeMessage}</span>
            </div>
            <div className={css.date}>
              <span className={css.subText}>
                {moment().format("ddd, Do MMM YYYY")}
              </span>
            </div>
          </div>
          <div className={css.card}>
            <h3 className={css.title}>
              Recent Notifications
              <small
                onClick={() => {}}
                style={{
                  float: "right",
                  cursor: "pointer",
                }}
              >
                Clear all
              </small>
            </h3>

            <SummaryPlaceholder description="No recent notifications" />
          </div>

          <div className={css.card}>
            <h3 className={css.title}>
              {`${isAdminOrPM() ? "" : "Your "}`}
              Active Projects
            </h3>

            <SummaryPlaceholder description="No active projects" />
          </div>
        </Col>
        <Col sm={4}>
          <div className={css.card}>
            {isDev() || isPM() ? (
              <>
                <h3 className={css.title}>Latest Reports</h3>

                <SummaryPlaceholder description="No upcoming updates" />
              </>
            ) : (
              <>
                <h3 className={css.title}>Latest reports</h3>

                <SummaryPlaceholder description="No upcoming updates" />
              </>
            )}
          </div>

          <div className={css.card}>
            <h3 className={css.title}>Upcoming Payments</h3>
            <SummaryPlaceholder description="No upcoming payments" />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
