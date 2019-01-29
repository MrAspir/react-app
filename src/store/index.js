import { combineReducers } from 'redux';

import cities from './reducers/cities';

const reducer = combineReducers({
    cities
});

export default reducer;
