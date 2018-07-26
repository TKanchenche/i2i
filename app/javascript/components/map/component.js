import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Map } from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

// styles
import './styles.scss';

const COUNTRY_MASK = {
  id: 'country-mask',
  name: 'Country Mask',
  provider: 'carto',
  layerConfig: {
    account: 'ikerey',
    body: {
      maxzoom: 19,
      minzoom: 2,
      layers: [
        {
          type: 'cartodb',
          options: {
            sql: 'SELECT * FROM world_borders_hd',
            cartocss: "#layer{polygon-fill:#2f939c;polygon-opacity:.9;line-color:#2f939c;line-opacity:.1;line-width:0}#layer[iso_a3='{{iso}}']{polygon-fill:#FFF;polygon-opacity:0;line-opacity:1}",
            cartocss_version: '2.3.0'
          }
        }
      ]
    }
  },
  legendConfig: {},
  interactionConfig: {}
};

class SidebarComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    activeLayers: PropTypes.array.isRequired
  }

  render() {
    const { open, activeLayers } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Map>
          {map => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {
                  activeLayers.map((layer, index) =>
                    <Layer key={layer.id} {...layer} zIndex={1000 - index} />)
                }

                <Layer
                  {...COUNTRY_MASK}
                  key="country-mask"
                  params={{ iso: this.props.iso }}
                  zIndex={1001}
                />
              </LayerManager>
            </React.Fragment>
            )}
        </Map>
      </div>
    );
  }
}

export default SidebarComponent;
