import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE } from './types';

import OpenWeatherMap from '../../../service/openWeatherMap';

export function removeCity (id) {
    return {
        type: CITY_REMOVE,
        id
    }
}

export function requestWeather () {
    return {
        type: WEATHER_REQUEST
    }
}

export function receiveWeather (list) {
    return {
        type: WEATHER_RECEIVE,
        list
    }
}

export function getWeather (data) {
    return function (dispatch) {
        dispatch(requestWeather());

        return OpenWeatherMap.getTemp(data)
            .then((response) => {
                return response.hasOwnProperty('list') ?
                    dispatch(receiveWeather(response.list)) :
                    console.log(response);
            });
    }
}
