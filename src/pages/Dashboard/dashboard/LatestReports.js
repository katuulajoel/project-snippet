import React from "react";
import { useSelector } from "react-redux";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { Link } from "react-router-dom";
import { getdateFormated } from "../../../components/utils/dateUtil";
import Icon from "../../../components/Icon";

const LatestReports = () => {
  const {
    notifications: { events },
  } = useSelector(({ Dashboard }) => Dashboard);
  return (
    <div className="dashboard-card">
      <h3 className="title">Latest reports</h3>
      {events?.length == 0 ? (
        <SummaryPlaceholder description="No upcoming updates" />
      ) : (
        <div className="content">
          {events?.map((event) => {
            return (
              <div key={event.id} className="list-layout clearfix">
                <div className="icon-avatar">
                  <span>
                    <Icon name="baseline-folder-open" size="sm" />
                  </span>
                </div>
                <div className="detail">
                  <p>
                    Scheduled update for{" "}
                    <Link
                      to={`/projects/${event.project.id}/events/${event.id}`} // TODO: link this to the right url
                    >
                      {event.project.title}
                      {event.title ? `: ${event.title}` : ""}
                    </Link>
                  </p>
                  <span className="sub-text">
                    <Icon name="clock-outline" size="sm" />{" "}
                    {getdateFormated(event.due_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestReports;
