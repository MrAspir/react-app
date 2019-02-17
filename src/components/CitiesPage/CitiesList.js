import React, { Component } from 'react';
import PropTypes from 'prop-types';

import City from './City';

class CitiesList extends Component {
    static propTypes = {
        isLoaded: PropTypes.bool.isRequired,
        cities: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.shape({
                isVisited: PropTypes.bool.isRequired,
                isGoingToVisit: PropTypes.bool.isRequired
            }).isRequired,
            weather: PropTypes.shape({
                clouds: PropTypes.shape({
                    all: PropTypes.number.isRequired,
                    description: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired
                }).isRequired,
                temp: PropTypes.number.isRequired
            })
        }).isRequired).isRequired,
        onLoadWeather: PropTypes.func.isRequired,
        onChangeCityStatus: PropTypes.func.isRequired,
        onRemoveCity: PropTypes.func.isRequired
    };

    state = {
        isSetColors: false,
        citiesTempColor: {},
        isSorted: false,
        currentSort: 'temp'
    };

    isLoaded = () => this.props.isLoaded;

    citiesTempColor = () => {
        const cities = [ ...this.props.cities ];
        const temp = cities.map(city => city.weather.temp);
        const min = Math.min(...temp);
        const diff = Math.max(...temp) - min;
        const step = Math.floor(240 / diff);

        let citiesTempColor = {};

        let h = 0;
        let s = 100;
        let l = 35;

        for (let i = 0; i < cities.length; ++i) {
            const city = cities[i];

            h = 240 - (step * (city.weather.temp - min));

            citiesTempColor[city.id] = `hsl(${h}, ${s}%, ${l}%)`;
        }

        this.setState({
            citiesTempColor,
            isSetColors: true
        });
    };

    sortingCities = (sort = this.state.currentSort) => {
        const cities = [ ...this.props.cities ];

        if (sort === 'name') {
            return cities.sort((CityA, CityB) => {
                return (CityA.name > CityB.name
                    ? 1 : CityA.name < CityB.name
                        ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }

        if (sort === 'temp') {
            return cities.sort((CityA, CityB) => {
                return (CityA.weather.temp > CityB.weather.temp
                    ? 1 : CityA.weather.temp < CityB.weather.temp
                        ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }

        if (sort === 'clouds') {
            return cities.sort((CityA, CityB) => {
                return (CityA.weather.clouds.all > CityB.weather.clouds.all
                    ? 1 : CityA.weather.clouds.all < CityB.weather.clouds.all
                        ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }
    };

    setSort = (sort) => {
        if (sort !== this.state.currentSort) {
            this.setState({
                isSorted: false
            })
        } else {
            this.setState({
                isSorted: !this.state.isSorted
            })
        }

        this.setState({
            currentSort: sort
        });
    };

    bodyRender = () => {
        if (!this.props.cities.length) {
            return (
                <tr>
                    <td className="cities__no-cities" colSpan="5">No cities to show</td>
                </tr>
            )
        }

        const sortedCities = this.sortingCities();
        const { onChangeCityStatus, onRemoveCity } = this.props;

        return (
            sortedCities.map((city, index) =>
                <City
                    key={city.id}
                    {...city}
                    count={index}
                    background={this.state.citiesTempColor[city.id]}
                    onChangeStatus={(status) => onChangeCityStatus(city.id, status)}
                    onRemove={() => onRemoveCity(city.id)}
                />
            )
        )
    };

    componentDidMount() {
        this.props.onLoadWeather(this.props.cities);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const { isFetching, isLoaded, onLoadWeather } = nextProps;

        if (!isFetching && !isLoaded) {
            nextState.isSetColors = false;
            nextState.citiesTempColor = {};
            nextState.isSorted = false;
            nextState.currentSort = 'temp';

            onLoadWeather(nextProps.cities);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isLoaded, cities } = this.props;
        const { isSetColors } = this.state;

        if ((isLoaded && !isSetColors) ||
            (isSetColors && prevProps.cities.length !== cities.length)) {
            this.citiesTempColor();
        }
    }

    render() {
        return (
            <div className={`cities__table ${!this.isLoaded() ? 'loading' : ''}`}>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="cities__count">#</th>

                            <th className="cities__name">
                                <button className="btn btn-link" onClick={() => this.setSort('name')}>City</button>
                            </th>

                            <th className="cities__clouds">
                                <button className="btn btn-link" onClick={() => this.setSort('clouds')}>Clouds</button>
                            </th>

                            <th className="cities__temp">
                                <button className="btn btn-link" onClick={() => this.setSort('temp')}>Temperature</button>
                            </th>

                            <th className="cities__action">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.isLoaded() && this.bodyRender()}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default CitiesList;
