import { combineReducers } from 'redux';
import userReducer from './userReducers';

export * from './userReducers';

export default combineReducers({
	user: userReducer
});