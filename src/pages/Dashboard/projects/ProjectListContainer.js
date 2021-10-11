import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addPropsToChildren } from "../../../components/utils/children";
import Progress from "../../../components/Progress";
import {
  fetchProjects,
  fetchMoreProjects,
} from "../../../actions/ProjectActions";
import SectionNav from "../../../components/SectionNav";
import { isPM } from "../../../components/utils/auth";

const ProjectListContainer = (props) => {
  const {
    filter,
    children,
    match: {
      params: { type },
    },
  } = props;
  const dispatch = useDispatch();
  const { isMakingRequest, projectPMFilter, projects } = useSelector(
    ({ Projects }) => Projects
  );
  const { user } = useSelector(({ Auth }) => Auth);

  const getProjectFilters = (filter) => {
    switch (filter) {
      case "dedicated":
        return {
          category: "dedicated",
          stage: "active",
          archived: "False",
        };
      case "opportunity":
        return { stage: "opportunity" };
      case "managed":
        return {
          category: "project",
          stage: "active",
          archived: "False",
        };
      default:
        return { stage: "active", archived: "True", category: type };
    }
  };

  useEffect(() => {
    if (user.id) {
      getList();
    }
  }, [projectPMFilter, filter, type, user]);

  const getList = () => {
    dispatch(
      fetchProjects({
        ...getProjectFilters(filter),
        show_all: isPM() ? projectPMFilter : true,
      })
    );
  };

  const renderChildren = () => {
    return addPropsToChildren(children, {
      onLoadMore: () => {
        dispatch(fetchMoreProjects(projects.next));
      },
      ...getProjectFilters(filter),
    });
  };

  return (
    <>
      {getProjectFilters(filter).archived === "True" && (
        <SectionNav
          urlExact={false}
          links={[
            {
              route: `projects/archived/dedicated`,
              name: "Dedicated Developers",
            },
            {
              route: `projects/archived/projects`,
              name: "Managed Projects",
            },
          ]}
        />
      )}
      {isMakingRequest.list ? (
        <Progress style={{ display: "flex", justifyContent: "center" }} />
      ) : (
        renderChildren()
      )}
    </>
  );
};

ProjectListContainer.propTypes = {
  project: PropTypes.object,
  children: PropTypes.any, // TODO: get appropriate type
  filter: PropTypes.string,
  match: PropTypes.any,
  selectionKey: PropTypes.string,
};

ProjectListContainer.defaultProps = {
  filter: null,
  selectionKey: null,
};

export default ProjectListContainer;
