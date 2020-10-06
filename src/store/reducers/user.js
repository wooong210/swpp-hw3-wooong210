import * as actionTypes from '../actions/actionTypes';

const initialState = {
	logged_in: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.LOGIN:
			return {...state, logged_in: true, id: action.id };

		case actionTypes.LOGOUT:
			return {...state, logged_in: false, id: '', name: '' };

		case actionTypes.CHECK_LOGIN:
			return { ...state, logged_in: action.logged_in, id: action.id, name: action.name };

		case actionTypes.GET_USERS_NAME:
			let userDict = {};
			action.users.forEach((user) => userDict[user.id] = user.name );
			return { ...state, userDict: userDict };
		default:
			break;
	}
	return state;
};

export default reducer;
