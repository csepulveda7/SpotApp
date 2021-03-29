import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../styles';
import { Male, Female } from '../assets/images';

const { height, width } = Dimensions.get('screen');

export const DogCard = ({ photo, name, age, size, distance, gender, breed, url }) => {
	const { container, picture, infoContainer, genderContainer, icon, header, infoFont } = styles;

	return (
		<TouchableOpacity style = { container } onPress = { () => Linking.openURL(url) }>
			<View style = { genderContainer }>
				{ (gender === 'Male') ? <Male style = { icon } /> : <Female style = { icon } /> }
			</View>
			<Image style = { picture } source = {{ uri: photo }} />
			<View style = { infoContainer }>
				<Text style = { header }>{ name }</Text>
				<Text style = { infoFont }>{ breed }</Text>
				<Text style = { infoFont }>{ age } - { size }</Text>
				<Text style = { infoFont }>{ Math.round(distance) } miles away</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = {
	container: {
		width: width / 2 - 30,
		height: height / 3,
		backgroundColor: colors.offWhite,
		alignItems: 'flex-end',
		overflow: 'hidden',
		borderRadius: 20,
		borderColor: colors.offWhite,
		borderWidth: 4,
		marginHorizontal: '2%',
		marginVertical: '2%',

		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 1,
		shadowRadius: 5,

		elevation: 10
	},
	picture: {
		width: '100%',
		height: '70%',
		borderRadius: 15
	},
	infoContainer: {
		width: '100%',
		height: '30%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.offWhite
	},
	genderContainer: {
		width: '25%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		borderBottomLeftRadius: 20,
		zIndex: 10,
		position: 'absolute'
	},
	icon: {
		width: '65%',
		height: '65%',
		aspectRatio: 1
	},
	header: {
		fontSize: 16
	},
	infoFont: {
		fontSize: 12
	}
};