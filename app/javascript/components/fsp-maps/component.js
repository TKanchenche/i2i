import React from 'react';
import PropTypes from 'prop-types';

// Components
import Intro from 'components/intro';
import Sidebar from 'components/sidebar';

export default class FSPMaps extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    setIso: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { iso } = this.props;
    this.props.setIso(iso);
  }

  render() {
    return (
      <div className="c-fsp-maps">
        <Intro />
        <Sidebar />
      </div>
    );
  }
}
