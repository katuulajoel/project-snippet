import React from "react";
import { openModal } from "./modals";
import store from "../redux/store";
import ProjectDateForm from "../pages/Dashboard/projects/projectDetail/components/ProjectDateForm";
import MilestoneForm from "../pages/Dashboard/projects/projectDetail/components/MilestoneForm";
import PlanningForm from "../pages/Dashboard/projects/projectDetail/components/PlanningForm";
import { Header } from "./invoiceUtils";
import {
  createDocument,
  createProgressEvent,
  updateDocument,
  updateProgressEvent,
  updateProject,
} from "../redux/actions/ProjectActions";
import { getUser } from "./auth";

/**
 * Create record of which fields have changes showing previous and current values
 * @param {*} fields Object keys of object you are trying to edit e.g project
 * @param {*} reason
 * @param {*} update new object from form
 * @param {*} original old object that you are trying to edit
 * @returns array of fields that have changed and the reason
 */
const parseChangeLog = (fields, update, original) => {
  let changes = [];
  fields.forEach((field) => {
    if (update[field] && update[field] !== original[field]) {
      changes.push({
        field: field,
        reason: update.reason,
        previous_value: original[field] || null,
        new_value: update[field],
      });
    }
  });
  return changes;
};

export const onManageSchedule = (project, timeline = {}) => {
  let { id, reason, deadline, start_date } = timeline;

  openModal({
    body: (
      <ProjectDateForm
        id="timeline-form"
        project={{ id, reason, deadline, start_date }}
      />
    ),
    options: {
      className: "modal-payments",
      ok: `Save ${timeline ? "Changes" : ""}`,
      form: {
        type: "submit",
        form: `timeline-form`,
      },
    },
    header: <Header title={`${timeline ? "Update" : "Add"} timeline`} />,
  }).then((data) => {
    if (data.reason) {
      let changes = parseChangeLog(
        ["reason", "deadline", "start_date"],
        data,
        project
      );
      delete data["reason"];
      if (changes.length) {
        data.change_log = changes;
      }
    }
    store.dispatch(updateProject(project.id, data));
  });
};

export const onManageMilestone = (project, milestone = {}) => {
  let { id, reason, title, due_at } = milestone;

  openModal({
    body: (
      <MilestoneForm
        id="milestone-form"
        milestone={{ id, reason, title, due_at }}
      />
    ),
    options: {
      className: "modal-payments",
      ok: `Save ${milestone ? "Changes" : ""}`,
      form: {
        type: "submit",
        form: `milestone-form`,
      },
    },
    header: <Header title={`${milestone ? "Update" : "Add"} Milestone`} />,
  }).then((data) => {
    if (data.reason) {
      let changes = parseChangeLog(
        ["title", "due_at", "reason"],
        data,
        milestone
      );
      delete data["reason"];
      if (changes.length) {
        data.change_log = changes;
      }
    }
    data.type = "milestone";
    data.project = { id: project.id };

    if (Object.keys(milestone).length > 0) {
      store.dispatch(updateProgressEvent(milestone.id, data));
    } else {
      store.dispatch(
        createProgressEvent({ ...data, user: { id: getUser().id } })
      );
    }
  });
};

export const onManagePlan = (project, plan = {}) => {
  let { id, reason, title, url, download_url } = plan;

  openModal({
    body: (
      <PlanningForm
        id="planning-form"
        plan={{ id, reason, title, url: url || download_url }}
      />
    ),
    options: {
      className: "modal-payments",
      ok: `Save ${plan ? "Changes" : ""}`,
      form: {
        type: "submit",
        form: `planning-form`,
      },
    },
    header: <Header title={`${plan ? "Update" : "Add"} detailed planning`} />,
  }).then((data) => {
    if (data.reason) {
      let changes = parseChangeLog(["reason", "title", "url"], data, plan);
      delete data["reason"];
      if (changes.length) {
        data.change_log = changes;
      }
    }

    data.type = "planning";
    data.project = { id: project.id };

    if (Object.keys(plan).length > 0) {
      store.dispatch(updateDocument(plan.id, data));
    } else {
      store.dispatch(createDocument(data));
    }
  });
};
