import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import blogReducer from './reducers/blog';
import userReducer from './reducers/user';
import commentReducer from './reducers/comments';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    blogReducer: blogReducer,
    userReducer: userReducer,
    commentReducer: commentReducer,
    router: connectRouter(history)
});
export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)));

export default store;
