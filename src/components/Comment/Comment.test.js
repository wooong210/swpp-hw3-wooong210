import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('<Comment />', () => {
  it('should render without errors', () => {
    const component = shallow(<Comment />);
    const wrapper = component.find('.comment');
    expect(wrapper.length).toBe(1);
  });
})
