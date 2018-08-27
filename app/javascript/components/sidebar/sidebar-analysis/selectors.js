import { createSelector } from 'reselect';

const rawWidgets = state => state.fspMaps.widgets.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const iso = state => state.fspMaps.common.iso;
const selectedMenuItem = state => state.fspMaps.sidebar.menuItem;
const nearby = state => state.fspMaps.analysis.nearby;
const areaOfInterestArea = state => state.fspMaps.analysis.areaOfInterest.area;

export const getWidgets = createSelector(
  [rawWidgets, selectedLayers, iso, selectedMenuItem, nearby, areaOfInterestArea],
  (_rawWidgets, _selectedLayers, _iso, _selectedMenuItem, _nearby, _areaOfInterestArea) => {
    const widgets = _rawWidgets.map((row) => {
      const { replace } = window.App.Helper.Utils;
      const {
        cartodb_id: id,
        widget_config: widgetConfigWrap,
        analysis_name: analysisName,
        analysis_type: analysisType
      } = row;
      const { widgetConfig } = widgetConfigWrap;
      const { params_config: paramsConfig, sql_query: sqlQuery } = widgetConfig;
      const { area: nearbyArea, center } = _nearby;
      const { lng, lat } = center;
      const typeIds = _selectedLayers;
      const cartoAccount = window.FSP_CARTO_ACCOUNT;
      const cartoApiKey = window.FSP_CARTO_API_KEY;

      let editableQuery = sqlQuery;
      let geojson;

      if (_selectedMenuItem === 'nearby') {
        geojson = nearbyArea;
      } else if (_selectedMenuItem === 'area_of_interest') {
        geojson = _areaOfInterestArea;
      }

      const queryValues = {
        iso: `'${_iso}'`,
        account: cartoAccount,
        type_ids: `(${typeIds.join()})`,
        geojson: `'${JSON.stringify(geojson)}'`,
        lng,
        lat
      };

      paramsConfig.forEach((param) => {
        const queryParam = param.key;
        const queryReplacement = { [queryParam]: queryValues[queryParam] };
        editableQuery = replace(editableQuery, queryReplacement);
      });

      return {
        id,
        analysisName,
        analysisType,
        query: `${editableQuery}&api_key=${cartoApiKey}`
      };
    });

    return widgets;
  }
);

export default { getWidgets };