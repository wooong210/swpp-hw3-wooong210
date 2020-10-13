import axios from 'axios';

import * as actionCreators from './user'
import store from '../store';

const stubUser = {id: 1, email: 'TEST_EMAIL_1', password: 'TEST_PW_1', name: 'TEST_NAME_1', logged_in: false};
const stubUserLogin = {id: 1, email: 'TEST_EMAIL_1', password: 'TEST_PW_1', name: 'TEST_NAME_1', logged_in: true};

const stubUsers = [
	{id: 1, email: 'TEST_EMAIL_1', password: 'TEST_PW_1', name: 'TEST_NAME_1', logged_in: false},
	{id: 2, email: 'TEST_EMAIL_2', password: 'TEST_PW_2', name: 'TEST_NAME_2', logged_in: false},
	{id: 3, email: 'TEST_EMAIL_3', password: 'TEST_PW_3', name: 'TEST_NAME_3', logged_in: false}
]

const stubUserDict = {
	1: 'TEST_NAME_1',
	2: 'TEST_NAME_2',
	3: 'TEST_NAME_3'
};

describe('ActionCreators', () => {
	afterEach(() => {
		jest.clearAllMocks();
	})

	it(`'userLogin' should toggle logged_in correctly`, (done) => {

		const spy = jest.spyOn(axios, 'patch')
			.mockImplementation((url, atc) => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubUser
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.userLogin(1)).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'userLogout' should toggle logged_in correctly`, (done) => {

		const spy = jest.spyOn(axios, 'patch')
			.mockImplementation((url, atc) => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubUserLogin
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.userLogout(1)).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'getLoginStatus' should fetch logged_in correctly`, (done) => {

		const spy = jest.spyOn(axios, 'get')
			.mockImplementation((url, atc) => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubUserLogin
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.getLoginStatus(1)).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'getUsersName' should fetch userDict correctly`, (done) => {

		const spy = jest.spyOn(axios, 'get')
			.mockImplementation(url => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubUsers
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.getUsersName()).then(() => {
			const newState = store.getState();
			expect(newState.userReducer.userDict).toStrictEqual(stubUserDict);
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});
});
