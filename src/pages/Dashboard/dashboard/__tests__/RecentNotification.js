/* eslint-disable no-unused-vars */
import React from "react";
import renderer from "react-test-renderer";
import RecentNotifications from "../RecentNotifications";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../../../utils/auth";
import { mount } from "enzyme/build";

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

const state = {
  Dashboard: {
    notifications: {
      profile: {
        required: [{}],
        optional: [],
        cleared: ['complete', 'payoneer'],
      },
      activities: [
        {
          action: 'create',
          activity_type: 'participation',
          description: null,
          id: 573,
          activity: {
            created_by: {
              display_name: 'Admin Tunga',
            },
          },
        },
        {
          action: 'create',
          activity_type: 'document',
          description: null,
          id: 534,
          activity: {
            created_by: {
              display_name: 'Admin Tunga',
            },
          },
        },
      ],
    },
    isMakingRequest: {},
  },
  Invoice: {
    search: {},
  },
};

describe('Dashboard test', () => {
  beforeEach(() => {
    jest.spyOn(actions, 'isDev').mockReturnValueOnce(true);
    jest.spyOn(actions, 'getUser').mockReturnValueOnce({ payoneer_status: 'approved' });
  });

  /* it("Should match snapshot test", () => {
    const mockDate = new Date(1466424490000);
    const spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(state)}>
            <ThemeProvider theme={theme}>
              <RecentNotifications />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    spy.mockRestore();
  });
 */
  it('should clear all notifications', () => {
    const store = mockAppStore(state);
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <RecentNotifications />
        </Provider>
      </BrowserRouter>
    );

    var clearAllBtn = wrapper.find('.title small');
    clearAllBtn.simulate('click');

    const expectedActions = [
      {
        type: 'DELETE_NOTIFICATIONS_START',
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should clear notification', () => {
    const store = mockAppStore(state);
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <RecentNotifications />
        </Provider>
      </BrowserRouter>
    );

    var clearBtn = wrapper.find('.list-layout .btn-icon').at(0);
    clearBtn.simulate('click');

    const expectedActions = [
      {
        type: 'CREATE_NOTIFICATION_LOG_START',
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
