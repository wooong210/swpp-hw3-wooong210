import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Articles from './Articles';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreatorsBlog from '../../store/actions/blog';
import * as actionCreatorsUser from '../../store/actions/user';


jest.mock('../../components/ArticleList/ArticleList', () => {
	return jest.fn(props => {
	  return (
		<button className="spyArticleList" onClick={props.clicked}>
			<div>{props.title}</div>
		</button>

		);
	});
});

const initialArticlesState = { articles: [
	{id: 1, title: 'ARTICLES_TEST_TITLE_1', name: 'ARTICLES_TEST_AUTHOR_1'},
    {id: 2, title: 'ARTICLES_TEST_TITLE_2', name: 'ARTICLES_TEST_AUTHOR_2'},
    {id: 3, title: 'ARTICLES_TEST_TITLE_3', name: 'ARTICLES_TEST_AUTHOR_3'},
], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: true };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

const initialUserStateFalse = { logged_in: false };
const mockStoreFalse = getMockStore(initialArticlesState, initialCommentsState, initialUserStateFalse);

const initialUserStateUserDict = { logged_in: true , userDict: {1: "test1", 2: "test2", 3:"test3"}};
const mockStoreUserDict = getMockStore(initialArticlesState, initialCommentsState, initialUserStateUserDict);


describe('<Articles />', () => {
	let articles, articlesFalse, articlesUserDict, spyGetArticles;

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
		articlesFalse = (
			<Provider store={mockStoreFalse}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Articles />} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articlesUserDict = (
			<Provider store={mockStoreUserDict}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Articles />} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		spyGetArticles = jest.spyOn(actionCreatorsBlog, 'getArticles')
			.mockImplementation(() => { return dispatch => {}; });
	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {
		const component = mount(articles);
		const wrapper = component.find('.Articles');
		expect(wrapper.length).toBe(1);
		const listWrapper = component.find(".spyArticleList");
		expect(listWrapper.at(0).text()).toBe('ARTICLES_TEST_TITLE_1');
		expect(listWrapper.at(1).text()).toBe('ARTICLES_TEST_TITLE_2');
		expect(listWrapper.at(2).text()).toBe('ARTICLES_TEST_TITLE_3');
		expect(spyGetArticles).toBeCalledTimes(1);
	});

	it(`should redirect to articleDetail when articlelist is clicked on`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(articles);
		const wrapper = component.find('.spyArticleList').at(0);
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles/1');
	});

	it(`should redirect to createArticle when createbutton is clicked on`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(articles);
		const wrapper = component.find('#create-article-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles/create');
	});

	it(`should redirect to login when logged_in=false`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(articlesFalse);
		expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	});


	it(`should not call getUsersName when userDict exists`, () => {
		const spyDeleteTodo = jest.spyOn(actionCreatorsUser, 'getUsersName')
		.mockImplementation(id => { return dispatch => {}; });
		const component = mount(articlesUserDict);
		expect(spyDeleteTodo).toHaveBeenCalledTimes(0);
	});
});

