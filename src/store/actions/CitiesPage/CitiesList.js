import { CITY_REMOVE } from './types';

export function removeCity (id) {
    return {
        type: CITY_REMOVE,
        id
    }
}
