import React, { Component } from 'react';
import Auth from '../services/Auth'
//import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router-dom'
//import { Route, Redirect } from 'react-router'
//import Dashboard from 'Dashboard.js';
import { withRouter, NavLink } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    toggle: false,
    passwordMesssage: '',
    nameMesssage: '',
    emailMesssage: '',
    confirmpasswordMesssage: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.props.dispatch( { type: 'Hello' } );
  }

  register1 = () => {
    this.setState({ toggle: true });

    if (this.state.name === '') {
      this.setState({ toggle: false, nameMesssage: 'Name field is empty' });
      return false;
    }

    if (this.state.email === '') {
      this.setState({ toggle: false, emailMesssage: 'Email field is empty' });
      return false;
    }

    if (this.state.email.lastIndexOf('@') < 1 || this.state.email.lastIndexOf('.') < 1) {
      this.setState({ toggle: false, emailMesssage: 'Please enter valid email address' });
      return false;
    }

    if (this.state.password === '') {
      this.setState({ toggle: false, passwordMesssage: 'Password field is empty' });
      return false;
    }

    if (this.state.password.length < 6) {
      this.setState({
        toggle: false,
        passwordMesssage: 'Password must be atleast 6 character long'
      });
      return false;
    }

    if (this.state.confirmPassword === '') {
      this.setState({ toggle: false, passwordMesssage: 'Password Confirmation field is empty' });
      return false;
    }

    if (this.state.confirmPassword !== '' && (this.state.password !== this.state.confirmPassword)) {
      this.setState({
        toggle: false,
        passwordMesssage: 'Password not matched with Confirm Password'
      });
      return false;
    }

    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    var self = this;
    axios
      .post('/api/users/register', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response);
        this.props.history.push('/');
        //     var data_login = {
        //         client_id: 2,
        //         client_secret: 'ispGH4SmkEeV4i5Tz9NoI0RSzid5mciG5ecw011f',
        //         grant_type: 'password',
        //         username: self.state.email,
        //         password: self.state.password
        //     }

        //     axios.post('/oauth/token',data_login,{
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //           }})
        //     .then(function (response) {
        //         Auth.setToken(response.data.access_token,response.data.expires_in+ Date.now());
        //         self.props.history.push("/dashboard");
        //     })
        //     .catch(function (error) {
        //         //console.log(error);
        //     });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="ui middle aligned center aligned grid login">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">Register your account</div>
          </h2>
          <form className="ui large form">
            <div className="ui segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon" />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.state.nameMesssage ? (
                <div className="ui red message">{this.state.nameMesssage}</div>
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
              <div className="field">
                <div className="ui left icon input">
                  <i className="unlock icon" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.state.confirmpasswordMesssage ? (
                <div className="ui red message">{this.state.confirmpasswordMesssage}</div>
              ) : null}
              <div
                className={
                  this.state.toggle
                    ? 'ui fluid large teal submit button loading'
                    : 'ui fluid large teal submit button'
                }
                onClick={this.register}
              >
                Register
              </div>
            </div>
            <div className="ui error message" />
          </form>
          <div className="ui message">
            Go to
            <NavLink to="/" id="sign_up">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

//export default withRouter(Register);
export default connect(mapStateToProps)(Register);