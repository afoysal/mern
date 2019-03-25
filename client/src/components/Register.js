import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { register } from '../store/actions/authActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordMesssage: '',
    nameMesssage: '',
    emailMesssage: '',
    confirmpasswordMesssage: '',
    toggle: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {

    if (this.state.name === '') {
      this.setState({ nameMesssage: 'Name field is empty' });
      return false;
    } else {
      this.setState({ nameMesssage: '' });
    }

    if (this.state.email === '') {
      this.setState({ emailMesssage: 'Email field is empty' });
      return false;
    } else {
      this.setState({ emailMesssage: '' });
    }

    if (this.state.email.lastIndexOf('@') < 1 || this.state.email.lastIndexOf('.') < 1) {
      this.setState({ emailMesssage: 'Please enter valid email address' });
      return false;
    } else {
      this.setState({ emailMesssage: '' });
    }

    if (this.state.password === '') {
      this.setState({ passwordMesssage: 'Password field is empty' });
      return false;
    } else {
      this.setState({ passwordMesssage: '' });
    }

    if (this.state.password.length < 6) {
      this.setState({ passwordMesssage: 'Password must be atleast 6 character long' });
      return false;
    } else {
      this.setState({ passwordMesssage: '' });
    }

    if (this.state.confirmPassword === '') {
      this.setState({ confirmpasswordMesssage: 'Password Confirmation field is empty' });
      return false;
    } else {
      this.setState({ confirmpasswordMesssage: '' });
    }

    if (this.state.confirmPassword !== '' && this.state.password !== this.state.confirmPassword) {
      this.setState({ confirmpasswordMesssage: 'Password not matched with Confirm Password' });
      return false;
    } else {
      this.setState({ confirmpasswordMesssage: '' });
    }

    this.setState({ toggle: true });

    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.dispatch(register(data, this.props.history));
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
              {this.props.value === 'error' ? (
                <div className="ui red message"> {this.props.message} </div>
              ) : null}
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
                  this.state.toggle && this.props.value !== 'error'
                    ? 'ui fluid large teal submit button loading'
                    : 'ui fluid large teal submit button'
                }
                onClick={this.handleSubmit}
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
  message: state.result,
  value: state.value
});

export default connect(mapStateToProps)(Register);