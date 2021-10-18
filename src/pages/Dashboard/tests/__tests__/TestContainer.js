import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import TestContainer from '../TestContainer';
import { mount } from 'enzyme/build';
import Results, { dummyResults } from './Results';
import * as actions from '../../../../redux/actions/TestResultsActions';
import { toggleRightNav } from '../../../../redux/actions/UtilityActions';
import theme from '../../../../assets/theme';

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: { uid: 123, email: 'test@gmail.com' },
    isMakingRequest: {},
  },
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
    errors: {},
    isFetching: { default: true },
    isSaved: {},
    isSaving: {},
    next: {},
    previous: {},
    results: [],
    selectedFilters: [],
  },
};

const count = dummyResults.length;
const props = {
  testResults: { results: dummyResults },
  count,
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe('Test list container', () => {
  it('Should match snapshot test', () => {
    const { asFragment } = render(
      <Provider store={mockAppStore()}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(
      asFragment(<TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults} />)
    ).toMatchSnapshot();
  });

  it('should render children', async () => {
    const store = mockAppStore();
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults}>
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const expectedActions = [{ type: 'FETCH_RESULT_START' }];

    expect(store.getActions()).toMatchObject(expectedActions);
  });

  it('should show progress component', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <ThemeProvider theme={theme}>
            <TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults}>
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(wrapper.find('Progress').exists()).toBeTruthy();
  });

  it('should load data on page change', async () => {
    const testResultsActions = jest.spyOn(actions, 'fetchResults');
    const store = mockAppStore({
      ...mockAppState,
      Invoice: {
        list: {
          data: [dummyResults],
          count: dummyResults.length,
        },
        isMakingRequest: {},
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
    });
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults}>
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    // const nextPage = wrapper.find("li.next");
    // nextPage.simulate("click");

    expect(testResultsActions).toHaveBeenCalled();
    // expect(testResultsActions).toBeCalledWith({
    //   "6LMlpGnA": { page_size: 20 },
    //   //  2: "6LMlpGnA", {"page_size": 20}
    // });
  });

  it('load new results on change to new status page', () => {
    const fetchResultsStub = jest.spyOn(actions, 'fetchResults');

    const store = mockAppStore({
      Invoice: {
        list: {
          data: [],
          count: 0,
        },
        isMakingRequest: {},
      },

      TestResults: {
        count: {},
        errors: {},
        isFetching: { default: true },
        isSaved: {},
        isSaving: {},
        next: {},
        previous: {},
        results: dummyResults,
        selectedFilters: [],
        isMakingRequest: {},
      },
    });
    // eslint-disable-next-line no-unused-vars
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TestContainer collapseRightNav={toggleRightNav} TestResults={mockAppState.TestResults}>
              <Results {...props} />
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(fetchResultsStub).toHaveBeenCalled();
    expect(fetchResultsStub).toHaveBeenCalledTimes(2);

    const h3 = container.querySelector('h3'); 
    expect(h3).toBeTruthy();
    expect(h3.innerHTML).toBe('Results');

    // container.setProps({ match: { params: { filter: "overdue" } } });
  });
});
