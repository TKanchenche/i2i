import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Nearby from 'components/sidebar/nearby';
import AreaOfInterest from 'components/sidebar/area-of-interest';
import Jurisdiction from 'components/sidebar/jurisdiction';

// styles
import './styles.scss';

const MENU_CONTENT = {
  nearby: <Nearby />,
  area_of_interest: <AreaOfInterest />,
  jurisdiction: <Jurisdiction />
};

const ANALYSIS_TYPES = [
  {
    value: 'nearby',
    label: 'Nearby',
    text: 'Drop a pin at a specific point on the map to viewfinancial service locations within your own radius.'
  },
  {
    value: 'area_of_interest',
    label: 'Area of Interest',
    text: 'Create your own shape to view more information about that area.'
  },
  {
    value: 'jurisdiction',
    label: 'Jurisdiction',
    text: 'Zoom into a particular jurisdiction.'
  }
];

class SidebarAnalysisComponent extends React.Component {
  static propTypes = {
    menuItem: PropTypes.string,
    setMenuItem: PropTypes.func.isRequired
  }

  static defaultProps = { menuItem: '' }

  render() {
    const { menuItem } = this.props;
    const availableMenuItems = ANALYSIS_TYPES.map(t => t.value);

    return (
      <div className="c-sidebar-analysis">
        {(!menuItem || !availableMenuItems.includes(menuItem)) &&
          <MenuItems
            items={ANALYSIS_TYPES}
            onSelect={this.props.setMenuItem}
          />
        }

        {(!!menuItem && availableMenuItems.includes(menuItem)) &&
          <MenuItem
            item={ANALYSIS_TYPES.find(at => at.value === menuItem)}
            onBack={this.props.setMenuItem}
          >
            {!!MENU_CONTENT[menuItem] &&
              React.cloneElement(MENU_CONTENT[menuItem])}
          </MenuItem>
        }
      </div>
    );
  }
}

export default SidebarAnalysisComponent;