import React, { Component } from 'react';
import PropTypes from 'prop-types';

import City from './City';

class CitiesList extends Component {
    static propTypes = {
        cities: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                weather: PropTypes.shape({
                    clouds: PropTypes.shape({
                        description: PropTypes.string.isRequired,
                        icon: PropTypes.string.isRequired
                    }),
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

    isLoaded = () => {
        return this.props.cities.isLoaded;
    };

    sortingCities = (list) => {
        if (!this.isLoaded()) {
            return;
        }

        return list.sort((firstItem, secondItem) => {
            return firstItem.weather.temp > secondItem.weather.temp ? 1 :
                firstItem.weather.temp < secondItem.weather.temp ? -1 : 0;
        });
    };

    checkColorRange = (value) => {
        return value > 255 ? 255 : value < 0 ? 0 : value;
    };

    tempColor = (index) => {
        const step = Math.round(255 / this.props.cities.list.length);

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
        const componentClass = this.isLoaded() ? 'cities__table' : 'cities__table loading';
        const sortedList = this.sortingCities([ ...this.props.cities.list ]);

        return (
            <div className={componentClass}>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="cities__count">#</th>
                            <th className="cities__name">City</th>
                            <th className="cities__clouds">Clouds</th>
                            <th className="cities__temp">Temperature</th>
                            <th className="cities__action">{''}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.isLoaded() && sortedList.map((city, index) =>
                            <City
                                key={city.id}
                                {...city}
                                count={index}
                                background={this.tempColor(index)}
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
