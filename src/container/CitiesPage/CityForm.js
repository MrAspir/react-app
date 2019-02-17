import { connect } from 'react-redux';

import CityForm from '../../components/CitiesPage/CityForm';

import { search, searchClear, addCity } from '../../store/actions/CitiesPage/CityForm';

export default connect(state => ({
    isSearching: state.cities.isSearching,
    isFound: state.cities.isFound,
    city: state.cities.search
}), dispatch => ({
    onSearch: (name) => dispatch(search(name)),
    onClearSearch: () => dispatch(searchClear()),
    onAddCity: (city) => dispatch(addCity(city))
}))(CityForm);
