import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { history, middlewares } from '../store/store';
import * as actionTypes from '../store/actions/actionTypes';

const getMockArticlesReducer = jest.fn(
	initialState => (state = initialState, action) => {
	  switch (action.type) {
		default:
		  break;
	  }
	  return state;
	}
  );

  const getMockCommentsReducer = jest.fn(
	  initialState => (state = initialState, action) => {
		switch (action.type) {
		  default:
			break;
		}
		return state;
	}
  );

  const getMockUserReducer = jest.fn(
  initialState => (state = initialState, action) => {
	  switch (action.type) {
	  default:
		  break;
	  }
	  return state;
	}
  );

export const getMockStore = (initialArticlesState, initialCommentsState, initialUserState) => {
  const mockArticlesReducer = getMockArticlesReducer(initialArticlesState);
  const mockCommentsReducer = getMockCommentsReducer(initialCommentsState);
  const mockUserReducer = getMockUserReducer(initialUserState);
  const rootReducer = combineReducers({
    blogReducer: mockArticlesReducer,
    commentReducer: mockCommentsReducer,
	userReducer: mockUserReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}
