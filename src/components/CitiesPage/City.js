import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const City = ({ count, name, isFetching, weather, onRemove }) => {
    console.log('-- weather: --', weather);

    return (
        <tr>
            <td className="table__count">{count + 1}</td>
            <td className="cities__name">{name}</td>

            <td className="cities__clouds">
                <img src={weather.clouds.icon} alt={weather.clouds.description} title={weather.clouds.description} />
                <span className="cities__clouds-value">{weather.clouds.description}</span>
            </td>

            <td className="cities__temp">
                <span className="cities__temp-value">{weather.temp}</span>
            </td>

            <td className="cities__action">
                <button className="btn btn-danger" onClick={onRemove}>
                    <FontAwesomeIcon icon="trash-alt" />
                </button>
            </td>
        </tr>
    );
};

City.propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    weather: PropTypes.shape({
        clouds: PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired
        }),
        temp: PropTypes.number.isRequired
    }),
    onRemove: PropTypes.func.isRequired
};

export default City;
