import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import blogReducer from './store/reducers/blog';
import userReducer from './store/reducers/user';
import commentReducer from './store/reducers/comments';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const rootReducer = combineReducers({
    blogReducer: blogReducer,
    userReducer: userReducer,
    commentReducer: commentReducer,
    router: connectRouter(history)
});

const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));

ReactDOM.render( <Provider store={store}> <App history={history} /> </Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
