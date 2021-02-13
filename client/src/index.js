import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import axios from 'axios';
window.axios = axios;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {},composeEnhancers( applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store = {store}>
<App/>
</Provider>
, document.querySelector("#root"));


