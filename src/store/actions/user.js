import * as actionTypes from './actionTypes';
import axios from 'axios';

export const userLogin_ = (user) => {
	return {
		type: actionTypes.LOGIN,
		id: 1,
	};
};

export const userLogin = (id) => {
	return (dispatch) => {
		return axios.patch('/api/user/'+ id, {logged_in: true})
			.then(res => { dispatch(userLogin_(res)); });
	};
};


export const userLogout_ = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const userLogout = (id) => {
	return (dispatch) => {
		return axios.patch('/api/user/'+ id, {logged_in: false})
			.then(res => { dispatch(userLogout_()); });
	};
};

export const getLoginStatus_ = (user) => {
	return {
		type: actionTypes.CHECK_LOGIN,
		id: user.id,
		name: user.name,
		logged_in: user.logged_in
	};
};

export const getLoginStatus = (id) => {
	return (dispatch) => {
		return axios.get('/api/user/' + id)
		.then(res => dispatch(getLoginStatus_(res.data)));
	};
}

export const getUsersName_ = (users) => {
	return {
		type: actionTypes.GET_USERS_NAME,
		users: users
	};
}

export const getUsersName = () => {
	return (dispatch) => {
		return axios.get('/api/user/')
		.then(res => dispatch(getUsersName_(res.data)));
	};
}


