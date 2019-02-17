import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CitiesBar = ({ onOpenModal, onRefreshData }) => (
    <div className="cities__bar">
        <div className="row justify-content-between">
            <div className="col-auto">

            </div>

            <div className="col-auto">
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <button className="btn btn-success" onClick={onOpenModal} data-text="Add a city">
                            <FontAwesomeIcon icon="plus-square" />
                        </button>
                    </div>

                    <div className="col-auto">
                        <button className="btn btn-warning" onClick={onRefreshData} data-text="Refresh all the data">
                            <FontAwesomeIcon icon="history" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

CitiesBar.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    onRefreshData: PropTypes.func.isRequired
};

export default CitiesBar;
