import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../UserActions";
import { LIST_USERS_START, LIST_USERS_SUCCESS, LIST_USERS_FAILED } from "../../../configs/constants/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
});

export const dummyUsers = [
  {
    agree_version: 1.2,
    agreed_at: "2021-06-22T22:48:54",
    avatar_url: null,
    can_connect: true,
    can_contribute: false,
    can_pay: false,
    category: "developer",
    company: {
      bio: null,
      city: null,
      country: "",
      name: "",
      plot_number: null,
      postal_address: null,
      postal_code: null,
      ref_no: null,
      reg_no: null,
      skills: [],
      street: null,
      tel_number: "",
      vat_number: null,
      website: null,
    },
    connection: null,
    date_joined: "2021-06-22T22:48:41.243936",
    disagree_version: 0,
    disagreed_at: null,
    display_category: "Developer",
    display_name: "Wd Dw",
    display_type: "Developer",
    education: [],
    email: "wd@tunga.io",
    exact_code: "000000000000000016",
    first_name: "wd",
    id: 16,
    image: null,
    invoice_email: null,
    is_admin: false,
    is_designer: false,
    is_developer: true,
    is_internal: false,
    is_pay_admin: false,
    is_project_manager: false,
    is_project_owner: false,
    is_staff: false,
    last_activity_at: null,
    last_login: "2021-06-22T22:48:44.481185",
    last_name: "dw",
    last_set_password_email_at: null,
    payoneer_signup_url: "",
    payoneer_status: "initial",
    pending: false,
    profile: {
      bio: null,
      btc_address: null,
      btc_wallet: null,
      city: null,
      company: "",
      company_bio: null,
      company_details: null,
      company_profile: null,
      company_reg_no: null,
      country: "",
      country_name: "",
      id: 15,
      id_document: "http://localhost:8000/media/ids/2021/06/23/11038699_809353962473386_1825757412526772860_o.jpeg",
      location: "",
      mobile_money_cc: null,
      mobile_money_number: null,
      payment_method: null,
      phone_number: "",
      plot_number: null,
      postal_address: null,
      postal_code: null,
      reference_number: null,
      skills: [],
      skills_details: { language: [], framework: [], platform: [], library: [], storage: [], api: [], other: [] },
      street: null,
      tax_name: null,
      tax_percentage: null,
      vat_number: null,
      website: null,
    },
    project: [],
    ratings: { avg: null, display_avg: null, details: [] },
    request: null,
    satisfaction: null,
    source: 1,
    sso_refresh_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyNjk5NDEyNCwianRpIjoiZDQ0MTY1MWMxNTRkNDc3MDk5NThkYzllZTc4NzZkYjAiLCJ1c2VyX2lkIjoiZWNkNGZlODktNjE1Yy00ODg2LThmYzQtNTIzNjEwODgwNDNmIn0.GvRez4xITpzZ0gSv7b9XsW13yxbinvkXJ15ERHzM7gA",
    sso_uuid: "ecd4fe89-615c-4886-8fc4-52361088043f",
    tasks_completed: 0,
    tasks_created: 0,
    tax_location: "world",
    type: 1,
    username: "wd",
    verified: false,
    work: [],
  },
];

describe("User   actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should dispatch LIST_USERS_SUCCESS", async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          count: 1,
          next: null,
          previous: null,
          results: dummyUsers,
        },
      })
    );
    const expectedActions = [
      {
        type: LIST_USERS_START,
        filter: {
          account_type: undefined,
          search: "w",
        },
        prev_selection: null,
        selection: "6LMlpGnA",
      },
      {
        type: LIST_USERS_SUCCESS,
        count: 1,
        filter: {
          account_type: undefined,
          search: "w",
        },
        items: dummyUsers,
        next: null,
        previous: null,
        selection: "6LMlpGnA",
      },
    ];

    await store.dispatch(actions.listUsers({ search: "w", account_type: undefined }, "6LMlpGnA", null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should dispatch LIST_USERS_FAILED with error", async () => {
    const error = {
      message: "Error!",
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      {
        type: LIST_USERS_START,
        prev_selection: undefined,
        selection: undefined,
      },
      {
        error: null,
        prev_selection: undefined,
        selection: undefined,
        type: LIST_USERS_FAILED,
      },
    ];

    await store.dispatch(actions.listUsers());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
