import React from 'react';
import { View, Text, Image } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';
import DogeLogo from '../assets/images/DogeLogo.png';

export const Login = ({ navigation }) => {
	// state = { users: [] };

	/*
	 * componentDidMount() {
	 * 	fetch(`${config.API_ADDR}/users`)
	 * 	.then(res => res.json())
	 * 	.then(users => this.setState({ users }));
	 * }
	 */

	const { textStyle, container, forgotPass, rectangle, logoStyle, topGraphics, textBoxes, buttonContainer } = styles;

	return (
		<View style = { container }>
			<View style = { topGraphics }>
				<View style = { [rectangle, { backgroundColor: '#E2B865', height: '65%' }] } />
				<Image style = { logoStyle } source = { DogeLogo } />
				<View style = { [rectangle, { backgroundColor: '#F5D8A1', height: '50%' }] } />
			</View>
			<View style = { [textBoxes, { marginTop: '30%' }] }>
				<TextBox
					defaultValue = 'email@address.com'
					labelText = 'Email'
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Password'
					secureInput = { true }
				/>
			</View>
			<Text
				style = { forgotPass }>
				{ 'Forgot Your Password? ' }
			</Text>
			<Button
				title = 'Login'
				buttonStyle = {{ width: '100%', height: '100%' }}
				containerStyle = { buttonContainer }
				onPress = { () => { navigation.navigate('Main') } }
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
		height: '50%',
		resizeMode: 'center',
		position: 'absolute',
		zIndex: 2,
		top: '40%'
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
	}
};