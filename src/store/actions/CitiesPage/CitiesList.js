import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE, CHANGE_STATUS } from './types';

import OpenWeatherMap from '../../../service/OpenWeatherMap';

const requestWeather = () => ({
    type: WEATHER_REQUEST
});

const receiveWeather = list => ({
    type: WEATHER_RECEIVE,
    list
});

const changeCityStatus = (id, status) => ({
    type: CHANGE_STATUS,
    id,
    status
});

const removeCity = id => ({
    type: CITY_REMOVE,
    id
});

const getWeather = data => async dispatch => {
    dispatch(requestWeather());
    dispatch(receiveWeather(await OpenWeatherMap.getAllWeather(data)));
};

export {
    getWeather,
    changeCityStatus,
    removeCity
}
