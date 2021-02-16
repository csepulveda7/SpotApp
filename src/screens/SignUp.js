import React, { Component, useState, Input } from 'react';
import { View, Image, Text, TextPropTypes, Dimensions } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';
import DogeLogo from '../assets/images/DogeLogo.png';

const { height, width } = Dimensions.get('screen');

export const SignUp = ({ navigation }) => {
	const { textStyle, container, textBoxes, rectangle, topGraphics, logoStyle, buttonContainer} = styles;

	return (
		<View style = { container }>
			<View style = { topGraphics }>
				<View style = { [rectangle, { backgroundColor: '#E2B865', height: '65%'}]} />
				<Image style = { logoStyle } source = { DogeLogo } />
				<View style = { [rectangle, { backgroundColor: '#F5D8A1', height: '50%'}]}/>
			</View>
			<View style = { textBoxes }>
				<TextBox
					defaultValue = 'email@address.com'
					labelText = 'Email'
				/>
				<TextBox
					defaultValue = 'John Doe'
					labelText = 'Name'
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Password'
					secureInput = { true }
				/>
				<TextBox
					defaultValue = 'Password'
					labelText = 'Confirm Password'
					secureInput = { true }
				/>
			</View>
			<Button
				title = 'Sign Up'
				containerStyle = { buttonContainer }
				buttonStyle = {{ marginVertical: '5%', width: '100%', height: '100%' }}
				onPress = { () => { navigation.navigate('Login') }}
			/>
			<Text style = {{ marginTop: '5%' }}>
				{ 'Already have an account? ' }
				<Text style = {{ color: '#BC6F27' }}
					onPress = { () => { navigation.navigate('Login') }}>
					Log in Here! </Text>
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
		height: '70%',
		resizeMode: 'center',
		position: 'absolute',
		zIndex: 2,
		top: '30%'
	},
	buttonContainer: {
		width: '65%',
		height: '7%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5%',
		position: 'relative'
	}

};