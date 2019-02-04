import Immutable from 'seamless-immutable';

import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE, DATA_REFRESH } from '../actions/CitiesPage/types';

import { loadState } from '../../service/localStorage';

import config from '../../config';

const initialState = Immutable({
    isFetching: false,
    isLoaded: false,
    list: [
        {
            id: 3183875,
            name: 'Tirana',
            country: 'AL'
        },
        {
            id: 3041563,
            name: 'Andorra la Vella',
            country: 'AD'
        },
        {
            id: 616051,
            name: 'Yerevan',
            country: 'AM'
        },
        {
            id: 2761369,
            name: 'Vienna',
            country: 'AT'
        },
        {
            id: 587084,
            name: 'Baku',
            country: 'AZ'
        },
        {
            id: 625144,
            name: 'Minsk',
            country: 'BY'
        },
        {
            id: 2800866,
            name: 'Brussels',
            country: 'BE'
        },
        {
            id: 3191281,
            name: 'Sarajevo',
            country: 'BA'
        },
        {
            id: 727011,
            name: 'Sofia',
            country: 'BG'
        },
        {
            id: 3186886,
            name: 'Zagreb',
            country: 'HR'
        },
        {
            id: 146268,
            name: 'Nicosia',
            country: 'CY'
        },
        {
            id: 3067696,
            name: 'Prague',
            country: 'CZ'
        },
        {
            id: 2618425,
            name: 'Copenhagen',
            country: 'DK'
        },
        {
            id: 588409,
            name: 'Tallinn',
            country: 'EE'
        },
        {
            id: 658225,
            name: 'Helsinki',
            country: 'FI'
        },
        {
            id: 2988507,
            name: 'Paris',
            country: 'FR'
        },
        {
            id: 611717,
            name: 'Tbilisi',
            country: 'GE'
        },
        {
            id: 2950159,
            name: 'Berlin',
            country: 'DE'
        },
        {
            id: 264371,
            name: 'Athens',
            country: 'GR'
        },
        {
            id: 3054643,
            name: 'Budapest',
            country: 'HU'
        }
    ]
});

const appCities = (
    state = {
        ...initialState,
        list: loadState('cityList') || initialState.list
    },
    action
) => {
    console.log(state);

    switch (action.type) {
        case CITY_REMOVE:
            return {
                ...state,
                list: state.list.filter(city => city.id !== action.id)
            };
        case WEATHER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case WEATHER_RECEIVE:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                list: state.list.map(city => {
                    console.log(action.list);

                    const item = action.list.find(item => city.id === item.id);

                    console.log(item);

                    return {
                        ...city,
                        weather: {
                            clouds: {
                                description: item.weather[0].description,
                                icon: `${config.openWeatherMap.icon}/${item.weather[0].icon}.png`
                            },
                            temp: item.main.temp
                        }
                    }
                })
            };
        default:
            return state;
    }
};

const cities = (state, action) => {
    switch (action.type) {
        case DATA_REFRESH:
            localStorage.removeItem('cityList');

            console.log(localStorage.getItem('cityList'));

            return appCities(undefined, action);
        default:
            return appCities(state, action);
    }
};

export default cities;
