import { createActionTypes } from './utils';
import { getUserStatus } from '../services/userServices';

const ACTIONS = createActionTypes([
	'USER_STATUS',
	'APP_LOADING',
	'LOAD_USER'
]);

const INITIAL_STATE = {
	isLoggedIn: false,
	isLoading: true,
	activeUser: {}
};

export default (state = INITIAL_STATE, { payload, type }) => {
	switch (type) {
		case ACTIONS.USER_STATUS:
			return { ...state, isLoggedIn: payload };
		case ACTIONS.APP_LOADING:
			return { ...state, isLoading: payload };
		case ACTIONS.LOAD_USER:
			return { ...state, activeUser: payload };
		default:
			return state;
	}
};

export const userStatus = () => dispatch => {
	getUserStatus().then(status =>
		dispatch({ type: ACTIONS.USER_STATUS, payload: status }));
};

export const appLoading = () => dispatch => {
	dispatch({ type: ACTIONS.APP_LOADING, payload: false });
};

/*
export const loadUser = () => dispatch => {
	loadCurrentUser().then(payload => dispatch({ type: ACTIONS.LOAD_USER, payload }));
};
*/