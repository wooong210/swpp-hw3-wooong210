import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import ArticleDetail from './ArticleDetail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreatorsBlog from '../../../store/actions/blog';
import * as actionCreatorsUser from '../../../store/actions/user';
import * as actionCreatorsComment from '../../../store/actions/comments';


jest.mock('../../../components/Article/Article', () => {
	return jest.fn(props => {
	  return (
		<button className="spyArticle">
			<div>|{props.author}|</div>
		</button>

		);
	});
});

jest.mock('../../../components/Comment/Comment', () => {
	return jest.fn(props => {
	  return (
		<div className="spyComment">
			<button id="edit-comment-button" onClick={props.onClickEdit}></button>
			<button id="delete-comment-button" onClick={props.onClickDelete}></button>
		</div>

		);
	});
});

const initialArticlesState = {
	articles: [
		{id: 1, author_id: 1, title: 'TEST_TITLE_1', content: 'TEST_CONTENT_1'},
		{id: 2, author_id: 2, title: 'TEST_TITLE_2', content: 'TEST_CONTENT_2'},
		{id: 3, author_id: 1, title: 'TEST_TITLE_3', content: 'TEST_CONTENT_3'}
	],
	selectedArticle: {id: 1, author_id: 1, title: 'TEST_TITLE_1', content: 'TEST_CONTENT_1'}
};
const initialCommentsState = { comments: [
	{id: 1, article_id: 1, author_id: 2, content: 'TEST_COMMENT_1'},
	{id: 2, article_id: 2, author_id: 2, content: 'TEST_COMMENT_2'},
	{id: 3, article_id: 1, author_id: 1, content: 'TEST_COMMENT_3'},
	{id: 4, article_id: 2, author_id: 1, content: 'TEST_COMMENT_4'}

], selectedComment: null };
const initialUserState = { logged_in: true, id: 1};
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

const initialArticlesStateOthers = {
	articles: [
		{id: 1, author_id: 1, title: 'TEST_TITLE_1', content: 'TEST_CONTENT_1'},
		{id: 2, author_id: 2, title: 'TEST_TITLE_2', content: 'TEST_CONTENT_2'},
		{id: 3, author_id: 1, title: 'TEST_TITLE_3', content: 'TEST_CONTENT_3'}
	],
	selectedArticle: {id: 2, author_id: 2, title: 'TEST_TITLE_2', content: 'TEST_CONTENT_2'}
};
const mockStoreOthers = getMockStore(initialArticlesStateOthers, initialCommentsState, initialUserState);

const initialUserStateLoginFalse = { logged_in: false };
const mockStoreLoginFalse = getMockStore(initialArticlesState, initialCommentsState, initialUserStateLoginFalse);

const initialUserStateUserDict = { logged_in: true , userDict: {1: "test1", 2: "test2", 3:"test3"}};
const mockStoreUserDict = getMockStore(initialArticlesState, initialCommentsState, initialUserStateUserDict);

const initialArticlesStateWithoutSelect = {
	articles: [
		{id: 1, author_id: 1, title: 'TEST_TITLE_1', content: 'TEST_CONTENT_1'},
		{id: 2, author_id: 2, title: 'TEST_TITLE_2', content: 'TEST_CONTENT_2'},
		{id: 3, author_id: 1, title: 'TEST_TITLE_3', content: 'TEST_CONTENT_3'}
	],
	selectedArticle: null,
};
const mockStoreWithoutSelect = getMockStore(initialArticlesStateWithoutSelect, initialCommentsState, initialUserState);


describe('<ArticleDetail />', () => {
	let articleDetail, articleDetailOthers, articleDetailLoginFalse, articleDetailUserDict, articleDetailWithoutSelect, spyEditComment, spyPostComment, spyHistoryPush;

	const defaultProps = {
        match: { params: { id: 1 } },
    };
	beforeEach(() => {
		articleDetail = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleDetail {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articleDetailOthers = (
			<Provider store={mockStoreOthers}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleDetail {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articleDetailLoginFalse = (
			<Provider store={mockStoreLoginFalse}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleDetail {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articleDetailUserDict = (
			<Provider store={mockStoreUserDict}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleDetail {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);

		articleDetailWithoutSelect = (
			<Provider store={mockStoreWithoutSelect}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleDetail {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);

		spyEditComment = jest.spyOn(actionCreatorsComment, 'editComment')
			.mockImplementation((cmt) => { return dispatch => {}; });

		spyPostComment = jest.spyOn(actionCreatorsComment, 'postComment')
			.mockImplementation((cmt) => { return dispatch => {}; });

		spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});

	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {
		const spyGetLoginStatus = jest.spyOn(actionCreatorsUser, 'getLoginStatus')
			.mockImplementation((id) => { return dispatch => {}; });
		const spyGetArticle = jest.spyOn(actionCreatorsBlog, 'getArticle')
			.mockImplementation((id) => { return dispatch => {}; });
		const spyGetComments = jest.spyOn(actionCreatorsComment, 'getComments')
			.mockImplementation(() => { return dispatch => {}; });
		const component = mount(articleDetail);
		const wrapper = component.find('.ArticleDetail');
		expect(wrapper.length).toBe(1);
		const articleWrapper = component.find('.spyArticle');
		expect(articleWrapper.length).toBe(1);
		const commentWrapper = component.find('.spyComment');
		expect(commentWrapper.length).toBe(2);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
		expect(spyGetArticle).toHaveBeenCalledTimes(1);
		expect(spyGetComments).toHaveBeenCalledTimes(1);
	});

	it(`should not rise errors when selectedArticle = null`, () => {
		const component = mount(articleDetailWithoutSelect);
		const wrapper = component.find('.spyArticle');
		expect(wrapper.length).toBe(1);
	});

	it(`should redirect to login when logged_in=false`, () => {
		const component = mount(articleDetailLoginFalse);
		expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	});

	it(`should not call getUsersName when userDict exists`, () => {
		const spyGetUsersName = jest.spyOn(actionCreatorsUser, 'getUsersName')
			.mockImplementation(() => { return dispatch => {}; });
		const component = mount(articleDetailUserDict);
		expect(spyGetUsersName).toHaveBeenCalledTimes(0);
	});

	it(`should redirect to articles when back button is clicked on`, () => {
		const component = mount(articleDetail);
		const wrapper = component.find('#back-detail-article-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledTimes(1);
	});

	it(`should not show edit&delete button in others' articles`, () => {
		const component = mount(articleDetailOthers);
		const wrapper1 = component.find('#delete-article-button');
		const wrapper2 = component.find('#edit-article-button');
		expect(wrapper1.length).toBe(0);
		expect(wrapper2.length).toBe(0);
	});

	it(`should redirect to edit when edit button is clicked on`, () => {
		const component = mount(articleDetail);
		const wrapper = component.find('#edit-article-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles/1/edit');
	});

	it(`should call 'deleteArticle`, () => {
		const spyDeleteArticle = jest.spyOn(actionCreatorsBlog, 'deleteArticle')
			.mockImplementation((id) => { return dispatch => {}; });
		const component = mount(articleDetail);
		const wrapper = component.find('#delete-article-button');
		wrapper.simulate('click');
		expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
	});

	it(`should set state properly on newComment`, () => {
		const newComment = "TEST_NEW_COMMENT";
		const component = mount(articleDetail);
		const contentWrapper = component.find('#new-comment-content-input');
		contentWrapper.simulate('change', { target: {value: newComment}});
		const articleDetailInstance = component.find(ArticleDetail.WrappedComponent).instance();
		expect(articleDetailInstance.state.newComment).toEqual(newComment);
	});

	it(`should disabled 'onStoreComment'`, () => {
		const component = mount(articleDetail);
		const wrapper = component.find('#confirm-create-comment-button');
		wrapper.simulate('click');
		expect(spyPostComment).toHaveBeenCalledTimes(0);
	});

	it(`should call 'onStoreComment'`, () => {
		const component = mount(articleDetail);
		const wrapper = component.find('#confirm-create-comment-button');
		const newCommentWrapper = component.find('#new-comment-content-input');
		newCommentWrapper.simulate('change', { target: {value: "TEST_COMMENT"}});
		wrapper.simulate('click');
		expect(spyPostComment).toHaveBeenCalledTimes(1);
	});

	it(`should call 'deleteComment'`, () => {
		const spyDeleteComment = jest.spyOn(actionCreatorsComment, 'deleteComment')
			.mockImplementation((id) => { return dispatch => {}; });
		const component = mount(articleDetail);
		const wrapper = component.find('#delete-comment-button').at(0);
		wrapper.simulate('click');
		expect(spyDeleteComment).toHaveBeenCalledTimes(1);
	});

	it(`should call 'editComment' when edit comment input exists`, () => {
		const component = mount(articleDetail);
		const spyPrompt = jest.spyOn(window, 'prompt')
            .mockImplementation((prompt, initialInput) => "TEST_COMMENT_EDIT");
		const wrapper = component.find('#edit-comment-button').at(0);
		wrapper.simulate('click');
		expect(spyEditComment).toHaveBeenCalledTimes(1);
	});


	it(`should not call 'editComment' when edit comment input is empty`, () => {
		const component = mount(articleDetail);
		const spyPrompt = jest.spyOn(window, 'prompt')
            .mockImplementation((prompt, initialInput) => "");
		const wrapper = component.find('#edit-comment-button').at(0);
		wrapper.simulate('click');
		expect(spyEditComment).toHaveBeenCalledTimes(0);
	});
});

