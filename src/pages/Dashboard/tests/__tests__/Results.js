import React from 'react';
import renderer from 'react-test-renderer';
import Results from '../results';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { render } from '@testing-library/react';
// import { mount } from 'enzyme';
// import { mount } from "enzyme/build";
// import * as utils from "../utils/utils";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: {
      is_admin: true,
      is_pay_admin: true,
    },
  },
  Invoice: {
    isMakingRequest: {},
    errors: {},
    summary: {},
    list: { data: [], count: 0, next: '', previous: '' },
    invoice: {},
    csv: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

export const dummyResult = {
  id: 10,
  comms_check: 'very_good',
  mbti_profile: 'entj',
  iq_test: 100,
  sa_test: 100,
  code_of_conduct: 100,
  coding_tests: [
    {
      skill: 1,
      score: 100,
      id: 12,
      skill_name: 'react',
    },
  ],
  user_obj: {
    id: 16,
    username: 'wd',
    email: 'wd@tunga.io',
    first_name: 'wd',
    last_name: 'dw',
    display_name: 'Wd Dw',
    short_name: 'Wd',
    type: 1,
    image: null,
    is_developer: true,
    is_project_owner: false,
    is_project_manager: false,
    is_staff: false,
    is_admin: false,
    is_pay_admin: false,
    verified: false,
    company: null,
    avatar_url: null,
    can_contribute: false,
    date_joined: '2021-06-22T22:48:41.243936',
    agree_version: 1.2,
    agreed_at: '2021-06-22T22:48:54',
    disagree_version: 0,
    disagreed_at: null,
    payoneer_signup_url: '',
    payoneer_status: 'initial',
    exact_code: '000000000000000016',
    tax_location: 'world',
  },
};

export const dummyResults = [
  {
    id: 10,
    comms_check: 'very_good',
    mbti_profile: 'entj',
    iq_test: 100,
    sa_test: 100,
    code_of_conduct: 100,
    coding_tests: [
      {
        skill: 1,
        score: 100,
        id: 12,
        skill_name: 'react',
      },
    ],
    user_obj: {
      id: 16,
      username: 'wd',
      email: 'wd@tunga.io',
      first_name: 'wd',
      last_name: 'dw',
      display_name: 'Wd Dw',
      short_name: 'Wd',
      type: 1,
      image: null,
      is_developer: true,
      is_project_owner: false,
      is_project_manager: false,
      is_staff: false,
      is_admin: false,
      is_pay_admin: false,
      verified: false,
      company: null,
      avatar_url: null,
      can_contribute: false,
      date_joined: '2021-06-22T22:48:41.243936',
      agree_version: 1.2,
      agreed_at: '2021-06-22T22:48:54',
      disagree_version: 0,
      disagreed_at: null,
      payoneer_signup_url: '',
      payoneer_status: 'initial',
      exact_code: '000000000000000016',
      tax_location: 'world',
    },
  },
];

const count = dummyResults.length;
const props = {
  testResults: { results: dummyResults },
  count,
};

describe('Dashboard test - Test Results', () => {
  it('Should match snapshot test', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <Results {...props} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('should show add new result for test.', async () => {
  //   const { getByText  } = render(
  //     <Provider store={mockAppStore()}>
  //         <Results {...props} />
  //     </Provider>
  //   );
  //   // const title = container.querySelector('.btn-primary');
  //   // expect(title.innerHTML).toMatch(/Add New Result/i);
  //   const fullNamePlaceholder = getByText('Full name');
  //   expect(fullNamePlaceholder).toBeTruthy();
  // });

  // it('checks the table rows successfuly', async () => {
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <Provider store={mockAppStore(mockAppState)}>
  //         <Results {...props} onLoadMore={() => {}} filter="" />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   // const editBtn = wrapper.find('.btn-edit');
  //   expect(wrapper.find('StyledTable').exists()).toBeFalsy();
  //   // editBtn.simulate('click');
  //   expect(wrapper.find('TableFooter').exists()).toBeTruthy();
  //   // editBtn.simulate('click');
  //   // expect(wrapper.find('BulkActions').exists()).toBeFalsy();
  // });

  // it("should open dropdown actions", async () => {
  //   jest.spyOn(utils, "showAction").mockReturnValueOnce(true);

  //   // eslint-disable-next-line no-unused-vars
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <Provider store={mockAppStore(mockAppState)}>
  //         <Results data={[dummyResults]} onLoadMore={() => {}} filter="in" />
  //       </Provider>
  //     </BrowserRouter>
  //   );

  //   // TODO: unfinished test for toggle dropdown action
  //   //var dropdownAction = wrapper.find(".btn-group > button");
  //   /* expect(wrapper.find("BulkActions").exists()).toBeFalsy();
  //   checkbox.simulate("click");
  //   expect(wrapper.find("BulkActions").exists()).toBeTruthy();
  //   checkbox.simulate("click");
  //   expect(wrapper.find("BulkActions").exists()).toBeFalsy(); */
  // });
});
