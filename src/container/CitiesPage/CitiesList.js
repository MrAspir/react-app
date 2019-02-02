import { connect } from 'react-redux';

import { removeCity, getWeather } from '../../store/actions/CitiesPage/CitiesList';

import CitiesList from '../../components/CitiesPage/CitiesList';

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveCity: (id) => {
            dispatch(removeCity(id));
        },
        onLoadWeather: (data) => {
            dispatch(getWeather(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
