import { connect } from 'react-redux';

import { removeCity, getWeather, changeCityStatus } from '../../store/actions/CitiesPage/CitiesList';

import CitiesList from '../../components/CitiesPage/CitiesList';

export default connect(state => ({
    isLoaded: state.cities.isLoaded,
    cities: state.cities.list
}), dispatch => ({
    onLoadWeather: data => dispatch(getWeather(data)),
    onChangeCityStatus: (id, status) => dispatch(changeCityStatus(id, status)),
    onRemoveCity: id => dispatch(removeCity(id))
}))(CitiesList);
