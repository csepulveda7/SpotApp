import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { colors } from './styles';
import {
	/* Splash Screen */ Splash,
	/* Auth Screens  */ Login, SignUp,
	/* Main Screens  */ Main, Collection, Account
} from './screens';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const AuthStackNavigator = () => (
	<AuthStack.Navigator screenOptions = {{ headerShown: false }}>
		<AuthStack.Screen name = 'Splash' component = { Splash } initialParams = {{ nextScreen: 'Login' }} />
		<AuthStack.Screen name = 'Login' component = { Login } />
		<AuthStack.Screen name = 'SignUp' component = { SignUp } />
	</AuthStack.Navigator>
);

const MainStackNavigator = () => (
	<MainStack.Navigator screenOptions = {{ headerShown: false }}>
		<MainStack.Screen name = 'Splash' component = { Splash } initialParams = {{ nextScreen: 'Main' }} />
		<MainStack.Screen name = 'Main' component = { Main } />
		<MainStack.Screen name = 'Collection' component = { Collection } />
		<MainStack.Screen name = 'Account' component = { Account } />
	</MainStack.Navigator>
);

export default ({ isLoggedIn }) => (
	<ThemeProvider theme = { theme }>
		<NavigationContainer>
			{ !isLoggedIn ? AuthStackNavigator() : MainStackNavigator() }
		</NavigationContainer>
	</ThemeProvider>
);

const theme = {
	Button: {
		titleStyle: { color: colors.dark },
		buttonStyle: { backgroundColor: colors.primaryDark }
	}
};