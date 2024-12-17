// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Ensure this is the correct import
import rootReducer from './rootReducer'; // Adjust this path if necessary

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
