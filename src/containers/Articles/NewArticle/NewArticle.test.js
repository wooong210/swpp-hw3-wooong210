import React, { useReducer } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewArticle from './NewArticle';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreatorsBlog from '../../../store/actions/blog';
import * as actionCreatorsUser from '../../../store/actions/user';


jest.mock('../../../components/Article/Article', () => {
	return jest.fn(props => {
	  return (
		<button className="spyArticle">
			<div>|{props.author}|</div>
		</button>

		);
	});
});

const initialArticlesState = { articles: [], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: true };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

const initialUserStateFalse = { logged_in: false };
const mockStoreFalse = getMockStore(initialArticlesState, initialCommentsState, initialUserStateFalse);

const initialUserStateUserDict = { logged_in: true , userDict: {1: "test1", 2: "test2", 3:"test3"}};
const mockStoreUserDict = getMockStore(initialArticlesState, initialCommentsState, initialUserStateUserDict);


describe('<NewArticle />', () => {
	let newArticle, newArticleFalse, newArticleUserDict, spyGetLoginStatus, spyGetUsersName, spyHistoryPush, spyPostArticle;
    window.alert = jest.fn();

	beforeEach(() => {
		newArticle = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <NewArticle history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		newArticleFalse = (
			<Provider store={mockStoreFalse}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <NewArticle history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		newArticleUserDict = (
			<Provider store={mockStoreUserDict}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <NewArticle history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		spyGetLoginStatus = jest.spyOn(actionCreatorsUser, 'getLoginStatus')
			.mockImplementation(() => { return dispatch => {}; });

		spyGetUsersName = jest.spyOn(actionCreatorsUser, 'getUsersName')
			.mockImplementation(() => { return dispatch => {}; });

		spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});

		spyPostArticle = jest.spyOn(actionCreatorsBlog, 'postArticle')
			.mockImplementation((atc) => { return dispatch => {}; });
	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {
		const component = mount(newArticle);
		const wrapper = component.find('.NewArticle');
		expect(wrapper.length).toBe(1);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
	});

	it(`should redirect to login when logged_in=false`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(newArticleFalse);
		expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	});

	it(`should not call getUsersName when userDict exists`, () => {
		const component = mount(newArticleUserDict);
		expect(spyGetUsersName).toHaveBeenCalledTimes(0);
	});

	// it(`should set author="" when userDict doesn't exist`, () => {
	// 	const component = mount(newArticle);
	// 	const previewWrapper = component.find('#preview-tab-button');
	// 	previewWrapper.simulate('click');
	// 	const wrapper = component.find(".spyArticle");
	// 	expect(wrapper.text()).toBe('||');
	// });

	it(`should set state properly on title'`, () => {
		const component = mount(newArticle);
		const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', { target: {value: "TEST_TITLE"}});
		const newArticleInstance = component.find(NewArticle.WrappedComponent).instance();
		expect(newArticleInstance.state.title).toEqual('TEST_TITLE');
		expect(newArticleInstance.state.content).toEqual('');
	});

	it(`should set state properly on content'`, () => {
		const component = mount(newArticle);
		const contentWrapper = component.find('#article-content-input');
		contentWrapper.simulate('change', { target: {value: "TEST_CONTENT"}});
		const newArticleInstance = component.find(NewArticle.WrappedComponent).instance();
		expect(newArticleInstance.state.title).toEqual('');
		expect(newArticleInstance.state.content).toEqual('TEST_CONTENT');
	});

	it(`should redirect to articles when back button is clicked on`, () => {
		const component = mount(newArticle);
		const wrapper = component.find('#back-create-article-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles');
	});

	it(`should disabled 'onStoreArticle'`, () => {
		const component = mount(newArticle);
		const wrapper = component.find('#confirm-create-article-button');
		wrapper.simulate('click');
		expect(spyPostArticle).toHaveBeenCalledTimes(0);
	});

	it(`should call 'onStoreArticle'`, () => {
		const component = mount(newArticle);
		const wrapper = component.find('#confirm-create-article-button');
		const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', { target: {value: "TEST_TITLE"}});
		const contentWrapper = component.find('#article-content-input');
		contentWrapper.simulate('change', { target: {value: "TEST_CONTENT"}});
		wrapper.simulate('click');
		expect(spyPostArticle).toHaveBeenCalledTimes(1);
	});

	it(`should set state preview=true when preview tab button is clicked on`, () => {
		const component = mount(newArticle);
		const previewWrapper = component.find('#preview-tab-button');
		previewWrapper.simulate('click');
		const wrapper = component.find('.spyArticle');
		expect(wrapper.length).toBe(1);
	});

	it(`should set state preview=false when write tab button is clicked on`, () => {
		const component = mount(newArticle);
		const previewWrapper = component.find('#preview-tab-button');
		previewWrapper.simulate('click');
		const writeWrapper = component.find('#write-tab-button');
		writeWrapper.simulate('click');
		const wrapper = component.find('.spyArticle');
		expect(wrapper.length).toBe(0);
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

