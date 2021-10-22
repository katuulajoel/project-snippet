import * as ProjectActions from "../../redux/actions/ProjectActions";
import * as modalActions from "../modals";
import * as projectUtils from "../projectUtils";
import * as authUtils from "../auth";
import store from "../../redux/store";

jest.mock("../../redux/store", () => {
  return {
    dispatch: jest.fn(),
  };
});

describe("Invoice utils tests", () => {
  beforeAll(() => {
    return jest
      .spyOn(modalActions, "openConfirm")
      .mockReturnValue(Promise.resolve());
  });

  it("should change planning Date", async () => {
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve({ reason: "reason...!" }));
    const updateStub = jest.spyOn(ProjectActions, "updateProject");
    store.dispatch.mockReturnValue(updateStub);

    await projectUtils.onManageSchedule({ id: 123 }, { reason: "reason...!" });

    expect(updateStub).toHaveBeenCalled();

    expect(updateStub).toBeCalledWith(123, {
      change_log: [
        {
          field: "reason",
          reason: "reason...!",
          previous_value: null,
          new_value: "reason...!",
        },
      ],
    });
  });

  it("should change planning document", async () => {
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve({ reason: "reason...3!" }));
    const updateDocumentStub = jest.spyOn(ProjectActions, "updateDocument");
    store.dispatch.mockReturnValue(updateDocumentStub);

    await projectUtils.onManagePlan(
      { id: 123 },
      { id: 123, reason: "reason...!" }
    );

    expect(updateDocumentStub).toBeCalledWith(123, {
      change_log: [
        {
          field: "reason",
          reason: "reason...3!",
          previous_value: "reason...!",
          new_value: "reason...3!",
        },
      ],
      project: {
        id: 123,
      },
      type: "planning",
    });
  });

  it("should create planning document", async () => {
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve({ url: "url" }));
    const createDocumentStub = jest.spyOn(ProjectActions, "createDocument");
    store.dispatch.mockReturnValue(createDocumentStub);

    await projectUtils.onManagePlan({ id: 123 });

    expect(createDocumentStub).toBeCalledWith({
      project: {
        id: 123,
      },
      type: "planning",
      url: "url",
    });
  });

  it("should create milestone", async () => {
    jest.spyOn(authUtils, "getUser").mockReturnValue({ id: 123 });
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(Promise.resolve({ title: "title" }));
    const createProgressEventStub = jest.spyOn(
      ProjectActions,
      "createProgressEvent"
    );
    store.dispatch.mockReturnValue(createProgressEventStub);
    await projectUtils.onManageMilestone({ id: 123 });

    expect(createProgressEventStub).toBeCalledWith({
      project: {
        id: 123,
      },
      title: "title",
      type: "milestone",
      user: {
        id: 123,
      },
    });
  });

  it("should change milestone", async () => {
    jest.spyOn(authUtils, "getUser").mockReturnValue({ id: 123 });
    jest
      .spyOn(modalActions, "openModal")
      .mockReturnValue(
        Promise.resolve({ reason: "reason...3!", title: "news updated" })
      );
    const updateProgressEventStub = jest.spyOn(
      ProjectActions,
      "updateProgressEvent"
    );
    store.dispatch.mockReturnValue(updateProgressEventStub);

    await projectUtils.onManageMilestone(
      { id: 123 },
      { id: 123, title: "news" }
    );

    expect(updateProgressEventStub).toBeCalledWith(123, {
      change_log: [
        {
          field: "title",
          reason: "reason...3!",
          previous_value: "news",
          new_value: "news updated",
        },
        {
          field: "reason",
          new_value: "reason...3!",
          previous_value: null,
          reason: "reason...3!",
        },
      ],
      project: {
        id: 123,
      },
      type: "milestone",
      title: "news updated",
    });
  });
});
