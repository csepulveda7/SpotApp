import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	Splash,
	Login,
	SignUp,
	Main,
	Collection,
	Account
} from './screens';
import { ThemeProvider } from 'react-native-elements';
import { colors } from './styles';

const Stack = createStackNavigator();

function App() {
	return (
		<ThemeProvider theme = { theme }>
			<NavigationContainer>
				<Stack.Navigator initialRouteName = 'Main' screenOptions = {{ headerShown: false }}>
					<Stack.Screen name = 'Splash' component = { Splash } />
					<Stack.Screen name = 'Login' component = { Login } />
					<Stack.Screen name = 'SignUp' component = { SignUp } />
					<Stack.Screen name = 'Main' component = { Main } />
					<Stack.Screen name = 'Collection' component = { Collection } />
					<Stack.Screen name = 'Account' component = { Account } />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

const theme = {
	Button: {
		titleStyle: {
			color: colors.dark
		},
		buttonStyle: {
			backgroundColor: colors.primaryDark
		}
	}
};

export default App;