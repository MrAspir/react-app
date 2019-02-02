import axios from 'axios';

import config from '../config';

class OpenWeatherMap {
    static axios (request) {
        return axios.get(request)
            .then(response => response.data)
            .catch(error => error);
    }

    static setParams (data) {
        return `id=${data.map(params => params.id).join(',')}&units=metric&appid=${config.openWeatherMap.apiKey}`;
    }

    static getTemp (data) {
        return this.axios(`${config.openWeatherMap.host}/data/2.5/group?${this.setParams(data)}`);
    }
}

export default OpenWeatherMap;
