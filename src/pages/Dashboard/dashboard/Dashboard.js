import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import css from "./Dashboard.module.scss";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { getNotifications } from "../../../actions/DashboardActions";
import LatestReports from "./LatestReports";
import UpcomingPayments from "./UpcomingPayments";
import ActiveProjects from "./ActiveProjects";

export default function Dashboard() {
  const user = {
    display_name: "Katuula Joel",
    avatar_url: "",
    welcomeMessage: "Welcome Back.",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getNotifications()(dispatch);
  }, []);

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

          <ActiveProjects />
        </Col>
        <Col sm={4}>
          <LatestReports />

          <UpcomingPayments />
        </Col>
      </Row>
    </DashboardLayout>
  );
}
