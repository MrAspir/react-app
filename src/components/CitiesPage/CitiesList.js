import React, { Component } from 'react';
import PropTypes from 'prop-types';

import City from './City';

class CitiesList extends Component {
    static propTypes = {
        cities: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                status: PropTypes.shape({
                    isVisited: PropTypes.bool.isRequired,
                    isGoingToVisit: PropTypes.bool.isRequired
                }).isRequired,
                weather: PropTypes.shape({
                    clouds: PropTypes.shape({
                        status: PropTypes.number.isRequired,
                        description: PropTypes.string.isRequired,
                        icon: PropTypes.string.isRequired
                    }).isRequired,
                    temp: PropTypes.number.isRequired
                })
            }).isRequired).isRequired
        }).isRequired,
        onLoadWeather: PropTypes.func.isRequired,
        onChangeCityStatus: PropTypes.func.isRequired,
        onRemoveCity: PropTypes.func.isRequired
    };

    state = {
        isSetColors: false,
        listColors: {},
        isSorted: false,
        currentSort: 'temp'
    };

    isLoaded = () => this.props.cities.isLoaded;

    sortingCities = (type = this.state.currentSort) => {
        const list = [ ...this.props.cities.list ];

        if (type === 'name') {
            return list.sort((firstItem, secondItem) => {
                return (firstItem.name > secondItem.name ? 1 :
                    firstItem.name < secondItem.name ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }

        if (type === 'temp') {
            return list.sort((firstItem, secondItem) => {
                return (firstItem.weather.temp > secondItem.weather.temp ? 1 :
                    firstItem.weather.temp < secondItem.weather.temp ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }

        if (type === 'clouds') {
            return list.sort((firstItem, secondItem) => {
                return (firstItem.weather.clouds.status > secondItem.weather.clouds.status ? 1 :
                    firstItem.weather.clouds.status < secondItem.weather.clouds.status ? -1 : 0) * [1, -1][+this.state.isSorted];
            });
        }
    };

    sort = (type) => {
        if (type !== this.state.currentSort) {
            this.setState({
                isSorted: false
            })
        } else {
            this.setState({
                isSorted: !this.state.isSorted
            })
        }

        this.setState({
            currentSort: type
        });
    };

    tempColor = () => {
        if (this.state.isSetColors) {
            return;
        }

        const list = [ ...this.props.cities.list ];
        const temp = list.map(city => city.weather.temp);
        const min = Math.min(...temp);
        const diff = Math.max(...temp) - min;
        const part = Math.floor((diff) / 4); // 3
        const step = Math.floor(180 / part);

        let listColors = {};

        for (let i = 0; i < list.length; ++i) {
            const index = list[i].weather.temp - min;

            let r = 0;
            let g = 0;
            let b = 0;

            if (index < part) {
                b = 210;
                g = step * (index % part);
            } else if (index < part * 2) {
                g = 180;
                b = 180 - step * (index % part);
            } else if (index < part * 3) {
                g = 180;
                r = step * (index % part);
            } else {
                r = 210;
                g = 180 - Math.ceil(255 / (part + (diff % 4))) * (index - part * 3);
            }

            listColors[list[i].id] = `rgba(${r}, ${g}, ${b})`;
        }

        this.setState({
            listColors,
            isSetColors: true
        });
    };

    componentDidMount() {
        this.props.onLoadWeather(this.props.cities.list);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!nextProps.cities.isFetching && !nextProps.cities.isLoaded) {
            nextState.isSetColors = false;
            nextState.listColors = {};
            nextState.isSorted = false;
            nextState.currentSort = 'temp';

            nextProps.onLoadWeather(nextProps.cities.list);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cities.isLoaded && !this.state.isSetColors) {
            this.tempColor();
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
                                <button className="btn btn-link" onClick={() => this.sort('name')}>City</button>
                            </th>

                            <th className="cities__clouds">
                                <button className="btn btn-link" onClick={() => this.sort('clouds')}>Clouds</button>
                            </th>

                            <th className="cities__temp">
                                <button className="btn btn-link" onClick={() => this.sort('temp')}>Temperature</button>
                            </th>

                            <th className="cities__action">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.isLoaded() && this.sortingCities().map((city, index) =>
                            <City
                                key={city.id}
                                {...city}
                                count={index}
                                background={this.state.listColors[city.id]}
                                onChangeStatus={(status) => this.props.onChangeCityStatus(city.id, status)}
                                onRemove={() => this.props.onRemoveCity(city.id)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default CitiesList;
