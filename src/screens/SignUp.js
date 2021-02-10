import React, { Component, useState, Input } from 'react';
import { View, Text } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';

const SignUp = ({ navigation }) => {

	const { textStyle, container } = styles;

	return (
		<View style = { container }>
			<TextBox 
				defaultValue = 'email@address.com'
				labelText = 'Email'
				icon = {{ 
					type: 'font-awesome', 
					name: 'envelope', 
					color: '#404040', 
					size: 20 
				}}
			/>
			<TextBox 
				defaultValue = 'John Doe'
				labelText = 'Name'
					icon = {{ 
					type: 'font-awesome',
					name: 'user',
					color: '#404040',
					size: 26
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
			<TextBox 
				defaultValue = 'Password'
				labelText = 'Confirm Password'
				secureInput = { true }
				icon = {{ 
					type: 'font-awesome',
					name: 'lock',
					color: '#404040',
					size: 26
				}}
			/>
			<Button
				title = 'Sign Up'
				buttonStyle = {{ marginVertical: '5%' }}
				onPress = {() => { navigation.navigate('Login') }}
			/>
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
}

export default SignUp;