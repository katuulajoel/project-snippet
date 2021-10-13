import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import Avatar from "../../../components/Avatar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getNotifications } from "../../../redux/actions/DashboardActions";
import LatestReports from "./LatestReports";
import UpcomingPayments from "./UpcomingPayments";
import ActiveProjects from "./ActiveProjects";
import RecentNotifications from "./RecentNotifications";
import { generateUserIntials } from "../../../utils/stringUtils";
import styled from "styled-components";

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
          <ProfileCard className="dashboard-card">
            <Avatar
              image={user.avatar_url}
              size="dash"
              className="avatar-initials"
              initials={generateUserIntials(user)}
            />
            <div className="profile">
              <h3>Hi {user.display_name} 👋🏻</h3>

              <span className="sub-text">{user.welcomeMessage}</span>
            </div>
            <div className="date">
              <span className="sub-text">
                {moment().format("ddd, Do MMM YYYY")}
              </span>
            </div>
          </ProfileCard>
          <RecentNotifications />

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

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;

  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;

    h3,
    span {
      display: flex;
      margin: 0;
    }

    h3 {
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: #151a30;
    }
  }

  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0 0 auto;

    span {
      font-weight: 500;
      text-align: right;
    }
  }
`;
