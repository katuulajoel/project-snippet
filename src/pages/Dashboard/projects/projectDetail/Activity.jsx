/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useEffect } from "react";

/* --------------------------- Component Dependencies -------------------------- */
import ActivityList from "./ActivityList";
import { useDispatch, useSelector } from "react-redux";
import {
  listActivities,
  listMoreActivities,
} from "../../../../redux/actions/ProjectActions";

const Activity = ({ project }) => {
  const dispatch = useDispatch();
  const { activities, isMakingRequest } = useSelector(
    ({ Projects }) => Projects
  );

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    dispatch(
      listActivities({
        project: project.id,
      })
    );
  };

  return (
    <div>
      <ActivityList
        activities={activities.data?.reverse()}
        onLoadMore={() => {
          dispatch(listMoreActivities(activities.next));
        }}
        isLoading={isMakingRequest.listActivities}
        isLoadingMore={isMakingRequest.listMoreActivities}
        hasMore={!!activities.next}
      />
    </div>
  );
};

Activity.propTypes = {
  project: PropTypes.object,
};

export default Activity;
