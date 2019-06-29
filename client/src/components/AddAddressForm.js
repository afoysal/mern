import React, { Component } from 'react';
import '../css/Login.css';
import { connect } from 'react-redux';

class AddAddressForm extends Component {
	state = { errors: '' }
	componentWillReceiveProps(nextProps) {
		if (nextProps.erroraddAddress !== this.props.erroraddAddress) {
			this.setState({ errors: nextProps.erroraddAddress  });
		}
		if (nextProps.errors !== this.props.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	render() {
		return (
			<form className="ui form">
				{ this.state.errors ? <div className="ui red message">
					{ this.state.errors }
				</div> : null }
				<table className="ui attached compact celled striped selectable table">
					<tbody>
			            <tr>
			                <td className="ui header data_type">Name</td>
			                <td>
			                    <input type="text" name="name" placeholder="Name" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Address</td>
			                <td>
			                    <input type="text" name="address" placeholder="Address" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Telephone No</td>
			                <td>
			                    <input type="text" name="telephone_no" placeholder="Telephone No" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Email</td>
			                <td>
			                    <input type="text" name="email" placeholder="Email" onChange={this.props.onChange}/>
			                </td>
			            </tr>
			            <tr>
			                <td className="ui header">Photo</td>
			                <td>
			                   	<div>
			                   		{this.props.image_element()}
			                   	</div>
			                </td>
			            </tr>
		            </tbody>
	            </table>
	        </form>
		);
	}
}

const mapStateToProps = state => ({
	erroraddAddress: state.addressReducer.erroraddAddress
});

export default connect(mapStateToProps)(AddAddressForm);