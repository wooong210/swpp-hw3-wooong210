import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getComments_ = (comments) => {
	return {type: actionTypes.GET_ALL_COMMENT, comments: comments };
};

export const getComments = () => {
	return (dispatch) => {
		return axios.get('/api/comments')
			.then(res => dispatch(getComments_(res.data)))
			.catch(error => console.log(error.response.data));
		};
}

export const postComment_ = (cmt) => {
	return {
		type: actionTypes.ADD_COMMENT,
		id: cmt.id,
		article_id: cmt.article_id,
		author_id: cmt.author_id,
		content: cmt.content
	};
};

export const postComment = (cmt) => {
	return (dispatch) => {
		return axios.post('/api/comments/', cmt)
			.then(res => dispatch(postComment_(res.data)))
			.catch(error => console.log(error.response.data));
	};
};

export const getComment_ = (cmt) => {
	return {
		type: actionTypes.GET_COMMENT,
		target: cmt
	};
};

export const getComment = (id) => {
	return (dispatch) => {
		return axios.get('/api/comments/'+ id)
			.then(res => dispatch(getComment_(res.data)))
			.catch(error => console.log(error.response.data));
	};
};

export const editComment_ = (cmt) => {
	return {
		type: actionTypes.EDIT_COMMENT,
		id: cmt.id,
		article_id: cmt.article_id,
		author_id: cmt.author_id,
		content: cmt.content
	};
};

export const editComment = (cmt) => {
	return (dispatch) => {
		return axios.put('/api/comments/' + cmt.id, cmt)
			.then(res => dispatch(editComment_(res.data)))
			.catch(error => console.log(error.response.data));
	}
}


export const deleteComment_ = (id) => {
	return {
		type: actionTypes.DELETE_COMMENT,
		targetID: id
	};
};

export const deleteComment = (id) => {
	return (dispatch) => {
		return axios.delete('/api/comments/'+ id)
			.then(() => { dispatch(deleteComment_(id)) });
	};
};
