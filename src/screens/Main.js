import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

export const Main = ({ navigation }) => {
	const { textStyle, container, buttonContainer, buttons } = styles;

	return (
		<View style = { container }>
			<View style = { buttons }>
				<Button
					title = 'Collection'
					containerStyle = { buttonContainer }
					buttonStyle = {{ width: '100%', height: '100%' }}
				/>
				<Button
					title = 'My Account'
					containerStyle = { buttonContainer }
					buttonStyle = {{ width: '100%', height: '100%' }}
				/>
			</View>
		</View>
	);
};

export const styles = {
	container: {
		backgroundColor: '#FFFFFF',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	textStyle: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttons: {
		width: '90%',
		height: '10%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		top: '83%'
	},
	buttonContainer: {
		width: '40%',
		height: '60%',
		justifyContent: 'center'
	}
};