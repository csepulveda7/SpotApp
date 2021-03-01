import React from 'react';
import { View } from 'react-native';
import { DogeFaceWithinCircle } from '../assets/images';
import { colors } from '../styles';

export const Header = ({ height }) => {
	const { topRectangle, bottomRectangle, logoStyle, topGraphics } = styles;

	return (
		<View style = { [topGraphics, { height: (height !== undefined) ? (height) : topGraphics.height } ] }>
			<View style = { topRectangle } />
			<DogeFaceWithinCircle style = { logoStyle } />
			<View style = { bottomRectangle } />
		</View>
	);
};

const styles = {
	topRectangle: {
		backgroundColor: colors.primaryDark,
		height: '65%',
		zIndex: 0,
		position: 'relative',
		width: '100%'
	},
	bottomRectangle: {
		backgroundColor: colors.primaryLight,
		height: '50%',
		zIndex: 0,
		position: 'relative',
		width: '100%'
	},
	topGraphics: {
		position: 'relative',
		height: '20%',
		width: '100%',
		alignItems: 'center',
		zIndex: 1
	},
	logoStyle: {
		height: '60%',
		width: '60%',
		resizeMode: 'center',
		position: 'absolute',
		zIndex: 2,
		top: '35%'
	}
};