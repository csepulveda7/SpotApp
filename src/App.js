import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './router';
import { userStatus } from './ducks';

const App = () => {
	const dispatch = useDispatch();
	const { isLoggedIn, isLoading } = useSelector(state => state.user);

	useEffect(() => {
		let mounted = true;

		if (mounted)
			dispatch(userStatus());

		return () => { mounted = false };
	}, [isLoggedIn]);

	return (
		<Router isLoggedIn = { isLoggedIn } isLoading = { isLoading } />
	);
};

export default App;