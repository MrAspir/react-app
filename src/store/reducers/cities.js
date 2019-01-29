import { CITY_REMOVE } from '../actions/CitiesPage/types';

const initialState = [{
    id: 1,
    name: 'Tirana'
}, {
    id: 2,
    name: 'Andorra la Vella'
}, {
    id: 3,
    name: 'Yerevan'
}, {
    id: 4,
    name: 'Vienna'
}, {
    id: 5,
    name: 'Baku'
}, {
    id: 6,
    name: 'Minsk'
}, {
    id: 7,
    name: 'Brussels'
}, {
    id: 8,
    name: 'Sarajevo'
}, {
    id: 9,
    name: 'Sofia'
}, {
    id: 10,
    name: 'Zagreb'
}, {
    id: 11,
    name: 'Nicosia'
}, {
    id: 12,
    name: 'Prague'
}, {
    id: 13,
    name: 'Copenhagen'
}, {
    id: 14,
    name: 'Tallinn'
}, {
    id: 15,
    name: 'Helsinki'
}, {
    id: 16,
    name: 'Paris'
}, {
    id: 17,
    name: 'Tbilisi'
}, {
    id: 18,
    name: 'Berlin'
}, {
    id: 19,
    name: 'Athens'
}, {
    id: 20,
    name: 'Budapest'
}, {
    id: 21,
    name: 'Reykjavik'
}, {
    id: 22,
    name: 'Dublin'
}, {
    id: 23,
    name: 'Rome'
}, {
    id: 24,
    name: 'Astana'
}, {
    id: 25,
    name: 'Pristina'
}, {
    id: 26,
    name: 'Riga'
}, {
    id: 27,
    name: 'Vaduz'
}, {
    id: 28,
    name: 'Vilnius'
}, {
    id: 29,
    name: 'Luxembourg (name)'
}, {
    id: 30,
    name: 'Skopje'
}, {
    id: 31,
    name: 'Valletta'
}, {
    id: 32,
    name: 'Chisinau'
}, {
    id: 33,
    name: 'Monaco'
}, {
    id: 34,
    name: 'Podgorica'
}, {
    id: 35,
    name: 'Amsterdam'
}, {
    id: 36,
    name: 'Oslo'
}, {
    id: 37,
    name: 'Warsaw'
}, {
    id: 38,
    name: 'Lisbon'
}, {
    id: 39,
    name: 'Bucharest'
}, {
    id: 40,
    name: 'Moscow'
}, {
    id: 41,
    name: 'San Marino'
}, {
    id: 42,
    name: 'Belgrade'
}, {
    id: 43,
    name: 'Bratislava'
}, {
    id: 44,
    name: 'Ljubljana'
}, {
    id: 45,
    name: 'Madrid'
}, {
    id: 46,
    name: 'Stockholm'
}, {
    id: 47,
    name: 'Bern'
}, {
    id: 48,
    name: 'Ankara'
}, {
    id: 49,
    name: 'Kyiv'
}, {
    id: 50,
    name: 'London'
}, {
    id: 51,
    name: 'Vatican City'
}];

const cities = (state = initialState, action) => {
    switch (action.type) {
        case CITY_REMOVE:
            return state.filter(city => city.id !== action.id);
        default:
            return state;
    }
};

export default cities;
