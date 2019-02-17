import { CITY_ADD, LIVE_SEARCH_REQUEST, LIVE_SEARCH_RECEIVE, LIVE_SEARCH_REMOVE } from './types';

import OpenWeatherMap from '../../../service/OpenWeatherMap';

const liveSearchRequest = () => ({
    type: LIVE_SEARCH_REQUEST
});

const liveSearchReceive = response => ({
    type: LIVE_SEARCH_RECEIVE,
    response
});

const liveSearchRemove = () => ({
    type: LIVE_SEARCH_REMOVE
});

const cityAdd = (city) => ({
    type: CITY_ADD,
    city
});

const liveSearch = name => async dispatch => {
    dispatch(liveSearchRequest());
    dispatch(liveSearchReceive(await OpenWeatherMap.getWeather(name)));
};

const addCity = (city) => async dispatch => {
    dispatch(await cityAdd(city));
    dispatch(liveSearchRemove());
};

export {
    liveSearch,
    liveSearchRemove,
    addCity
}
