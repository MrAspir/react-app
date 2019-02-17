import { connect } from 'react-redux';

import { cityRemove, cityStatus, getWeather } from '../../store/actions/CitiesPage/CitiesList';

import CitiesList from '../../components/CitiesPage/CitiesList';

export default connect(state => ({
    isLoaded: state.cities.isLoaded,
    cities: state.cities.list
}), dispatch => ({
    onLoadWeather: data => dispatch(getWeather(data)),
    onRemoveCity: id => dispatch(cityRemove(id)),
    onChangeCityStatus: (id, status) => dispatch(cityStatus(id, status)),
}))(CitiesList);
