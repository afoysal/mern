import { combineReducers } from 'redux';
import authReducer from './authReducer';
import addressReducer from './addressReducer';

const rootReducer = combineReducers({
  authReducer,
  addressReducer
});

export default rootReducer;