import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Button } from 'react-native-elements';
import { styles } from '../styles';
import { colors } from '../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Pressable } from 'react-native';

export const Account = ({ navigation }) => {
	const { container, navBar, infoBar, centerItems, headerText, infoText, backButton } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	return (
		<View style = { [fullWidthHeight, container] }>
			<View style = { [navBar, centerItems] } >
				<Pressable style = { backButton } onPress = { () => navigation.goBack() }>
					<FontAwesomeIcon
						icon = { faChevronLeft }
						size = { 25 }
						color = { colors.dark }
					/>
				</Pressable>
				<Text style = { headerText }>Account</Text>
			</View>
			<Svg
				width = '100%'
				height = '35%'
			>
				<Circle
					cx = '50%'
					cy = '50%'
					r = '32%'
					stroke = 'rgb(255, 255, 255)'
					strokeWidth = '1%'
				/>
			</Svg>
			<View style = { [centerItems, infoBar] }>
				<Text style = { infoText }>Username: </Text>
				<Text style = { infoText }>Email: </Text>
				<Text style = { infoText }>Total Dogs Seen: </Text>
				<Text style = { infoText }>Total Breeds Seen: </Text>
				<Button
					title = 'Log out'
					containerStyle = { [buttonContainer, { height: 60 }] }
					buttonStyle = { fullWidthHeight }
				/>
			</View>
		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: '#E2B865',
		flexDirection: 'column',
		flex: 1,
		zIndex: 1
	},
	navBar: {
		backgroundColor: '#E5E5E5',
		height: '10%',
		width: '100%',
		zIndex: 5,
		borderBottomLeftRadius: 12,
		borderBottomRightRadius: 12
	},
	infoBar: {
		backgroundColor: '#E5E5E5',
		height: '55%',
		width: '100%',
		zIndex: 5,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontSize: 24
	},
	infoText: {
		fontSize: 16,
		alignSelf: 'flex-start',
		marginLeft: '10%'
	},
	backButton: {
		position: 'absolute',
		alignSelf: 'flex-start',
		marginLeft: '4%'
	}
};