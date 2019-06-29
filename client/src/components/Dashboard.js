import React, { Component } from 'react';
import DataTable from './DataTable';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return <DataTable />;
  }
}

export default connect()(Dashboard);