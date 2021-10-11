import React from "react";
import renderer from "react-test-renderer";
import OpportunityCard from "../OpportunityCard";
import { BrowserRouter } from "react-router-dom";

const project = {
  id: 1,
  content_type: 91,
  pm: null,
  interest_polls: [
    {
      id: 123,
      created_by: { id: 1, display_name: "Test user", avatar_url: null },
    },
  ],
  progress_events: [{ id: 123 }],
  category: "dedicated",
  title: "Test Project (updated)",
  type: "web",
  stage: "active",
  deadline: "2020-03-28T10:12:33.220000",
};

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <OpportunityCard project={project} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
