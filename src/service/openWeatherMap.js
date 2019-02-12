import axios from 'axios';

import config from '../config';

class OpenWeatherMap {
    async axios (request) {
        try {
            const response = await axios.get(request);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    setParams (data) {
        return `id=${data.map(params => params.id).join(',')}&units=metric&appid=${config.openWeatherMap.apiKey}`;
    }

    async getTemp (data) {
        const chunk = 20;

        let response = [];

        for (let i = 0; i < data.length; i += chunk) {
            const responseTmp = await this.axios(`${config.openWeatherMap.host}/data/2.5/group?${this.setParams(data.slice(i, i + chunk))}`);

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
}

export default new OpenWeatherMap();
