import * as actionTypes from '../actions/actionTypes';

const initialState = {
	articles: [
	],
	selectedArticle: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.GET_ALL:
			return {...state, articles: action.articles };

		case actionTypes.GET_ARTICLE:
			return {...state, selectedArticle: action.target };

		case actionTypes.ADD_ARTICLE:
			const newArticle = {
				id: action.id,
				title: action.title,
				author_id: action.author_id,
				content: action.content,
			}
			return {...state, articles: [...state.articles, newArticle]};

		case actionTypes.EDIT_ARTICLE:
			const editArticle = {
				id: action.id,
				title: action.title,
				author_id: action.author_id,
				content: action.content,
			}
			const notedited = state.articles.filter((atc) => {
				return atc.id !== action.id;
			});
			return {...state, articles: [...notedited, editArticle]};

		case actionTypes.DELETE_ARTICLE:
			const deleted = state.articles.filter((atc) => {
				return atc.id !== action.targetID;
			});
			return { ...state, articles: deleted };
		default:
			break;
	}
	return state;
};

export default reducer;
