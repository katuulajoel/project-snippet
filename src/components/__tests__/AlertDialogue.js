import React from 'react';
import renderer from 'react-test-renderer';
import AlertDialogue from '../AlertDialogue';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

describe('AlertDialogue test', () => {
  it('Snapshot test for AlertDialogue component', () => {
    const tree = renderer.create(<AlertDialogue />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should show the correct message', () => {
    const { container } = render(<AlertDialogue msg="Hello mock" />);
    const msg = container.querySelector('span#msg');
    expect(msg.innerHTML).toMatch(/Hello mock/i);
  });

  it('Should trigger dismiss on click', () => {
    const onButtonClickMock = jest.fn();
    const wrapper = mount(<AlertDialogue dismiss={onButtonClickMock} msg="Hello mock" />);
    const btn = wrapper.find('button.btn-icon');
    btn.simulate('click');
    expect(onButtonClickMock).toHaveBeenCalled();
  });
});
