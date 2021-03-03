import { combineReducers } from 'redux';
import UserReducer from './User';

export * from './User';

export default combineReducers({
	user: UserReducer
});