import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CitiesBar = ({ onRefreshData }) => (
    <div className="cities__bar">
        <div className="row justify-content-between">
            <div className="col-auto">

            </div>

            <div className="col-auto">
                <button className="btn btn-warning" onClick={() => onRefreshData()}>
                    <FontAwesomeIcon icon="history" />
                    Refresh all the data
                </button>
            </div>
        </div>
    </div>
);

export default CitiesBar;
