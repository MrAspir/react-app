import { connect } from 'react-redux';

import CitiesList from '../../components/CitiesPage/CitiesList';

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};

export default connect(mapStateToProps, null)(CitiesList);