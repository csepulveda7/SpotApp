import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { colors } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const NavBar = ({ navigation, screenName }) => {
	const { navBar, centerItems, backIcon, headerText } = styles;

	return (
		<View style = { [navBar, centerItems] } >
			<Pressable style = { backIcon } onPress = { () => navigation.goBack() }>
				<FontAwesomeIcon
					icon = { faChevronLeft }
					size = { 25 }
					color = { colors.dark }
				/>
			</Pressable>
			<Text style = { headerText }> { screenName } </Text>
		</View>
	);
};

const styles = {
	navBar: {
		backgroundColor: colors.offWhite,
		height: '10%',
		width: '100%',
		zIndex: 5,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	backIcon: {
		position: 'absolute',
		alignSelf: 'flex-start',
		marginLeft: '4%'
	},
	headerText: {
		fontSize: 24
	}
};

export default NavBar;