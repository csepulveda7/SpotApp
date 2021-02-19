import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Header, TextBox } from '../components';
import { Button } from 'react-native-elements';
import { styles } from './styles';
import { createUser } from '../services/userServices';

export const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [error, setError] = useState('');

	const { textStyle,
		container,
		textBoxes,
		logoStyle,
		buttonContainer,
		errorText,
		fullWidthHeight,
		subtextButton
	} = styles;

	const registerSubmit = () => {
		if (!email) { setError('Please enter your email') }
		else if (!username) { setError('Please enter your username') }
		else if (!password) { setError('Please enter your password') }
		else if (!confirm) { setError('Please confirmm your password') }
		else if (confirm !== password) { setError('Passwords do not match') }
		else {
			Alert.alert(email, username + password + confirm);
			createUser(username, email, password);
			navigation.navigate('Login');
		}
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	return (
		<View style = { container }>
			<Header />
			<View style = { textBoxes }>
				<TextBox
					defaultValue = 'John Doe'
					labelText = 'Username'
					onChange = { (e) => setUsername(e) }
					value = { username }
				/>
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
				<TextBox
					defaultValue = 'Confirm Password'
					labelText = 'Confirm Password'
					secureInput = { true }
					onChange = { (e) => setConfirm(e) }
					value = { confirm }
				/>
			</View>
			<Button
				title = 'Sign Up'
				containerStyle = { buttonContainer }
				buttonStyle = { fullWidthHeight }
				onPress = { registerSubmit }
			/>
			{ renderError() }
			<Text style = { subtextButton }>
				{ 'Already have an account? ' }
				<Text style = {{ color: '#BC6F27' }} onPress = { () => { navigation.navigate('Login') } }>
					Log in
				</Text>
			</Text>
		</View>
	);
};

