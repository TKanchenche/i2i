import React from 'react';
import PropTypes from 'prop-types';

import qs from 'query-string';

// Components
import Intro from 'components/intro';
import Sidebar from 'components/sidebar';
import Map from 'components/map';
import PreFooter from 'components/pre-footer';
import { Icons } from 'wri-api-components';

import './styles.scss';

export default class FSPMaps extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    iso: PropTypes.string.isRequired,
    bbox: PropTypes.array.isRequired,
    setIso: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { iso, bbox } = this.props;

    // LOCATION PARAMS
    const { location } = window;
    const {
      lat,
      lng,
      zoom
    } = qs.parse(location.search);

    this.props.setIso(iso);

    if (!zoom && !lat && !lng) {
      this.props.setBBox(bbox);
    }

    if (zoom) this.props.setZoom(+zoom);
    if (lat && lng) this.props.setCenter({ lat: +lat, lng: +lng });
  }

  componentDidUpdate() {
    const { location, history } = window;

    const { map } = this.props;

    const search = qs.stringify({
      zoom: map.zoom,
      lat: map.center.lat,
      lng: map.center.lng
    });

    // Replace url
    history.replaceState({}, 'fsp-maps', `${location.pathname}?${search}`);
  }

  render() {
    return (
      <div className="c-fsp-maps">
        <Intro />

        <div className="fsp-maps-tool">
          <Sidebar />
          <Map />
          <Icons />
        </div>
        <PreFooter />
      </div>
    );
  }
}
