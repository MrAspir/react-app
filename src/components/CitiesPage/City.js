import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const City = ({ count, name, onRemove }) => (
    <tr>
        <td className="table__count">{count}</td>
        <td className="cities__name">{name}</td>
        <td className="cities__action">
            <button className="btn btn-danger" onClick={onRemove}>
                <FontAwesomeIcon icon="trash-alt" />
            </button>
        </td>
    </tr>
);

City.propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default City;
