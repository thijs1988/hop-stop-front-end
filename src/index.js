import './react/App.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from "react-router-redux";
import {Route, Switch} from "react-router";
import App from './react/components/App';
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import {tokenMiddleware} from "./middleware";

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, tokenMiddleware));
const history = createHistory();
ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
                <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

