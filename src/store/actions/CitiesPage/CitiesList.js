import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE, CHANGE_STATUS } from './types';

import OpenWeatherMap from '../../../service/openWeatherMap';

const requestWeather = () => ({
    type: WEATHER_REQUEST
});

const receiveWeather = list => ({
    type: WEATHER_RECEIVE,
    list
});

const getWeather = data => dispatch => {
    dispatch(requestWeather());

    return OpenWeatherMap.getTemp(data)
        .then(response => (
            response.hasOwnProperty('list') ?
            dispatch(receiveWeather(response.list)) :
            console.log(response)
        ));
};

const changeCityStatus = (id, status) => ({
    type: CHANGE_STATUS,
    id,
    status
});

const removeCity = id => ({
    type: CITY_REMOVE,
    id
});

export {
    getWeather,
    changeCityStatus,
    removeCity
}
