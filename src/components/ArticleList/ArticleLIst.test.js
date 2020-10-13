import React from 'react';
import { shallow } from 'enzyme';
import ArticleList from './ArticleList';

describe('<ArticleList />', () => {
  it('should render without errors', () => {
    const component = shallow(<ArticleList />);
    const wrapper = component.find('.article-list');
    expect(wrapper.length).toBe(1);
  });
})
