import axios from 'axios';

import * as actionCreators from './comments'
import store from '../store';

const stubComment = {id: 1, article_id: 1, author_id: 2, content: 'TEST_COMMENT_1'};

describe('ActionCreators', () => {
	afterEach(() => {
		jest.clearAllMocks();
	})

	it(`'getComments' should fetch comments correctly`, (done) => {
		const stubCommentList = [stubComment];

		const spy = jest.spyOn(axios, 'get')
			.mockImplementation(url => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubCommentList
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.getComments()).then(() => {
			const newState = store.getState();
			expect(newState.commentReducer.comments).toBe(stubCommentList);
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'postComment' should post comment correctly`, (done) => {
		const stubCommentList = [stubComment];

		const spy = jest.spyOn(axios, 'post')
			.mockImplementation((url, atc) => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubComment
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.postComment(stubComment)).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'getComment' should fetch comment correctly`, (done) => {
		const spy = jest.spyOn(axios, 'get')
			.mockImplementation(url => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubComment
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.getComment()).then(() => {
			const newState = store.getState();
			expect(newState.commentReducer.selectedComment).toBe(stubComment);
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'editArticle' should edit comment correctly`, (done) => {
		const spy = jest.spyOn(axios, 'put')
			.mockImplementation(url => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: stubComment
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.editComment(stubComment)).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it(`'deleteArticle' should delete comment correctly`, (done) => {
		const spy = jest.spyOn(axios, 'delete')
			.mockImplementation(url => {
			return new Promise((resolve, reject) => {
				const result = {
					status: 200,
					data: null
				};
				resolve(result);
			});
		})

		store.dispatch(actionCreators.deleteComment()).then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
	});


});
