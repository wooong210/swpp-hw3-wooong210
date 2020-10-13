import React, { useReducer } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreatorsUser from '../../store/actions/user';


const initialArticlesState = { articles: [], selectedArticle: null };
const initialCommentsState = { comments: [], selectedComment: null };
const initialUserState = { logged_in: false };
const mockStore = getMockStore(initialArticlesState, initialCommentsState, initialUserState);

const initialUserStateUserLogin = { logged_in: true };
const mockStoreUserLogin = getMockStore(initialArticlesState, initialCommentsState, initialUserStateUserLogin);

const initialUserStateUserDict = { logged_in: true , userDict: {1: "test1", 2: "test2", 3:"test3"}};
const mockStoreUserDict = getMockStore(initialArticlesState, initialCommentsState, initialUserStateUserDict);


describe('<Login />', () => {
	let login, loginUserAlreadyLogin, loginUserDict, spyGetLoginStatus, spyGetUsersName, spyHistoryPush;
    window.alert = jest.fn();

	beforeEach(() => {
		login = (
			<Provider store={mockStore}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Login history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		loginUserAlreadyLogin = (
			<Provider store={mockStoreUserLogin}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Login history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		loginUserDict = (
			<Provider store={mockStoreUserDict}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path='/' exact
							render={() => <Login history={history}/>} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
		spyGetLoginStatus = jest.spyOn(actionCreatorsUser, 'getLoginStatus')
			.mockImplementation((id) => { return dispatch => {}; });

		spyGetUsersName = jest.spyOn(actionCreatorsUser, 'getUsersName')
			.mockImplementation(() => { return dispatch => {}; });

		spyHistoryPush = jest.spyOn(history, 'push')
			.mockImplementation(path => {});

		// spyUserLogin = jest.spyOn(actionCreatorsUser, 'userLogin')
		// 	.mockImplementation(() => { return dispatch => {}; });
	})

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render without errors', () => {
		const component = mount(login);
		const wrapper = component.find('.Login');
		expect(wrapper.length).toBe(1);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
		expect(spyGetUsersName).toHaveBeenCalledTimes(1);
	});

	it('should render without errors when uerdict exists', () => {
		const component = mount(loginUserDict);
		const wrapper = component.find('.Login');
		expect(wrapper.length).toBe(1);
		expect(spyGetLoginStatus).toHaveBeenCalledTimes(1);
		expect(spyGetUsersName).toHaveBeenCalledTimes(0);
	});
	it(`should redirect to login when logged_in=true`, () => {
		const component = mount(loginUserAlreadyLogin);
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles');
	});

	it(`should set state properly on email`, () => {
		const component = mount(login);
		const titleWrapper = component.find('#email-input');
		titleWrapper.simulate('change', { target: {value: "TEST_EMAIL"}});
		const loginInstance = component.find(Login.WrappedComponent).instance();
		expect(loginInstance.state.email).toEqual('TEST_EMAIL');
		expect(loginInstance.state.password).toEqual('');
	});

	it(`should set state properly on password`, () => {
		const component = mount(login);
		const passwordWrapper = component.find('#pw-input');
		passwordWrapper.simulate('change', { target: {value: "TEST_PASSWORD"}});
		const loginInstance = component.find(Login.WrappedComponent).instance();
		expect(loginInstance.state.email).toEqual('');
		expect(loginInstance.state.password).toEqual('TEST_PASSWORD');
	});

	it(`should call clickLoginHandler when input is wrong`, () => {
		const component = mount(login);
		const titleWrapper = component.find('#email-input');
		titleWrapper.simulate('change', { target: {value: "TEST_EMAIL"}});
		const passwordWrapper = component.find('#pw-input');
		passwordWrapper.simulate('change', { target: {value: "TEST_PASSWORD"}});
		const wrapper = component.find('#login-button');
		wrapper.simulate('click');
		const loginInstance = component.find(Login.WrappedComponent).instance();
		expect(loginInstance.state.email).toEqual('');
		expect(loginInstance.state.password).toEqual('');
	});

	it(`should call clickLoginHandler when input is true`, () => {
		const component = mount(login);
		const titleWrapper = component.find('#email-input');
		titleWrapper.simulate('change', { target: {value: "swpp@snu.ac.kr"}});
		const passwordWrapper = component.find('#pw-input');
		passwordWrapper.simulate('change', { target: {value: "iluvswpp"}});
		const wrapper = component.find('#login-button');
		wrapper.simulate('click');
		expect(spyHistoryPush).toHaveBeenCalledWith('/articles');
	});
});
