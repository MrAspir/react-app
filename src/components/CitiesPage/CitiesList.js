import React from 'react';
import PropTypes from 'prop-types';

import City from './City';

const CitiesList = ({ cities, onRemoveCity }) => {
    let count = 1;

    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th className="cities__count">#</th>
                    <th className="cities__name">City</th>
                    <th className="cities__action"></th>
                </tr>
            </thead>

            <tbody>
                {cities.map(city =>
                    <City
                        key={city.id}
                        {...city}
                        count={count++}
                        onRemove={() => onRemoveCity(city.id)}
                    />
                )}
            </tbody>
        </table>
    );
};

CitiesList.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onRemoveCity: PropTypes.func.isRequired
};

export default CitiesList;
