import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import TableCells from "../TableCells";
import theme from "../../../../assets/theme";
import { dummyResult } from "./Results";

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    isMakingRequest: {},
    errors: {},
    summary: {},
    list: { data: [], count: 0, next: "", previous: "" },
    invoice: {},
    csv: {},
  },
  TestResults: {
    count: { default: 1 },
    errors: { fetch: null },
    isMakingRequest: { default: false },
    isSaved: {},
    isSaving: {},
    next: {},
    previous: {},
    results: [dummyResult],
    selectedFilters: [],
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("TableCells Component test", () => {
  it("Should match snapshot test", () => {
    global.URL.createObjectURL = jest.fn(() => "details");
    const cell = {
      value: {
        result: 100,
        status: "failed",
      },
      column: {
        id: "code-of-conduct",
      },
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <ThemeProvider theme={theme}>
              <TableCells {...cell} />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('Should trigger edit on click', () => {
  //   const onButtonClickMock = jest.fn();
  //   const cell = {
  //     value: {
  //       result: 100,
  //       status: 'failed',
  //     },
  //     column: {
  //       id: 'code-of-conduct',
  //     },
  //   };
  //   const wrapper = mount(
  //     <BrowserRouter>
  //       <Provider store={mockAppStore()}>
  //         <ThemeProvider theme={theme}>
  //           <TableCells {...cell} editTest={onButtonClickMock} />
  //         </ThemeProvider>
  //       </Provider>
  //     </BrowserRouter>
  //   );
  //   const btn = wrapper.find('button');
  //   btn.simulate('click');
  //   expect(onButtonClickMock).toHaveBeenCalled();
  // });
});
