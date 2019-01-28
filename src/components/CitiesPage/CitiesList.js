import React from 'react';
import PropTypes from 'prop-types';

import City from './City';

const CitiesList = ({ cities }) => {
    let count = 1;

    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th className="table__count">#</th>
                    <th>City</th>
                </tr>
            </thead>

            <tbody>
                {cities.map(city =>
                    <City
                        key={city.id}
                        {...city}
                        count={count++}
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
    }).isRequired).isRequired
};

export default CitiesList;