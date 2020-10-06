import * as actionTypes from '../actions/actionTypes';

const initialState = {
	comments: [
	],
	selectedComment: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {

		case actionTypes.GET_ALL_COMMENT:
			return {...state, comments: action.comments };

		case actionTypes.GET_COMMENT:
			return {...state, selectedComment: action.target };

		case actionTypes.ADD_COMMENT:
			const newComment = {
				id: action.id,
				article_id: action.article_id,
				author_id: action.author_id,
				content: action.content,
			}
			return {...state, comments: [...state.comments, newComment]};

		case actionTypes.EDIT_COMMENT:
			const editComment = {
				id: action.id,
				article_id: action.article_id,
				author_id: action.author_id,
				content: action.content,
			}
			const notedited = state.comments.filter((cmt) => {
				return cmt.id !== action.id;
			});
			return {...state, comments: [...notedited, editComment]};

		case actionTypes.DELETE_COMMENT:
			const deleted = state.comments.filter((atc) => {
				return atc.id !== action.targetID;
			});
			return { ...state, comments: deleted };
		default:
			break;
	}
	return state;
};

export default reducer;
