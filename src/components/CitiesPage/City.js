import React from 'react';
import PropTypes from 'prop-types';

const City = ({ count, name }) => {
    return (
        <tr>
            <td className="table__count">{count}</td>
            <td>{name}</td>
        </tr>
    );
};

City.propTypes = {
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default City;