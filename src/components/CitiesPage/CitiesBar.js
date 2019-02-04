import React from 'react';

const CitiesBar = ({ onRefreshData }) => {
    return (
        <div className="cities__bar">
            <div className="row justify-content-between">
                <div className="col-auto">

                </div>

                <div className="col-auto">
                    <button className="btn btn-primary" onClick={() => onRefreshData()}>Refresh all the data</button>
                </div>
            </div>
        </div>
    )
};

export default CitiesBar;
