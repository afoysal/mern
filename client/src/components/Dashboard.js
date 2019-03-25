import React, { Component } from 'react';
//import { withRouter } from "react-router-dom";
//import Auth from '../services/Auth'
// import ReactTable from "react-table";
// import 'react-table/react-table.css'
import DataTable from './DataTable';
import { connect } from 'react-redux';
//import Auth from '../services/Auth';
import { getAddress } from '../store/actions/addressActions';

class Dashboard extends Component {

	state = {
		result: [],
		page: 1,
		last_page: '',
		current_page: '',
		from: '',
		dataAvailable: false,
	};

	pagination = (value) => {
		var page;
		page = this.state.page + value;
		if (page >= 1 && page <= this.state.last_page) {
			this.setState({ page: page }, () => { this.getAddress() });
		}
	}

	// getAddress = () => {
	// 	this.props.dispatch(getAddress());
	// }

	componentDidMount = () => {
		//this.props.dispatch(getAddress());
	}

	render() {
		return (
      <div>Hello {console.log(this.props)}</div>
    );
	}
}

const mapStateToProps = state => ({
  addresses: state.address
});

export default connect(mapStateToProps)(Dashboard);