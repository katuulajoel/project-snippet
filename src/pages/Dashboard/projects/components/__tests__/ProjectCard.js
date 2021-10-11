import React from "react";
import renderer from "react-test-renderer";
import ProjectCard from "../ProjectCard";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme/build";

const project = {
  id: 1,
  content_type: 91,
  pm: null,
  participation: [
    { id: 123, user: { id: 1, display_name: "Test user", avatar_url: null } },
  ],
  progress_events: [],
  category: "dedicated",
  title: "Test Project (updated)",
  budget: null,
  currency: "EUR",
  type: "web",
  stage: "active",
  archived: false,
  deadline: "2020-03-28T10:12:33.220000",
};

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProjectCard project={project} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show right deadline message", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProjectCard
          project={{
            ...project,
            progress_events: [
              {
                id: 123,
                due_at: "2020-03-22T10:12:33.220000",
                title: "progress event",
              },
            ],
          }}
        />
      </BrowserRouter>
    );

    const deadlineMsg = wrapper.find(".next-deadline p");
    expect(deadlineMsg.text()).toEqual("22nd Mar 2020 - progress event");
  });
});
