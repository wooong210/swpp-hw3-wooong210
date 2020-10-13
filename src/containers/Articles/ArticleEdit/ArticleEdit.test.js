import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import ArticleEdit from './ArticleEdit';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreatorsBlog from '../../../store/actions/blog';
import * as actionCreatorsUser from '../../../store/actions/user';


jest.mock('../../../components/Article/Article', () => {
	return jest.fn(props => {
	  return (
		<button className="spyArticle">
		</button>

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
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: true };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

const initialUserStateFalse = { logged_in: false };
const mockStoreFalse = getMockStore(initialArticlesState, initialCommentsState, initialUserStateFalse);

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


describe('<EditArticle />', () => {
	let articleEdit, articleEditFalse, articleEditUserDict, articleEditWithoutSelect, spyGetLoginStatus, spyEditArticle, spyGetArticle, spyHistoryGoBack;

	const defaultProps = {
        match: { params: { id: 1 } },
    };
	beforeEach(() => {
		articleEdit = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleEdit {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articleEditFalse = (
			<Provider store={mockStoreFalse}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleEdit {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		articleEditUserDict = (
			<Provider store={mockStoreUserDict}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleEdit {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);

		articleEditWithoutSelect = (
			<Provider store={mockStoreWithoutSelect}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <ArticleEdit {...defaultProps} history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);

		spyGetArticle = jest.spyOn(actionCreatorsBlog, 'getArticle')
			.mockImplementation((id) => { return dispatch => {}; });


		spyGetLoginStatus = jest.spyOn(actionCreatorsUser, 'getLoginStatus')
			.mockImplementation((id) => { return dispatch => {}; });


		spyEditArticle = jest.spyOn(actionCreatorsBlog, 'editArticle')
			.mockImplementation((atc) => { return dispatch => {}; });

		spyHistoryGoBack = jest.spyOn(history, 'goBack')
			.mockImplementation(path => {});

	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {
		const component = mount(articleEdit);
		const wrapper = component.find('.EditArticle');
		expect(wrapper.length).toBe(1);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
		expect(spyGetArticle).toHaveBeenCalledTimes(1);
		const articleEditInstance = component.find(ArticleEdit.WrappedComponent).instance();
		expect(articleEditInstance.state.title).toEqual('TEST_TITLE_1');
		expect(articleEditInstance.state.content).toEqual('TEST_CONTENT_1');
	});


	it('should render without errors when selectedArticle is null', () => {
		const component = mount(articleEditWithoutSelect);
		const wrapper = component.find('.EditArticle');
		expect(wrapper.length).toBe(1);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
		expect(spyGetArticle).toHaveBeenCalledTimes(1);
		const articleEditInstance = component.find(ArticleEdit.WrappedComponent).instance();
		expect(articleEditInstance.state.title).toEqual("");
		expect(articleEditInstance.state.author_id).toEqual("");
		expect(articleEditInstance.state.content).toEqual("");
	});


	it(`should redirect to login when logged_in=false`, () => {
		const spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});
		const component = mount(articleEditFalse);
		expect(spyHistoryPush).toHaveBeenCalledWith('/login');
	});

	it(`should not call getUsersName when userDict exists`, () => {
		const spyGetUsersName = jest.spyOn(actionCreatorsUser, 'getUsersName')
			.mockImplementation(() => { return dispatch => {}; });
		const component = mount(articleEditUserDict);
		expect(spyGetUsersName).toHaveBeenCalledTimes(0);
	});

	it(`should set state properly on title`, () => {
		const title = "TEST_TITLE_EDIT";
		const component = mount(articleEdit);
		const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', { target: {value: title}});
		const articleEditInstance = component.find(ArticleEdit.WrappedComponent).instance();
		expect(articleEditInstance.state.title).toEqual(title);
		expect(articleEditInstance.state.content).toEqual('TEST_CONTENT_1');
	});

	it(`should set state properly on content`, () => {
		const content = "TEST_CONTENT_EDIT";
		const component = mount(articleEdit);
		const contentWrapper = component.find('#article-content-input');
		contentWrapper.simulate('change', { target: {value: content}});
		const articleEditInstance = component.find(ArticleEdit.WrappedComponent).instance();
		expect(articleEditInstance.state.title).toEqual('TEST_TITLE_1');
		expect(articleEditInstance.state.content).toEqual(content);
	});

	it(`should redirect to articles when back button is clicked on`, () => {
		const component = mount(articleEdit);
		const wrapper = component.find('#back-edit-article-button');
		wrapper.simulate('click');
		expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
	});

	it(`should disabled 'onEditArticle'`, () => {
		const component = mount(articleEdit);
		const wrapper = component.find('#confirm-edit-article-button');
		const contentWrapper = component.find('#article-content-input');
		contentWrapper.simulate('change', { target: {value: ""}});
		wrapper.simulate('click');
		expect(spyEditArticle).toHaveBeenCalledTimes(0);
	});

	it(`should call 'onEditArticle'`, () => {
		const component = mount(articleEdit);
		const wrapper = component.find('#confirm-edit-article-button');
		const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', { target: {value: "TEST_TITLE_EDIT"}});
		const contentWrapper = component.find('#article-content-input');
		contentWrapper.simulate('change', { target: {value: "TEST_CONTENT_EDIT"}});
		wrapper.simulate('click');
		expect(spyEditArticle).toHaveBeenCalledTimes(1);
	});

	it(`should set state preview=true when preview tab button is clicked on`, () => {
		const component = mount(articleEdit);
		const previewWrapper = component.find('#preview-tab-button');
		previewWrapper.simulate('click');
		const wrapper = component.find('.spyArticle');
		expect(wrapper.length).toBe(1);
	});

	it(`should set state preview=false when write tab button is clicked on`, () => {
		const component = mount(articleEdit);
		const previewWrapper = component.find('#preview-tab-button');
		previewWrapper.simulate('click');
		const writeWrapper = component.find('#write-tab-button');
		writeWrapper.simulate('click');
		const wrapper = component.find('.spyArticle');
		expect(wrapper.length).toBe(0);
	});

    it('should confirm "Change will be lost" when title or value is changed and click yes', () => {
        const spyConfirm = jest.spyOn(window, 'confirm')
            .mockImplementation(jest.fn(() => true));
        const title = 'TEST_EDIT_TITLE'
        const component = mount(articleEdit);
        const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', {target: {value: 'TEST_TITLE_EDIT'}})
        const wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(1);
        expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
	});


    it('should confirm "Change will be lost" when title or value is changed and click no', () => {
        const spyConfirm = jest.spyOn(window, 'confirm')
            .mockImplementation(jest.fn(() => false));
        const title = 'TEST_EDIT_TITLE'
        const component = mount(articleEdit);
        const titleWrapper = component.find('#article-title-input');
		titleWrapper.simulate('change', {target: {value: 'TEST_TITLE_EDIT'}})
        const wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(1);
        expect(spyHistoryGoBack).toHaveBeenCalledTimes(0);
	});


    it('should confirm nothing when title or value is not changed', () => {
        const spyConfirm = jest.spyOn(window, 'confirm')
            .mockImplementation(jest.fn(() => false));
        const component = mount(articleEdit);
        const wrapper = component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(spyConfirm).toHaveBeenCalledTimes(0);
        expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
	});
});
