import React from 'react';
import { View, Image, Pressable } from 'react-native';
import BreedCollectionIcon from '../assets/images/BreedCollectionIcon.png';
import AccountIcon from '../assets/images/AccountIcon.png';

export const Main = ({ navigation }) => {
	const { textStyle, container, buttons, iconStyle, pressableStyle } = styles;

	return (
		<View style = { container }>
			<View style = { buttons }>
				<Pressable onPress = { () => { navigation.navigate('Collection') } }>
					<Image
						style = { iconStyle }
						source = { BreedCollectionIcon }
					/>
				</Pressable>
				<Pressable onPress = { () => { navigation.navigate('Account') } }>
					<Image
						style = { iconStyle }
						source = { AccountIcon }
					/>
				</Pressable>
			</View>
		</View>
	);
};

export const styles = {
	container: {
		backgroundColor: '#404040',
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
		width: '80%',
		height: '10%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		top: '75%'
	},
	iconStyle: {
		height: '65%',
		position: 'relative',
		top: '0%'
	}
};