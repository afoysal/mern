import React, { Component } from 'react';
import Login from './components/Login.js';
import './css/Login.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore();

const App = () => {
	<Provider store={ store }>
		<Login />
	</Provider>
}

export default App;