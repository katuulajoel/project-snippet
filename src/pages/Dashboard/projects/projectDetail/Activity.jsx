/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";

/* --------------------------- Component Dependencies -------------------------- */
import ActivityList from "./ActivityList";
import { useDispatch, useSelector } from "react-redux";
import { listActivities } from "../../../../redux/actions/ProjectActions";

const Activity = () => {
  const dispatch = useDispatch();
  const { project } = useSelector(({ Projects }) => Projects);

  /* useEffect(() => {
    getList();
  }, []);

  const getList = (filters = {}) => {
    const { project, ActivityActions } = this.props;
    dispatch(
      listActivities({
        ...(this.props.filters || {}),
        ...(filters || {}),
        project: project.id,
      })
    );
  }; */

  return (
    <div>
      {/* <ActivityList
        activities={activities.reverse()}
        onLoadMore={() => {
          ActivityActions.listMoreActivities(
            Activity.next[selectionKey],
            selectionKey
          );
        }}
        isLoading={Activity.isFetching[selectionKey]}
        isLoadingMore={Activity.isFetchingMore[selectionKey]}
        hasMore={!!Activity.next[selectionKey]}
        showMessages={this.state.messages}
        showNotifications={this.state.notifications}
        showProgressReports={this.state.progress_reports}
        showFiles={this.state.files}
      /> */}
    </div>
  );

  /* render() {
    const { Activity, ActivityActions } = this.props,
      selectionKey = this.state.selectionKey;
    let activities = (Activity.ids[selectionKey] || []).map((id) => {
      return Activity.activities[id];
    });

    
  } */
};

Activity.propTypes = {
  project: PropTypes.object,
  Activity: PropTypes.object,
  ProjectActions: PropTypes.object,
  ActivityActions: PropTypes.object,
  filters: PropTypes.object,
  selectionKey: PropTypes.string,
};

export default Activity;
