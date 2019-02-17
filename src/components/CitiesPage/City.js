import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isVisited, isGoingToVisit } from '../../store/actions/CitiesPage/status';

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
        const {
            count, name, weather: { temp, clouds: { description, icon } }, background, onChangeStatus, onRemove
        } = this.props;

        return (
            <tr className={`${this.isVisited() ? 'visited' : ''} ${this.isGoingToVisit() ? 'wish' : ''}`}>
                <td className="table__count">{count + 1}</td>
                <td className="cities__name">{name}</td>

                <td className="cities__clouds">
                    <img src={icon}
                         alt={description}
                         title={description}
                    />
                    <span className="cities__clouds-value">{description}</span>
                </td>

                <td className="cities__temp" style={{ background: background }}>
                    {temp}
                </td>

                <td className="cities__action">
                    <div className="btn-group btn-group-toggle" role="group">
                        <button className={`btn btn-primary ${this.isVisited() ? 'active' : ''}`}
                               title="Visited city"
                               onClick={() => onChangeStatus(isVisited)}
                        >
                            <FontAwesomeIcon icon={`${this.isVisited() ? 'calendar-check' : 'calendar-plus'}`} />
                        </button>

                        <button className={`btn btn-primary ${this.isGoingToVisit() ? 'active' : ''}`}
                                title="Going to visit"
                                onClick={() => onChangeStatus(isGoingToVisit)}
                        >
                            <FontAwesomeIcon icon="bookmark" />
                        </button>
                    </div>

                    <button className="btn btn-danger" title="Remove city" onClick={onRemove}>
                        <FontAwesomeIcon icon="trash-alt" />
                    </button>
                </td>
            </tr>
        );
    }
}

export default City;
