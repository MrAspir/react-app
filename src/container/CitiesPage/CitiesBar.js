import { connect } from 'react-redux';

import CitiesBar from '../../components/CitiesPage/CitiesBar';

import { refreshData } from '../../store/actions/CitiesPage/CitiesBar';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onRefreshData: () => dispatch(refreshData())
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesBar);
