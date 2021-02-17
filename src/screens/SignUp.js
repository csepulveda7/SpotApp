import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';
import DogeFaceWithinCircle from '../assets/images/DogeFaceWithinCircle';

export const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [error, setError] = useState('');

	const { textStyle, container, textBoxes, rectangle, topGraphics, logoStyle, buttonContainer, errorText } = styles;

	const registerSubmit = () => {
		if (!email) { setError('Please enter your email') }
		else if (!username) { setError('Please enter your username') }
		else if (!password) { setError('Please enter your password') }
		else if (!confirm) { setError('Please confrim your password') }
		else if (confirm !== password) { setError('Passwords do not match') }
		else {
			Alert.alert(email, username + password + confirm);
			navigation.navigate('Login');
		}
	};

	const renderError = () => {
		if (error)
			return (<Text style = { errorText }>{ error }</Text>);
	};

	return (
		<View style = { container }>
			<View style = { topGraphics }>
				<View style = { [rectangle, { backgroundColor: '#E2B865', height: '65%' }] } />
				<DogeFaceWithinCircle style = { logoStyle } />
				<View style = { [rectangle, { backgroundColor: '#F5D8A1', height: '50%' }] } />
			</View>
			<View style = { textBoxes }>
				<TextBox
					defaultValue = 'email@address.com'
					labelText = 'Email'
					onChange = { (e) => setEmail(e) }
					value = { email }
				/>
				<TextBox
					defaultValue = 'John Doe'
					labelText = 'Username'
					onChange = { (e) => setUsername(e) }
					value = { username }
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Password'
					secureInput = { true }
					onChange = { (e) => setPassword(e) }
					value = { password }
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Confirm Password'
					secureInput = { true }
					onChange = { (e) => setConfirm(e) }
					value = { confirm }
				/>
			</View>
			<Button
				title = 'Sign Up'
				containerStyle = { buttonContainer }
				buttonStyle = {{ marginVertical: '5%', width: '100%', height: '100%' }}
				onPress = { registerSubmit }
			/>
			{ renderError() }
			<Text style = {{ marginTop: '5%' }}>
				{ 'Already have an account? ' }
				<Text style = {{ color: '#BC6F27' }}
					onPress = { () => { navigation.navigate('Login') } }>
					Log in Here!
				</Text>
			</Text>
		</View>
	);
};

const styles = {
	container: {
		backgroundColor: '#E5E5E5',
		height: '100%',
		width: '100%',
		alignItems: 'center'
	},
	textStyle: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textBoxes: {
		height: '50%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		marginTop: '15%',
		zIndex: 1
	},
	rectangle: {
		position: 'relative',
		width: '100%',
		zIndex: 1
	},
	topGraphics: {
		height: '21%',
		width: '100%',
		alignItems: 'center',
		zIndex: 0
	},
	logoStyle: {
		height: '60%',
		width: '50%',
		resizeMode: 'center',
		position: 'absolute',
		zIndex: 2,
		top: '35%'
	},
	buttonContainer: {
		width: '65%',
		height: '7%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5%',
		position: 'relative'
	},
	errorText: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold'
	}
};