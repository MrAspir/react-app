import React, { Component } from 'react';

import CitiesList from '../../container/CitiesPage/CitiesList';
import CitiesBar from '../../container/CitiesPage/CitiesBar';
import CitiesModal from './CityModal';

class CitiesPage extends Component {
    state = {
        isOpen: false
    };

    openModal = () => {
        this.setState({
            isOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            isOpen: false
        });
    };

    render() {
        return (
            <div className="cities">
                <CitiesBar onOpenModal={() => this.openModal()} />
                <CitiesList />
                <CitiesBar onOpenModal={() => this.openModal()} />
                <CitiesModal isOpen={this.state.isOpen} onClose={() => this.closeModal()} />
            </div>
        );
    };
}

export default CitiesPage;
