import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const initialArticlesState = { articles: [], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: false };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

jest.mock('./containers/Articles/Articles', () => {
  return jest.fn(props => {
    return (
      <div className="spyArticles">
        {}
      </div>);
  });
});

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should be redirected to error page', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('Not Found');
  })
});
