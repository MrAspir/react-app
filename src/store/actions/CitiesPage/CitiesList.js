import { CITY_REMOVE, CITY_STATUS, WEATHER_REQUEST, WEATHER_RECEIVE } from './types';

import OpenWeatherMap from '../../../service/OpenWeatherMap';

const weatherRequest = () => ({
    type: WEATHER_REQUEST
});

const weatherReceive = list => ({
    type: WEATHER_RECEIVE,
    list
});

const cityStatus = (id, status) => ({
    type: CITY_STATUS,
    id,
    status
});

const cityRemove = id => ({
    type: CITY_REMOVE,
    id
});

const getWeather = data => async dispatch => {
    dispatch(weatherRequest());
    dispatch(weatherReceive(await OpenWeatherMap.getAll(data)));
};

export {
    cityStatus,
    cityRemove,
    getWeather
};
