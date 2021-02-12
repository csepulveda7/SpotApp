import React, { Component, useState, Input } from 'react';
import { View, Text } from 'react-native';
import TextBox from '../components/TextBox';
import { Button } from 'react-native-elements';

const Main = ({ navigation }) => {

	const { textStyle, container } = styles;

	return (
		<View style = { container }>
			<Text>Main Page</Text>
			
			<Button
				title = 'Log Out'
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

export default Main;