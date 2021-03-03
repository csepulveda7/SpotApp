import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { styles, colors } from '../styles';
import NavBar from '../components/NavBar';

export const Collection = ({ navigation }) => {
	const { container } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	return (
		<View style = { container }>
			<NavBar navigation={navigation} screenName='Collections'/>
			<Text style = {{ fontSize: 20 }}> Collection Page </Text>
			<Button
				title = 'Back'
				buttonStyle = { fullWidthHeight }
				containerStyle = { buttonContainer }
				onPress = { () => { navigation.navigate('Main') } }
			/>
		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: colors.white,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	}
};