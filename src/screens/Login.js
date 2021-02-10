/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';
import config from '../config';

const Login = ({ navigation }) => {
	
	// state = { users: [] };
	
	// componentDidMount() {
	// 	fetch(`${config.API_ADDR}/users`)
	// 	.then(res => res.json())
	// 	.then(users => this.setState({ users }));
	// }
	
	const { textStyle, container } = styles;
	
	return (
		<View style = { container }>
			<TextBox 
				defaultValue = 'Email'
				labelText = 'email@address.com'
				icon = {{ 
					type: 'font-awesome', 
					name: 'envelope', 
					color: '#404040', 
					size: 20 
				}}
			/>
			<TextBox 
				defaultValue = 'Password'
				labelText = 'Password'
				secureInput = { true }
				icon = {{ 
					type: 'font-awesome',
					name: 'lock',
					color: '#404040',
					size: 26
				}}
			/>
			<Button
				title = 'Login'
				buttonStyle = {{ marginVertical: '5%' }}
				onPress = {() => { navigation.navigate('Main') }} 
			/>
			<Text>
				{"New Here? "}  
				<Text
					style = {{ color: '#EDBB18' }}
					onPress = {() => { navigation.navigate('SignUp') }}>
					Register
				</Text>
			</Text>
			<Text>
				{"Forgot Your Password? "}   
				<Text
					style = {{ color: '#EDBB18' }}> 
					Reset Password
				</Text>
			</Text>
		</View>
	);
};

const styles = {
	container: {
		backgroundColor: '#FFFFFF',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default Login;