import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import initialState from './initial-state';

// Selectors
import { getActiveLayerGroups } from 'components/map/selectors';

// Components
import LegendComponent from './component';

// Actions
import { setSelectedLayers as setSelectedSectorLayers } from 'components/sidebar/sectors/actions';
import { setSelectedLayers as setSelectedContextualLayers } from 'components/sidebar/contextual-layers/actions';

// Mandatory
export { actions, reducers, initialState };

export default connect(
  state => ({
    ...state.legend,
    activeLayerGroups: getActiveLayerGroups(state),
    selectedSectorLayers: state.sectorLayers.selectedLayers,
    selectedContextualLayers: state.contextualLayers.selectedLayers
  }),
  { ...actions, setSelectedSectorLayers, setSelectedContextualLayers }
)(LegendComponent);
