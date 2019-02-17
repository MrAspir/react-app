import { connect } from 'react-redux';

import CityForm from '../../components/CitiesPage/CityForm';

import { liveSearch, liveSearchRemove, addCity } from '../../store/actions/CitiesPage/CityForm';

export default connect(state => ({
    isSearching: state.cities.isSearching,
    isFound: state.cities.isFound,
    city: state.cities.search
}), dispatch => ({
    onLiveSearch: (name) => dispatch(liveSearch(name)),
    onRemoveLiveSearch: () => dispatch(liveSearchRemove()),
    onAddCity: (city) => dispatch(addCity(city))
}))(CityForm);
