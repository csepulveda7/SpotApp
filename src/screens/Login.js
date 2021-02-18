import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';
import { loginUser } from '../services/userServices';
import DogeFaceWithinCircle from '../assets/images/DogeFaceWithinCircle';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const {
		textStyle,
		container,
		forgotPass,
		rectangle,
		logoStyle,
		topGraphics,
		textBoxes,
		buttonContainer,
		errorText
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
			<View style = { topGraphics }>
				<View style = { [rectangle, { backgroundColor: '#E2B865', height: '65%' }] } />
				<DogeFaceWithinCircle style = { logoStyle } />
				<View style = { [rectangle, { backgroundColor: '#F5D8A1', height: '50%' }] } />
			</View>
			<View style = { [textBoxes, { marginTop: '30%' }] }>
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
			</View>
			<Text
				style = { forgotPass }>
				{ 'Forgot Your Password? ' }
			</Text>
			{ renderError() }
			<Button
				title = 'Login'
				buttonStyle = {{ width: '100%', height: '100%' }}
				containerStyle = { buttonContainer }
				onPress = { loginSubmit }
			/>
			<Text>
				{ 'Don\'t Have an Account? ' }
				<Text
					style = {{ color: '#BC6F27' }}
					onPress = { () => { navigation.navigate('SignUp') } }>
					{ 'Register Here' }
				</Text>
			</Text>
		</View>
	);
};

const styles = {
	container: {
		backgroundColor: '#E5E5E5',
		flex: 1,
		top: 0,
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
	forgotPass: {
		color: '#404040',
		textAlign: 'right',
		alignSelf: 'stretch',
		marginRight: 60
	},
	rectangle: {
		zIndex: 0,
		position: 'relative',
		width: '100%',
		height: '15%'
	},
	logoStyle: {
		height: '60%',
		width: '50%',
		resizeMode: 'center',
		position: 'absolute',
		zIndex: 2,
		top: '35%'
	},
	textBoxes: {
		height: '20%',
		width: '100%',
		alignItems: 'center',
		position: 'relative',
		zIndex: 1
	},
	topGraphics: {
		height: '40%',
		width: '100%',
		alignItems: 'center',
		zIndex: 0
	},
	buttonContainer: {
		width: '65%',
		height: '7%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		marginVertical: '8%'
	},
	errorText: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold'
	}
};