import { CITY_ADD, SEARCH_REQUEST, SEARCH_RECEIVE, SEARCH_CLEAR } from './types';

import OpenWeatherMap from '../../../service/OpenWeatherMap';

const searchRequest = () => ({
    type: SEARCH_REQUEST
});

const searchReceive = response => ({
    type: SEARCH_RECEIVE,
    response
});

const searchClear = () => ({
    type: SEARCH_CLEAR
});

const cityAdd = (city) => ({
    type: CITY_ADD,
    city
});

const search = name => async dispatch => {
    dispatch(searchRequest());
    dispatch(searchReceive(await OpenWeatherMap.getOne(name)));
};

const addCity = (city) => async dispatch => {
    dispatch(await cityAdd(city));
    dispatch(searchClear());
};

export {
    search,
    searchClear,
    addCity
};
