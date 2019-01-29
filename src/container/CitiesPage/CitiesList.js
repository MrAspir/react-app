import { connect } from 'react-redux';

import { removeCity } from '../../store/actions/CitiesPage/CitiesList';

import CitiesList from '../../components/CitiesPage/CitiesList';

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveCity: (id) => {
            dispatch(removeCity(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
