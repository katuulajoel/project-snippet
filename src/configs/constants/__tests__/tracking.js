import {
  GA_COMMANDS,
  GA_EVENT_ACTIONS,
  GA_EVENT_CATEGORIES,
  GA_EVENT_LABELS,
  GA_HIT,
  getGAUserType,
  getScopeUrl,
  getTaskTypeUrl,
  getUserTypeTwitter,
  TASK_TYPE_CHOICES_URL,
  USER_TYPES,
} from "../tracking";

describe("Tracking utils tests", () => {
  it("should return the correct values", () => {
    expect(TASK_TYPE_CHOICES_URL).toEqual({
      1: "web",
      2: "mobile",
      3: "other",
    });

    expect(USER_TYPES).toEqual({
      CLIENT: "client",
      DEVELOPER: "developer",
    });

    expect(GA_COMMANDS).toEqual({
      SEND: "send",
    });

    expect(GA_HIT).toEqual({
      PAGE_VIEW: "pageview",
      EVENT: "event",
    });

    expect(GA_EVENT_CATEGORIES).toEqual({
      AUTH: "Authentication",
      REGISTRATION: "Registration",
      PROFILE: "Profile",
      COMPANY: "Company",
      TASK: "Task",
      BATCH_PAY: "Batch Pay",
      CONTACT: "Contact",
      VIDEO: "Video",
      MESSAGE: "Message",
      CHAT: "Chat",
    });

    expect(GA_EVENT_ACTIONS).toEqual({
      SIGN_IN: "Sign In",
      SIGN_UP: "Sign Up",
      BROWSE_DEVS: "Browse Developers",
      LOG_OUT: "Log Out",
      CHANGE_PASSWORD: "Change Password",
      RECOVER_PASSWORD: "Recover Password",
      RECOVER_PASSWORD_CONFIRM: "Recover Password Confirm",
      DEV_APPLY: "Developer Apply",
      DEV_INVITE: "Invite Developer",
      PLAY: "Play",
      PAUSE: "Pause",
      CREATE: "Create",
      UPDATE: "Update",
      APPLY: "Apply",
      INTEGRATE: "Integrate",
      INVOICE: "Invoice",
      RATE: "Rate",
      SCHEDULE_CALL: "Schedule Call",
      REQUEST_OFFER: "Request Offer",
      SEND: "Send",
      PAY: "Pay",
      START: "Start",
      UPLOAD_DOCUMENT: "Upload Document",
    });

    expect(GA_EVENT_LABELS).toEqual({
      DEVELOPER: "Developer",
      CLIENT: "Client",
      ADMIN: "Admin",
      ANONYMOUS: "Anonymous",
      INTRO_VIDEO: "Intro Video",
      INTRO_VIDEO_STORY: "Intro Video: Story",
    });

    expect(getUserTypeTwitter(2)).toEqual("client");
    expect(getUserTypeTwitter(1)).toEqual("developer");
    expect(getUserTypeTwitter()).toEqual(null);

    const user = {
      id: 1,
    };
    expect(getGAUserType()).toEqual("Anonymous");
    expect(getGAUserType({ ...user, is_staff: 1 })).toEqual("Admin");
    expect(getGAUserType({ ...user, type: 2 })).toEqual("Client");
    expect(getGAUserType({ ...user, type: 1 })).toEqual("Developer");
    expect(getGAUserType(user)).toEqual("Unknown");

    expect(getTaskTypeUrl("mobile")).toEqual("mobile");
    expect(getTaskTypeUrl("web")).toEqual("web");
    expect(getTaskTypeUrl("other")).toEqual("other");
    expect(getTaskTypeUrl("")).toEqual(null);

    expect(getScopeUrl("2w")).toEqual("task");
    expect(getScopeUrl("6m")).toEqual("project");
    expect(getScopeUrl("permanent")).toEqual("ongoing");
    expect(getScopeUrl("")).toEqual(null);
  });
});
