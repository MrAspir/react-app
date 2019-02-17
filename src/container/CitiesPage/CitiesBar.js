import { connect } from 'react-redux';

import CitiesBar from '../../components/CitiesPage/CitiesBar';

import { refreshData } from '../../store/actions/CitiesPage/CitiesBar';

export default connect(undefined, dispatch => ({
    onRefreshData: () => dispatch(refreshData())
}))(CitiesBar);
