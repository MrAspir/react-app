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

    componentDidMount() {
        this.props.onLoadWeather(this.props.cities.list);
    }

    isLoaded = () => {
        return this.props.cities.isLoaded;
    };

    render() {
        const componentClass = this.isLoaded() ? 'cities__table' : 'cities__table loading';

        return (
            <div className={componentClass}>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="cities__count">#</th>
                            <th className="cities__name">City</th>
                            <th className="cities__temp">Temperature</th>
                            <th className="cities__action">{''}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.isLoaded() && this.props.cities.list.map((city, index) =>
                            <City
                                key={city.id}
                                {...city}
                                count={index}
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
