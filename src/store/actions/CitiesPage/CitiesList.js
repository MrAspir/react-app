import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE } from './types';

import OpenWeatherMap from '../../../service/openWeatherMap';

const removeCity = (id) => {
    return {
        type: CITY_REMOVE,
        id
    }
};

const requestWeather = () => {
    return {
        type: WEATHER_REQUEST
    }
};

const receiveWeather = (list) => {
    return {
        type: WEATHER_RECEIVE,
        list
    }
};

const getWeather = (data) => {
    return function (dispatch) {
        dispatch(requestWeather());

        return OpenWeatherMap.getTemp(data)
            .then((response) => {
                return response.hasOwnProperty('list') ?
                    dispatch(receiveWeather(response.list)) :
                    console.log(response);
            });
    }
};

export {
    removeCity,
    requestWeather,
    receiveWeather,
    getWeather
}
