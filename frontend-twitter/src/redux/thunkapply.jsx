// Example applying Redux Thunk middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from './reducers';

const store = createStore(combineReducer, applyMiddleware(thunk));
