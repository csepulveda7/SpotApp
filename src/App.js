import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login.js';
import Splash from './screens/Splash.js';
import SignUp from './screens/SignUp.js';

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName = 'Login' screenOptions = {{ headerShown: false }}>
				<Stack.Screen name = 'Splash' component = { Splash } />
				<Stack.Screen name = 'Login' component = { Login } />
				<Stack.Screen name = 'SignUp' component = { SignUp } />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;