import React, { Component } from 'react';
//import Auth from '../services/Auth'
import { connect } from 'react-redux';
//import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router-dom'
//import { Route, Redirect } from 'react-router'
//import Dashboard from 'Dashboard.js';
import { NavLink } from "react-router-dom";
//import Axios from 'axios';
import { login } from '../store/actions/authActions';

class Login extends Component {

	state = {
		email: '',
		password: '',
		toggle: false,
		error: false,
		passwordMesssage: '',
		emailMesssage: ''
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleLogin = () => {

		if (this.state.email === '') {
			this.setState({
				emailMesssage: 'Email field is empty'
			});
			return false;
		} else {
			this.setState({ emailMesssage: '' });
		}

		if (this.state.password === '') {
			this.setState({
				passwordMesssage: 'Password field is empty'
			});
			return false;
		} else {
			this.setState({ passwordMesssage: '' });
		}

		this.setState({ toggle: true });

		var data = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.dispatch(login(data, this.props.history));
	}

	render = () => {
		return (
      <div className="login_container">
        <div className="login ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Log-in to your account</div>
            </h2>
            {this.props.message === 'error' ? (
              <div className="ui red message">Your credentials are wrong.</div>
            ) : null}
            <form className="ui large form">
              <div className="ui segment">
					      {this.props.message === 'success' ? (
                  <div className="ui green message"> {this.props.result.message} </div>
                ) : null}
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail outline icon" />
                    <input
                      type="text"
                      placeholder="E-mail"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.emailMesssage ? (
                  <div className="ui red message">{this.state.emailMesssage}</div>
                ) : null}
                <div className="field">
                  <div className="ui left icon input">
                    <i className="unlock icon" />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                {this.state.passwordMesssage ? (
                  <div className="ui red message">{this.state.passwordMesssage}</div>
                ) : null}
                <div
                  className={
                    this.state.toggle
                      ? 'ui fluid large teal submit button loading'
                      : 'ui fluid large teal submit button'
                  }
                  onClick={this.handleLogin}
                >
                  Login
                </div>
              </div>
            </form>
            <div className="ui message">
              New to us ?
              <NavLink to="/register" id="sign_up">
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
	}
}
const mapStateToProps = state => ({
	result: state.result,
	message: state.value
});
export default connect(mapStateToProps)(Login);