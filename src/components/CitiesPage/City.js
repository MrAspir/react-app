import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class City extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
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
        }).isRequired,
        onChangeStatus: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired
    };

    isVisited = () => this.props.status.isVisited;
    isGoingToVisit = () => this.props.status.isGoingToVisit;

    render() {
        return (
            <tr className={`${this.isVisited() ? 'visited' : ''} ${this.isGoingToVisit() ? 'wish' : ''}`}>
                <td className="table__count">{this.props.count + 1}</td>
                <td className="cities__name">{this.props.name}</td>

                <td className="cities__clouds">
                    <img src={this.props.weather.clouds.icon}
                         alt={this.props.weather.clouds.description}
                         title={this.props.weather.clouds.description}
                    />
                    <span className="cities__clouds-value">{this.props.weather.clouds.description}</span>
                </td>

                <td className="cities__temp" style={{ background: this.props.background }}>
                    {this.props.weather.temp}
                </td>

                <td className="cities__action">
                    <div className="btn-group btn-group-toggle" role="group">
                        <button className={`btn btn-primary ${this.isVisited() ? 'active' : ''}`}
                               title="Visited city"
                               onClick={() => this.props.onChangeStatus('isVisited') }
                        >
                            <FontAwesomeIcon icon="calendar-check" />
                        </button>

                        <button className={`btn btn-primary ${this.isGoingToVisit() ? 'active' : ''}`}
                                title="Going to visit"
                                onClick={() => this.props.onChangeStatus('isGoingToVisit')}
                        >
                            <FontAwesomeIcon icon="bookmark" />
                        </button>
                    </div>

                    <button className="btn btn-danger" title="Remove city" onClick={() => this.props.onRemove()}>
                        <FontAwesomeIcon icon="trash-alt" />
                    </button>
                </td>
            </tr>
        );
    }
}

export default City;
