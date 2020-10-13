import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Header from './Header';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';

const initialArticlesState = { articles: [], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: true };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

describe('<Header />', () => {
	let header;

	beforeEach(() => {
		header = (
			<Provider store={mockStore}>
			<ConnectedRouter history={history}>
				<div className="App">
					<Header />
				</div>
			</ConnectedRouter>
			</Provider>
		);
	})

	it('should render without errors', () => {
		const component = mount(header);
		const wrapper = component.find('.header');
		expect(wrapper.length).toBe(1);
	});

	it(`should call 'postTodo'`, () => {
		const spyClickLogout = jest.spyOn(actionCreators, 'userLogout')
			.mockImplementation(id => { return dispatch => {}; });
		const component = mount(header);
		const wrapper = component.find('#logout-button');
		wrapper.simulate('click');
		expect(spyClickLogout).toHaveBeenCalledTimes(1);
	});

	it(`should redirect when 'postTodo' calls`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(header);
		const wrapper = component.find('#logout-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	});
});

