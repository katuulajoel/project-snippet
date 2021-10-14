import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import TestForm from '../TestForm';

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
  return mockStore(state || mockAppState);
};

const store = mockAppStore();

describe('Testform tests', () => {
  it('Should match snapshot test', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TestForm id="test-form" result={dummyResult} />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment(<TestForm id="test-form" result={dummyResult} />)).toMatchSnapshot();
  });

  it('Check inputs value change', () => {
    const { queryByLabelText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TestForm id="test-form" result={dummyResult} />
        </BrowserRouter>
      </Provider>
    );

    // const commsSelect = queryByLabelText('comms-check');
    // fireEvent.select(commsSelect, { target: { value: 'pass' } });
    // expect(commsSelect.value).toBe('pass');
    // const mockedOnChange = jest.fn();
    // const { getByText } = render(<MySelectComponent
    //     options={mockedOptions}
    //     onChange={mockedOnChange} />);

    const fullNamePlaceholder = getByText('Full name');
    const emailPlaceholder = getByText('Email address');
    // const skillPlaceholder = getByText('Type to search and select...');
    const selectCommsPlaceholder = getByText('Communication');
    const selectProfilePlaceholder = getByText('Profiles');
    // const iqScorePlaceholder = getByText('Enter score');
    // const saPlaceholder = getByText('SA test');
    // const ccPlaceholder = getByText('Code of Conduct score');

    expect(fullNamePlaceholder).toBeTruthy();
    expect(emailPlaceholder).toBeTruthy();
    // expect(skillPlaceholder).toBeTruthy();
    expect(selectCommsPlaceholder).toBeTruthy();
    expect(selectProfilePlaceholder).toBeTruthy();
    // expect(iqScorePlaceholder).toBeTruthy();
    // expect(saPlaceholder).toBeTruthy();
    // expect(ccPlaceholder).toBeTruthy();

    const iqTestInput = queryByLabelText('iq-test-input');
    fireEvent.change(iqTestInput, { target: { value: '98' } });
    expect(iqTestInput.value).toBe('98');

    const saTestInput = queryByLabelText('sa-test-input');
    fireEvent.change(saTestInput, { target: { value: '76' } });
    expect(saTestInput.value).toBe('76');

    const ccTestInput = queryByLabelText('cc-test-input');
    fireEvent.change(ccTestInput, { target: { value: '86' } });
    expect(ccTestInput.value).toBe('86');
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
