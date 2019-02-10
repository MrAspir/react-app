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
                        description: PropTypes.string.isRequired,
                        icon: PropTypes.string.isRequired
                    }).isRequired,
                    temp: PropTypes.number.isRequired
                })
            }).isRequired).isRequired
        }).isRequired,
        onLoadWeather: PropTypes.func.isRequired,
        onRemoveCity: PropTypes.func.isRequired
    };

    state = {
        color: {
            r: 0,
            g: 0,
            b: 255
        }
    };

    componentDidMount() {
        this.props.onLoadWeather(this.props.cities.list);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!nextProps.cities.isFetching && !nextProps.cities.isLoaded) {
            nextProps.onLoadWeather(nextProps.cities.list);
        }
    }

    isLoaded = () => this.props.cities.isLoaded;
    checkColorRange = value => (value > 255 ? 255 : value < 0 ? 0 : value);

    sortingCities = list => (
        list.sort((firstItem, secondItem) => {
            return firstItem.weather.temp > secondItem.weather.temp ? 1 :
                firstItem.weather.temp < secondItem.weather.temp ? -1 : 0;
        })
    );

    tempColor = (index) => {
        const step = Math.round(255 / (this.props.cities.list.length - 1));

        let red = this.state.color.r;
        let green = this.state.color.g;
        let blue = this.state.color.b;

        for (let i = 0; i <= index; i++) {
            if (i === 0) {
                continue;
            }

            red += step;
            green = i < Math.round(this.props.cities.list.length / 2) ? green + step : green - step;
            blue -= step;
        }

        return `rgba(${this.checkColorRange(red)}, ${this.checkColorRange(green)}, ${this.checkColorRange(blue)})`;
    };

    render() {
        return (
            <div className={`cities__table ${!this.isLoaded() ? 'loading' : ''}`}>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="cities__count">#</th>
                            <th className="cities__name">City</th>
                            <th className="cities__clouds">Clouds</th>
                            <th className="cities__temp">Temperature</th>
                            <th className="cities__action">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.isLoaded() && this.sortingCities([ ...this.props.cities.list ]).map((city, index) =>
                            <City
                                key={city.id}
                                {...city}
                                count={index}
                                background={this.tempColor(index)}
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
