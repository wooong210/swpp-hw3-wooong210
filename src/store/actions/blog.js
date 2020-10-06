import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios';

export const getArticles_ = (articles) => {
	return {type: actionTypes.GET_ALL, articles: articles };
};

export const getArticles = () => {
	return (dispatch) => {
		return axios.get('/api/articles')
			.then(res => dispatch(getArticles_(res.data)))
			.catch(error => console.log(error.response.data));
		};
}

export const postArticle_ = (atc) => {
	return {
		type: actionTypes.ADD_ARTICLE,
		id: atc.id,
		title: atc.title,
		author_id: atc.author_id,
		content: atc.content
	};
};

export const postArticle = (atc) => {
	return (dispatch) => {
		return axios.post('/api/articles/', atc)
			.then(res => dispatch(postArticle_(res.data)))
			.then(res => dispatch(push('/articles/' + res.id)))
			.catch(error => console.log(error.response.data));
	};
};

export const getArticle_ = (atc) => {
	return {
		type: actionTypes.GET_ARTICLE,
		target: atc
	};
};

export const getArticle = (id) => {
	return (dispatch) => {
		return axios.get('/api/articles/'+ id)
			.then(res => dispatch(getArticle_(res.data)))
			.catch(error => console.log(error.response.data));
	};
};

export const editArticle_ = (atc) => {
	return {
		type: actionTypes.EDIT_ARTICLE,
		id: atc.id,
		title: atc.title,
		author_id: atc.author_id,
		content: atc.content,
	};
};

export const editArticle = (atc) => {
	return (dispatch) => {
		return axios.put('/api/articles/' + atc.id, atc)
			.then(res => dispatch(editArticle_(res.data)))
			.then(res => dispatch(push('/articles/' + res.id)))
			.catch(error => console.log(error.response.data));
	}
}


export const deleteArticle_ = (id) => {
	return {
		type: actionTypes.DELETE_ARTICLE,
		targetID: id
	};
};

export const deleteArticle = (id) => {
	return (dispatch) => {
		return axios.delete('/api/articles/'+ id)
			.then(() => { dispatch(deleteArticle_(id)) });
	};
};
