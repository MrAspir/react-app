import axios from 'axios';

import config from '../config';

const params  = {
    units: 'metric',
    appid: config.openWeatherMap.apiKey
};

const { openWeatherMap: { host } } = config;

class OpenWeatherMap {
    async axios (route, options) {
        try {
            const response = await axios.get(host + route + this.setParams(options));

            return response.data;
        } catch (err) {
            return undefined;
        }
    }

    setParams (options) {
        return `?${Object.entries({ ...options, ...params })
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
    }

    async getAllWeather (data) {
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

    async getWeather (cityName) {
        return await this.axios('/weather', {
            q: cityName
        });
    }
}

export default new OpenWeatherMap();
