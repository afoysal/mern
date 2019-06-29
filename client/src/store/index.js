import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
const middleware = [thunk];
const enhander = compose(applyMiddleware(...middleware));
const store = createStore(rootReducer, {}, enhander);
export default store;