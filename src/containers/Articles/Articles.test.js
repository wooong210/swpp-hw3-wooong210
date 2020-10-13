import React, { useReducer } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Articles from './Articles';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/user';


jest.mock('../../components/ArticleList/ArticleList', () => {
	return jest.fn(props => {
	  return (
		<button className="spyArticleList" onClick={props.clicked}>
			<div>{props.id}</div>
			<div>{props.title}</div>
			<div>author : {props.name}</div>
		</button>

		);
	});
});

const initialArticlesState = { articles: [], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: true };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

describe('<Articles />', () => {
	let articles, spyGetArticles;

	beforeEach(() => {
		articles = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Articles />} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		spyGetArticles = jest.spyOn(actionCreators, 'getArticles')
		  .mockImplementation(() => { return dispatch => {}; });
	})
	it('should render Articles', () => {
		const component = mount(articles);
		const wrapper = component.find('.Articles');
		expect(wrapper.length).toBe(1);
	});

	it('should render Todos', () => {
		const component = mount(todoList);
		const wrapper = component.find('.spyTodo');
		expect(wrapper.length).toBe(3);
		expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
		expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
		expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
		expect(spyGetTodos).toBeCalledTimes(1);
	  });
	// it(`should call 'postTodo'`, () => {
	// 	const spyClickLogout = jest.spyOn(actionCreators, 'userLogout')
	// 		.mockImplementation(id => { return dispatch => {}; });
	// 	const component = mount(header);
	// 	const wrapper = component.find('#logout-button');
	// 	wrapper.simulate('click');
	// 	expect(spyClickLogout).toHaveBeenCalledTimes(1);
	// });

	// it(`should redirect when 'postTodo' calls`, () => {
	// 	const spyHistoryPush = jest.spyOn(history, 'push')
	// 		.mockImplementation(path => {});
	// 	const component = mount(header);
	// 	const wrapper = component.find('#logout-button');
	// 	wrapper.simulate('click');
	// 	expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	// });

//   it('should render Header', () => {
//     const component = mount(todoList);
//     const wrapper = component.find('.spyTodo');
//     expect(wrapper.length).toBe(3);
//     expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
//     expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
//     expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
//     expect(spyGetTodos).toBeCalledTimes(1);
//   });

//   it(`should call 'clickTodoHandler'`, () => {
//     const spyHistoryPush = jest.spyOn(history, 'push')
//       .mockImplementation(path => {});
//     const component = mount(todoList);
//     const wrapper = component.find('.spyTodo .title').at(0);
//     wrapper.simulate('click');
//     expect(spyHistoryPush).toHaveBeenCalledWith('/todos/1');
//   });

//   it(`should call 'clickDelete'`, () => {
//     const spyDeleteTodo = jest.spyOn(actionCreators, 'deleteTodo')
//       .mockImplementation(id => { return dispatch => {}; });
//     const component = mount(todoList);
//     const connectedRouter = component.find(ConnectedRouter);
//     const wrapper = component.find('.spyTodo .deleteButton').at(0);
//     wrapper.simulate('click');
//     expect(spyDeleteTodo).toHaveBeenCalledTimes(1);
//   });

//   it(`should call 'clickDone'`, () => {
//     const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
//       .mockImplementation(id => { return dispatch => {}; });
//     const component = mount(todoList);
//     const wrapper = component.find('.spyTodo .doneButton').at(0);
//     wrapper.simulate('click');
//     expect(spyToggleTodo).toBeCalledTimes(1);
//   });
});

