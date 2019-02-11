import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faHistory, faCalendarPlus, faCalendarCheck, faBookmark, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

import reducer from './store';

import { saveState } from './service/localStorage';

import App from './components/App';

library.add(faTrashAlt, faHistory, faCalendarPlus, faCalendarCheck, faBookmark, faPlusSquare);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
   saveState('cityList', store.getState().cities.list);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
