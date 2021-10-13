import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import TestForm from '../TestForm';
import theme from '../../../../theme';
import {
  // mount,
  shallow,
} from 'enzyme';
// import { render } from '@testing-library/react';

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    isMakingRequest: {},
    errors: {},
    summary: {},
    list: { data: [], count: 0, next: '', previous: '' },
    invoice: {},
    csv: {},
  },
  TestResults: {
    count: {},
    errors: { fetch: null },
    isFetching: { default: false },
    isSaved: {},
    isSaving: {},
    next: {},
    previous: {},
    results: [],
    selectedFilters: [],
  },
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

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe('Testform tests', () => {
  it('Should match snapshot test', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Provider store={mockAppStore(mockAppState)}>
          <ThemeProvider theme={theme}>
            <TestForm id="test-form" result={dummyResult} />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  // it('Should show the label for buttons', () => {
  //   const { container } = render(
  //     <BrowserRouter>
  //       <Provider store={mockAppStore(mockAppState)}>
  //         <ThemeProvider theme={theme}>
  //           <TestForm id="test-form" result={dummyResult} />
  //         </ThemeProvider>
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //   const update = container.querySelector('button.btn-icon');
  //   expect(update.innerHTML).toEqual('');
  //   // expect(update[1].value).toEqual(/Update/i);
  //   // expect(update.values).toMatch(/Update/i);
  // });

  // it('Should trigger dismiss on click', () => {
  //   const onProceedClickMock = jest.fn();
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <Provider store={mockAppStore(mockAppState)}>
  //         <ThemeProvider theme={theme}>
  //           <TestForm id="test-form" result={dummyResult} proceed={onProceedClickMock} />
  //         </ThemeProvider>
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //   const btn = wrapper.find('button.okay');
  //   expect(btn.innerHTML).toMatch(/Update/i);
  //   btn.simulate('click');
  //   expect(onProceedClickMock).toHaveBeenCalled();
  // });
});
