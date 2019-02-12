import Immutable from 'seamless-immutable';

import { CITY_REMOVE, WEATHER_REQUEST, WEATHER_RECEIVE, DATA_REFRESH,
    CHANGE_STATUS } from '../actions/CitiesPage/types';

import { loadState } from '../../service/localStorage';

import config from '../../config';

const initialState = Immutable({
    isFetching: false,
    isLoaded: false,
    list: [
        {
            id: 3183875,
            name: 'Tirana',
            country: 'AL',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 3041563,
            name: 'Andorra la Vella',
            country: 'AD',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 616051,
            name: 'Yerevan',
            country: 'AM',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 2761369,
            name: 'Vienna',
            country: 'AT',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 587084,
            name: 'Baku',
            country: 'AZ',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 625144,
            name: 'Minsk',
            country: 'BY',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 2800866,
            name: 'Brussels',
            country: 'BE',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 3191281,
            name: 'Sarajevo',
            country: 'BA',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 727011,
            name: 'Sofia',
            country: 'BG',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 3186886,
            name: 'Zagreb',
            country: 'HR',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 146268,
            name: 'Nicosia',
            country: 'CY',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 3067696,
            name: 'Prague',
            country: 'CZ',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 2618425,
            name: 'Copenhagen',
            country: 'DK',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 588409,
            name: 'Tallinn',
            country: 'EE',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 658225,
            name: 'Helsinki',
            country: 'FI',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 2988507,
            name: 'Paris',
            country: 'FR',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 611717,
            name: 'Tbilisi',
            country: 'GE',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 2950159,
            name: 'Berlin',
            country: 'DE',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 264371,
            name: 'Athens',
            country: 'GR',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
        },
        {
            id: 3054643,
            name: 'Budapest',
            country: 'HU',
            status: {
                isVisited: false,
                isGoingToVisit: false
            }
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
    switch (action.type) {
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
                        }
                    }

                    return {
                        ...city,
                        weather: {
                            clouds: {
                                status: item.clouds.all,
                                description: item.weather[0].description,
                                icon: `${config.openWeatherMap.icon}/${item.weather[0].icon}.png`
                            },
                            temp: item.main.temp
                        }
                    }
                })
            };
        case CHANGE_STATUS:
            return {
                ...state,
                list: state.list.map(city => {
                    if (city.id === action.id) {
                        return {
                            ...city,
                            status: {
                                ...city.status,
                                [action.status]: !city.status[action.status]
                            }
                        }
                    }

                    return city;
                })
            };
        case CITY_REMOVE:
            return {
                ...state,
                list: state.list.filter(city => city.id !== action.id)
            };
        default:
            return state;
    }
};

const cities = (state, action) => {
    switch (action.type) {
        case DATA_REFRESH:
            localStorage.removeItem('cityList');

            return appCities(undefined, action);
        default:
            return appCities(state, action);
    }
};

export default cities;
