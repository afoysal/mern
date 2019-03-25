import React from 'react';
import ReactDOM from 'react-dom';
import './css/Login.css';
import './css/DataTable.css';

import { Provider } from 'react-redux';
import store from './store';

import Auth from './services/Auth';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import setAuthToken from '../src/services/setAuthToken';

const token = Auth.getToken();
if (token) {
	let decode = jwtDecode(token);
	setAuthToken(token);
	store.dispatch({
		type: 'login',
		payload: decode,
		value: 'success'
	})
}

const PrivateRoute = ({ component: Component }) => (
	<Route
	  render={props =>
			(Auth.isAuthenticated() ? ( <Component {...props} />) : (<Redirect to={{ pathname: '/',}}/>))
	  }
	/>
);

// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route
// 	  {...rest}
// 	  	render={props =>
// 			(Auth.isAuthenticated() ? ( <Component {...props} />) : (<Redirect to={{ pathname: '/',}}/>))
// 	  }
// 	/>
// );

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/register" component={Register} />
				<PrivateRoute path="/dashboard" exact component={Dashboard} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root'));