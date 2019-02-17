import Immutable from 'seamless-immutable';

import LocalStorage from '../../service/LocalStorage';

import { isVisited, isGoingToVisit } from '../../store/actions/CitiesPage/status';

import { CITY_ADD, CITY_REMOVE, CITY_STATUS, WEATHER_REQUEST, WEATHER_RECEIVE, SEARCH_REQUEST, SEARCH_RECEIVE,
    SEARCH_CLEAR, DATA_REFRESH } from '../actions/CitiesPage/types';

import config from '../../config';

const { openWeatherMap } = config;

const initialState = Immutable({
    isFetching: false,
    isLoaded: false,
    isSearching: false,
    isFound: false,
    list: [
        {
            id: 3183875,
            name: 'Tirana',
            country: 'AL',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 3041563,
            name: 'Andorra la Vella',
            country: 'AD',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 616051,
            name: 'Yerevan',
            country: 'AM',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 2761369,
            name: 'Vienna',
            country: 'AT',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 587084,
            name: 'Baku',
            country: 'AZ',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 625144,
            name: 'Minsk',
            country: 'BY',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 2800866,
            name: 'Brussels',
            country: 'BE',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 3191281,
            name: 'Sarajevo',
            country: 'BA',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 727011,
            name: 'Sofia',
            country: 'BG',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 3186886,
            name: 'Zagreb',
            country: 'HR',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 146268,
            name: 'Nicosia',
            country: 'CY',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 3067696,
            name: 'Prague',
            country: 'CZ',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 2618425,
            name: 'Copenhagen',
            country: 'DK',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 588409,
            name: 'Tallinn',
            country: 'EE',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 658225,
            name: 'Helsinki',
            country: 'FI',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 2988507,
            name: 'Paris',
            country: 'FR',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 611717,
            name: 'Tbilisi',
            country: 'GE',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 2950159,
            name: 'Berlin',
            country: 'DE',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 264371,
            name: 'Athens',
            country: 'GR',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        },
        {
            id: 3054643,
            name: 'Budapest',
            country: 'HU',
            status: {
                [isVisited]: false,
                [isGoingToVisit]: false
            }
        }
    ],
    search: {}
});

const appWeather = (state, action) => {
    switch (action.type) {
        case WEATHER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isLoaded: false
            };
        case WEATHER_RECEIVE:
            return {
                ...state,
                isFetching: false,
                isLoaded: true,
                list: state.list.map(city => {
                    const item = action.list.find(item => city.id === item.id);

                    if (!item) {
                        return {
                            ...city,
                            weather: {
                                clouds: {
                                    status: 0,
                                    description: '',
                                    icon: ''
                                },
                                temp: 0
                            }
                        };
                    }

                    const { main: { temp }, clouds: { all }, weather: { 0: { description, icon } } } = item;

                    return {
                        ...city,
                        weather: {
                            temp,
                            clouds: {
                                all,
                                description,
                                icon: `${openWeatherMap.icon}/${icon}.png`
                            }
                        }
                    };
                })
            };
        default:
            return state;
    }
};

const appSearch = (state, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                isSearching: true,
                isFound: false
            };
        case SEARCH_RECEIVE:
            const { response } = action;

            if (!response) {
                return {
                    ...state,
                    isSearching: false,
                    isFound: true,
                    search: {}
                }
            }

            const {
                id,
                name,
                sys: { country },
                coord: { lat, lon },
                main: { temp },
                clouds: { all },
                weather: { 0: { description, icon } }
            } = response;

            return {
                ...state,
                isSearching: false,
                isFound: true,
                search: {
                    id,
                    name,
                    country,
                    flag: `${openWeatherMap.flag}/${country.toLowerCase()}.png`,
                    coord: { lat, lon },
                    weather: {
                        temp,
                        clouds: {
                            all,
                            description,
                            icon: `${openWeatherMap.icon}/${icon}.png`
                        }
                    }
                }
            };
        case SEARCH_CLEAR:
            return {
                ...state,
                isSearching: false,
                isFound: false,
                search: {}
            };
        default:
            return state;
    }
};

const appCities = (state, action) => {
    switch (action.type) {
        case CITY_ADD:
            if (state.list.find(city => city.id === action.city.id)) {
                return {
                    ...state
                };
            }

            const { id, name, country, weather: { temp, clouds: { all, description, icon } } } = action.city;

            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id,
                        name,
                        country,
                        status: {
                            [isVisited]: false,
                            [isGoingToVisit]: false
                        },
                        weather: {
                            temp,
                            clouds: {
                                all,
                                description,
                                icon
                            }
                        }
                    }
                ]
            };
        case CITY_REMOVE:
            return {
                ...state,
                list: state.list.filter(city => city.id !== action.id)
            };
        case CITY_STATUS:
            return {
                ...state,
                list: state.list.map(city => city.id === action.id ? {
                    ...city,
                    status: {
                        ...city.status,
                        [action.status]: !city.status[action.status]
                    }
                } : city)
            };
        default:
            return state;
    }
};

const initCities = (state = {
    ...initialState,
    list: LocalStorage.load('cityList') || initialState.list
}, action) => {
    switch (action.type) {
        case CITY_ADD:
        case CITY_REMOVE:
        case CITY_STATUS:
            return appCities(state, action);
        case WEATHER_REQUEST:
        case WEATHER_RECEIVE:
            return appWeather(state, action);
        case SEARCH_REQUEST:
        case SEARCH_RECEIVE:
        case SEARCH_CLEAR:
            return appSearch(state, action);
        default:
            return state;
    }
};

const cities = (state, action) => {
    switch (action.type) {
        case DATA_REFRESH:
            localStorage.removeItem('cityList');

            return initCities(undefined, action);
        default:
            return initCities(state, action);
    }
};

export default cities;
