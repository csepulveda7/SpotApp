import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	Splash,
	Login,
	SignUp,
	Main
} from './screens';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

function App() {
	return (
		<ThemeProvider theme = { theme }>
			<NavigationContainer>
				<Stack.Navigator initialRouteName = 'Splash' screenOptions = {{ headerShown: false }}>
					<Stack.Screen name = 'Splash' component = { Splash } />
					<Stack.Screen name = 'Login' component = { Login } />
					<Stack.Screen name = 'SignUp' component = { SignUp } />
					<Stack.Screen name = 'Main' component = { Main } />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

const theme = {
	Button: {
		titleStyle: {
			color: '#404040'
		},
		buttonStyle: {
			backgroundColor: '#E2B865'
		}
	}
};

export default App;