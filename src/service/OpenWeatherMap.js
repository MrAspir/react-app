import axios from 'axios';

import config from '../config';

const { openWeatherMap: { host } } = config;

const options  = {
    units: 'metric',
    appid: config.openWeatherMap.apiKey
};

class OpenWeatherMap {
    async axios (route, params) {
        try {
            const response = await axios.get(host + route + this.setParams(params));

            return response.data;
        } catch (err) {
            return undefined;
        }
    }

    setParams (params) {
        return `?${Object.entries({ ...params, ...options })
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
    }

    async getAll (data) {
        const chunk = 20;

        let response = [];

        for (let i = 0; i < data.length; i += chunk) {
            const responseTmp = await this.axios('/group', {
                id: data.slice(i, i + chunk).map(city => city.id).join(',')
            });

            if (!responseTmp) {
                continue;
            }

            response = [
                ...response,
                ...responseTmp.list
            ];
        }

        return response;
    }

    async getOne (cityName) {
        return await this.axios('/weather', {
            q: cityName
        });
    }
}

export default new OpenWeatherMap();
