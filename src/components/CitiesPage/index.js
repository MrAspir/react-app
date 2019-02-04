import React from 'react';

import CitiesList from '../../container/CitiesPage/CitiesList';
import CitiesBar from '../../container/CitiesPage/CitiesBar';

const CitiesPage = () => (
    <div className="cities">
        <CitiesList />
        <CitiesBar />
    </div>
);

export default CitiesPage;
