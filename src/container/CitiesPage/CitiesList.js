import { connect } from 'react-redux';

import { removeCity, getWeather, changeCityStatus } from '../../store/actions/CitiesPage/CitiesList';

import CitiesList from '../../components/CitiesPage/CitiesList';

const mapStateToProps = state => ({
    cities: state.cities
});

const mapDispatchToProps = dispatch => ({
    onLoadWeather: data => dispatch(getWeather(data)),
    onChangeCityStatus: (id, status) => dispatch(changeCityStatus(id, status)),
    onRemoveCity: id => dispatch(removeCity(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
