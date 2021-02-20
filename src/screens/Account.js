import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './styles';

export const Account = ({ navigation }) => {
	const { container } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	return (
		<View style = { container }>
			<Text style = {{ fontSize: 20 }}> Account Page </Text>
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
		backgroundColor: '#FFFFFF',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	}
};