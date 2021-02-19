import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextBox, Header } from '../components';
import { Button } from 'react-native-elements';
import { loginUser } from '../services/userServices';
import { styles } from './styles';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const {
		container,
		subtextButton,
		textBoxes,
		buttonContainer,
		errorText,
		fullWidthHeight,
		forgotPassword
	} = styles;

	const loginSubmit = () => {
		if (!email) setError('Please enter your email');
		else if (!password) setError('Please enter your password');
		else
			loginUser(email, password);
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	return (
		<View style = { container }>
			<Header height = '30%' />
			<View style = { textBoxes }>
				<TextBox
					defaultValue = 'email@address.com'
					labelText = 'Email'
					onChange = { (e) => setEmail(e) }
					value = { email }
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Password'
					secureInput = { true }
					onChange = { (e) => setPassword(e) }
					value = { password }
				/>
				<Text style = { forgotPassword }>
					Forgot password?
				</Text>
			</View>
			{ renderError() }
			<Button
				title = 'Login'
				buttonStyle = { fullWidthHeight }
				containerStyle = { buttonContainer }
				onPress = { loginSubmit }
			/>
			<Text style = { subtextButton }>
				{ 'Don\'t have an account? ' }
				<Text
					style = {{ color: '#BC6F27' }}
					onPress = { () => { navigation.navigate('SignUp') } }
				>
					Register here
				</Text>
			</Text>
		</View>
	);
};