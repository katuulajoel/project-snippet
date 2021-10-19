import React from "react";
import renderer from "react-test-renderer";
import Input from "../Input";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount } from "enzyme/build";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Invoice: { search: {} },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Input component test", () => {
  it("Snapshot test for Input component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <Input type="text" color="blue" fontSize="12px" />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should change input type on click showPassword", () => {
    const wrapper = mount(
      <Provider store={mockAppStore()}>
        <Input type="password" />
      </Provider>
    );
    const input = wrapper.find("input");
    expect(input.instance().type).toEqual("password");
    const showBtn = wrapper.find("button.input-icon");
    showBtn.simulate("click");
    expect(input.instance().type).toEqual("text");
  });

  // it('should change input type on click showPassword', () => {
  //   const wrapper = mount(
  //     <Provider store={mockAppStore()}>
  //       <Input type="password" />
  //     </Provider>
  //   );
  //   const input = wrapper.find('input');
  //   input.simulate("change", { target: { value: "changing" } });
  //   expect(input.innerHTML).toEqual('changing');
  // });
});
