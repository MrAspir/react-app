import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CityForm extends Component {
    static propTypes = {
        isFound: PropTypes.bool.isRequired,
        isSearching: PropTypes.bool.isRequired,
        city: PropTypes.shape({
            name: PropTypes.string,
            country: PropTypes.string,
            flag: PropTypes.string,
            weather: PropTypes.shape({
                clouds: PropTypes.shape({
                    status: PropTypes.number,
                    description: PropTypes.string
                }),
                temp: PropTypes.number
            }),
            coord: PropTypes.shape({
                lat: PropTypes.number,
                lon: PropTypes.number
            })
        }).isRequired,
        onModalClose: PropTypes.func.isRequired,
        onSearch: PropTypes.func.isRequired,
        onClearSearch: PropTypes.func.isRequired,
        onAddCity: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);

        this.searching = _.debounce(this.searching, 500);
    }

    state = {
        name: ''
    };

    isFound = () => this.props.isFound;
    isSearching = () => this.props.isSearching;

    changeField = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    searching = () => {
        this.props.onSearch(this.state.name);
    };

    adding = (event) => {
        event.preventDefault();

        const { onAddCity, onModalClose } = this.props;

        onAddCity(this.props.city);
        onModalClose();
    };

    foundRender = () => {
        if (this.isSearching()) {
            return (
                <div className="searching">
                    <FontAwesomeIcon icon="sync" />
                </div>
            )
        } else if (!this.isFound()) {
            return false;
        } else if (this.isFound() && !this.props.city.name) {
            return <div className="not-found">Not found</div>
        }

        const {
            name, country, flag, weather: { clouds: { all, description }, temp }, coord: { lat, lon }
        } = this.props.city;

        return (
            <div className="form-result">
                <p><strong>{name}, {country}</strong> <img src={flag} alt={country} /> <strong>{description}</strong>
                <br />
                <strong>{temp}</strong> temperature, clouds <strong>{all}%</strong>
                <br />
                Geo coords <strong>[{lat}, {lon}]</strong></p>
            </div>
        )
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.name !== nextState.name && nextState.name.length > 1) {
            this.searching();
        }

        if (nextState.name.length <= 1 && nextProps.isFound) {
            this.props.onClearSearch();
        }
    }

    render() {
        return (
            <form onSubmit={this.adding}>
                <div className="form-group">
                    <label className="control-label" htmlFor="name">Name:</label>
                    <input id="name" className="form-control" type="text" name="name" value={this.state.name}
                           onChange={this.changeField} />
                </div>

                {this.foundRender()}

                <div className="row justify-content-end">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" disabled={this.isFound() ? '' : 'disabled'}>
                            <FontAwesomeIcon icon="plus-square" />
                            Add a city
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CityForm;
